
var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

var WORLD = null;

var GameLayer = cc.Layer.extend({
	
	BG_Z:-50,
	
	PLAYER_Z:-10,
	
	_bg_layer:null,
	
	map:null,
	
	_playerBody:null,
	
	ctor:function () {
		
		this._super();
		
		WORLD = new zsP_World();
		WORLD.setG(5);
		this.addChild(WORLD, 100);
		
		
		this._playerBody = new zsP_Body(cc.rect(0, 0, 100, 100));

//		this._playerBody.retain();
		
		this._playerBody.setType(BODY_TYPE_NORMAL);
		this._playerBody.setIsCanFall(true);
		this._playerBody.setPosition(400, 500);

		WORLD.addBody(this._playerBody);
		
		var win = cc.winSize;
		
		this._bg_layer = new BackLayer();
	
		this.addChild(this._bg_layer,this.BG_Z);
		
		this.map = new cc.TMXTiledMap(res.map1_tmx);
		
		this.addChild(this.map, -5);
		
		ccs.armatureDataManager.addArmatureFileInfo(res.player_1_csb);
		
		this.addKey();
		
		this.addTouches();
		
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
								self._playerBody.addVy(-10);
							}
							
						}else if(keyStr == "a"){
							
							self._playerBody.addVx(-10);
						}else if(keyStr == "w"){
							
							if(self._playerBody.isCollisionLadder()&&!self._playerBody.isOnLadder()){

								self._playerBody.setOnLadder(true);

								self._playerBody.setVy(0);
								self._playerBody.setAy(0);
								self._playerBody.clearEff();
							}
							
							if(self._playerBody.isOnLadder()){
								self._playerBody.addVy(10);
							}
						}else if(keyStr == "d"){
							self._playerBody.addVx(10);
						}else if(keyStr == "j"){

						}else if(keyStr == "k"){
							self._playerBody.setJump(50);
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
									self._playerBody.addVy(10);
								}
							}
							
						}else if(keyStr == "a"){

							self._playerBody.addVx(10);
						}else if(keyStr == "w"){
							
							
							
							if(self._playerBody.isOnLadder()){
								if(self._playerBody.getVy()>0){
									self._playerBody.addVy(-10);
								}
							}
						}else if(keyStr == "d"){
							self._playerBody.addVx(-10);
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
		
		WORLD.cycle(dt);
	},

});