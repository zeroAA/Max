
var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

var WORLD = null;

var time = 0;

var GameLayer = cc.Layer.extend({
	
	BG_Z:-50,
	
	PLAYER_Z:110,
	
	_bg_layer:null,
	
	_map:null,
	
	_playerBody:null,
	
	_player : null,
	
	_drawNode : null,
	
	_eye_pos : null,
	
	_eye_offset : null,
	
	_eye_rect : null,
	
	_PV : 10,
	
	_PX : 10,
	
	ctor:function () {
		
		this._super();
		
		this.addKey();

		this.addTouches();
		
		this._drawNode = new cc.DrawNode();

		this.addChild(this._drawNode, 110);
		
		this._eye_pos = new cc.p(0, 0);
		
		this._eye_offset = new cc.p(0, 0);
		
		this._map = new TiledMap(res.map1_tmx);

//		this._map.getLayer("test").setVisible(false);
//		this._map.getLayer("p").setVisible(false);
		
		this.addChild(this._map, -5);
		
		ccs.armatureDataManager.addArmatureFileInfo(res.player_1_csb);

		this._player = new Player("player_1");
		this._player.playWithIndex(0);
		this.addChild(this._player, this.PLAYER_Z);
		
		WORLD = new zsP_World(cc.rect(0, 0, this._map.getMapSize().width*this._map.getTileSize().width, this._map.getMapSize().height*this._map.getTileSize().height));
		WORLD.setG(5);
		this.addChild(WORLD, 100);
		
		
		this._playerBody = new zsP_Body(cc.rect(0, 0, this._player.getBodyRect().width, 100));
		
//		this._playerBody.retain();
		
		this._playerBody.setType(zsP_Body_const.TYPE_NORMAL);
		this._playerBody.setIsCanFall(true);
		this._playerBody.setPosition(150, 500);
		this._playerBody.setNode(this._player);
		WORLD.addBody(this._playerBody);
//		this._eye_start_pos = this._playerBody.getPosition();
		this._eye_rect = new cc.rect(cc.winSize.width*0.5,cc.winSize.height*0.5, 0, cc.winSize.height*0.5);
		
		var win = cc.winSize;
		
		this._bg_layer = new BackLayer();
	
		this.addChild(this._bg_layer,this.BG_Z);
		
		
//		cc.log(this.map.getIndextAt(cc.p(100,100)).x+" y :"+this.map.getIndextAt(cc.p(100,100)).y);
//		this._map.getInfoAt(cc.p(100,100), "p", "type");
		
		
		
		
		
//		var actor = new cc.Sprite(res.CloseNormal_png);
//		actor.setPosition(400, 200);
//		
//		this.addChild(actor,10);
		
//		var mov1 = new cc.MoveBy(2,cc.p(0, 100));
//		var mov2 = mov1.reverse();

//		actor.runAction( cc.RepeatForever(cc.sequence(mov1,mov2)));
//		WORLD.runAction( cc.RepeatForever(cc.sequence(mov1,mov2)));
		this.scheduleUpdate();
		
		
		
		return true;
		
	},
	
	addTouches : function() {
		if( 'touches' in cc.sys.capabilities ) {
			cc.eventManager.addListener({
				event: cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches: true,
				onTouchBegan: this.onTouchBegan,
				onTouchMoved: this.onTouchMoved,
				onTouchEnded: this.onTouchEnded,
				onTouchCancelled: this.onTouchCancelled
			}, this);
		} else {
			cc.log("TOUCH-ONE-BY-ONE test is not supported on desktop");
		}
	},
	
	onTouchBegan:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchBegan at: " + pos.x + " " + pos.y + " Id:" + id );
		
		return true;
		
	},
	onTouchMoved:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchMoved at: " + pos.x + " " + pos.y + " Id:" + id );
		
	},
	onTouchEnded:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchEnded at: " + pos.x + " " + pos.y + " Id:" + id );
		
	},
	onTouchCancelled:function(touch, event) {
		var pos = touch.getLocation();
		var id = touch.getID();
		cc.log("onTouchCancelled at: " + pos.x + " " + pos.y + " Id:" + id );
		
	},
	
	addKey:function(){
		var self = this;
		if ('keyboard' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed: function (key, event) {
					var strTemp = "Key down:" + key;
					var keyStr = self.getKeyStr(key);
					if (keyStr.length > 0)
					{
						strTemp += " the key name is:" + keyStr;

						if(keyStr == "s"){

							if(self._playerBody.isCollisionLadder()&&!self._playerBody.isOnLadder()){

								self._playerBody.setOnLadder(true);

								self._playerBody.setVy(0);
								self._playerBody.setAy(0);
								self._playerBody.clearEff();
							}

							if(self._playerBody.isOnLadder()){
								self._playerBody.addVy(-self._PV);
							}
							
							

						}else if(keyStr == "a"){

							self._playerBody.addVx(-self._PX);
							self._player.playRun();
							self._player.setDir(Player_const.DIR_RIGHT);
						}else if(keyStr == "w"){

							if(self._playerBody.isCollisionLadder()&&!self._playerBody.isOnLadder()){

								self._playerBody.setOnLadder(true);

								self._playerBody.setVy(0);
								self._playerBody.setAy(0);
								self._playerBody.clearEff();
							}
							if(self._playerBody.isOnLadder()){
								self._playerBody.addVy(self._PV);
							}
						}else if(keyStr == "d"){
							self._playerBody.addVx(self._PX);
							self._player.playRun();
							self._player.setDir(Player_const.DIR_LEFT);
						}else if(keyStr == "j"){

						}else if(keyStr == "k"){
							self._playerBody.setJump(50);
							
							self._player.playJump();

							self._player.addJumpC();
						}
					}
//					cc.log(strTemp);
				},
				onKeyReleased: function (key, event) {
					var strTemp = "Key up:" + key;
					var keyStr = self.getKeyStr(key);
					if (keyStr.length > 0)
					{
						strTemp += " the key name is:" + keyStr;

						if(keyStr == "s"){

							if(self._playerBody.isOnLadder()){
								if(self._playerBody.getVy()<0){
									self._playerBody.addVy(self._PV);
								}
							}

						}else if(keyStr == "a"){

							self._playerBody.addVx(self._PX);
							self._player.playStop(); 
						}else if(keyStr == "w"){



							if(self._playerBody.isOnLadder()){
								if(self._playerBody.getVy()>0){
									self._playerBody.addVy(-self._PV);
								}
							}
						}else if(keyStr == "d"){
							self._playerBody.addVx(-self._PX);
							self._player.playStop();
						}else if(keyStr == "j"){

						}else if(keyStr == "k"){

						}
					}
//					cc.log(strTemp);
				}
			}, this);
		} else {
			cc.log("KEYBOARD Not supported");
		}
	},
	
	getKeyStr: function (keycode)
	{
		if (keycode == cc.KEY.none)
		{
			return "";
		}

		for (var keyTemp in cc.KEY)
		{
			if (cc.KEY[keyTemp] == keycode)
			{
				return keyTemp;
			}
		}
		return "";
	},
	

	// this callback is only available on JSB + OS X
	// Not supported on cocos2d-html5
	onKeyFlagsChanged:function(key) {
		cc.log("Key flags changed:" + key);
	},
	
	
	
	update:function (dt) {
		// chipmunk step
		
		time++;
		
//		var array = this._map.getRectsAt(cc.rect(this._playerBody.getBodyRect().x-this._map.getTileSize().width) , "p",1,"type");
		
		WORLD.initCycle(dt);
		
		var add = 0;
		var rect = cc.rect(this._playerBody.getBodyRect().x-add, this._playerBody.getBodyRect().y-add, this._playerBody.getBodyRect().width+add*2, this._playerBody.getBodyRect().height+add*2);
		
		var all = this._map.getRectsAt(rect, "p","type");
		
		var array = all[0];
		var type = all[1];
		
		this._drawNode.clear();
		
//		var rect1 = cc.rect(this._map.getRectAt(cc.p(445, 200), "p"));
//
//		this._drawNode.drawRect(cc.p(rect1.x, rect1.y), cc.p(rect1.x+rect1.width, rect1.y+rect1.height), cc.color(0, 0, 255, 100), 2, cc.color(0, 0, 0, 100));

//		cc.log("x : "+array.length);
		for (var i = 0; i < array.length; i++) {
			
			WORLD.addMapTiled(array[i],type[i]);
//			this._drawNode.drawRect(cc.p(array[i].x, array[i].y), cc.p(array[i].x+array[i].width, array[i].y+array[i].height), cc.color(0, 0, 255, 100), 2, cc.color(0, 0, 0, 100));

		}
		
		WORLD.cycle(dt);
		
		this.setEyePos();
		
		if (!this._playerBody.isOnGround()&&this._playerBody.getVy()<0) {
			
			this._player.playFall();
		}
		
		if (this._playerBody.isOnGround()&&(this._player.getState() == Player_const.STATE_FALL||this._player.getState() == Player_const.STATE_JUMP)) {
			this._player.playStay();
		}
		
		this._player.cycle(dt);

	},
	
	setEyePos : function() {
		
//		this._eye_pos = cc.pSub(this._playerBody.getPosition(), this._eye_start_pos);
		
//		if(this._playerBody.getPositionX()>=this._eye_start_pos.x&&this._playerBody.getBefPos().x<this._eye_start_pos.x){
//			this._eye_offset.x = this._eye_start_pos.x-this._playerBody.getPositionX();
//		}
		
		if (this._playerBody.getPositionX()>this._eye_rect.x&&this._playerBody.getPositionX()<(this._map.getMapSize().width*this._map.getTileSize().width)-this._eye_rect.x) {
			
			this._eye_pos.x = this._eye_rect.x - this._playerBody.getPositionX();

			this.setPositionX(this._eye_pos.x);
		}else if(this._playerBody.getPositionX()<=this._eye_rect.x){
			this.setPositionX(0);
		}else if(this._playerBody.getPositionX()>=(this._map.getMapSize().width*this._map.getTileSize().width)-this._eye_rect.x){
			this.setPositionX(-((this._map.getMapSize().width*this._map.getTileSize().width)-cc.winSize.width));
			
//			cc.log((this._map.getMapSize().width*this._map.getTileSize().width));
		}
		
		
		if (this._playerBody.getPositionY()>this._eye_rect.y&&this._playerBody.getPositionY()<(this._map.getMapSize().height*this._map.getTileSize().height)-this._eye_rect.y) {

			this._eye_pos.y = this._eye_rect.y - this._playerBody.getPositionY();

			this.setPositionY(this._eye_pos.y);


		}else if (this._playerBody.getPositionY()<=this._eye_rect.y){
			this.setPositionY(0);
		}else if (this._playerBody.getPositionY()>=(this._map.getMapSize().height*this._map.getTileSize().height)-this._eye_rect.y){
			this.setPositionY(-((this._map.getMapSize().height*this._map.getTileSize().height)-cc.winSize.height));
		}
		
//		if (this._playerBody.getPositionY()>=this._eye_rect.y) {
//			
//			this._eye_pos.y = this._eye_rect.y - this._playerBody.getPositionY();
//
////			this.setPositionY(this._eye_pos.y);
//			
//			if(this._eye_pos.y>this.getPositionY()){
//				this.y += this._PV;
//				if(this.y>this._eye_pos.y){
//					this.y = this._eye_pos.y;
//				}
//			}else if(this._eye_pos.y<this.getPositionY()){
//				this.y -= this._PV;
//				if(this.y<this._eye_pos.y){
//					this.y = this._eye_pos.y;
//				}
//			}
//			
//		}else{
//
//			if(0>this.getPositionY()){
//				this.y += this._PV;
//				if(this.y>0){
//					this.y = 0;
//				}
//			}else
//				
//			if(0<this.getPositionY()){
//				this.y -= this._PV;
//				if(this.y<0){
//					this.y = 0;
//				}
//			}
//		}
		
		
	},

});