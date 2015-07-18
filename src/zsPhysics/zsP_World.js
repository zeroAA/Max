var zsP_World = cc.Node.extend({
	
	
	
	_range : null,
	
	_G : 0,
	_bodyArray:null,
	_rigidBodyArray:null,

	
	_drawNode:null,
	
	_eff_type1 : 1,
	
	_eff_type2 : 2,
	
	_eff_type3 : 3,
	
	ctor:function (range) {

		this._super();
		
		this._range = range;
		
		this._drawNode = new cc.DrawNode();
		
		this.addChild(this._drawNode, 100);
		this._bodyArray = new Array();
		this._rigidBodyArray = new Array();
		
// var body = new zsP_Body(cc.rect(0, 0, 100, 100));
//		
// body.retain();
// body.setType(zsP_Body_const.TYPE_NORMAL);
// body.setIsCanFall(true);
// body.setPosition(400, 500);
//		
//		
//		
// // var test = new cc.Node();
// // test.retain();
// this._bodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 10000, 50));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY);
		body.retain();
		body.setPosition(10, 50);
//		body.setFriction(0.5);
//		this._rigidBodyArray.push(body);
		for(var i = 0 ; i < 1 ; ++i){
			
		
		var body = new zsP_Body(cc.rect(0, 0, 200, 50));
		body.retain();
		body.setType(zsP_Body_const.TYPE_RIGID_BODY);
		body.setPosition(170+i*50, 150);
		body.setState(zsP_Body_const.STATE_MOVE_AND_BACK);
		body.setVx(5);
		body.setMoveTime(30);
		body.setFriction(0.5);
//			this._rigidBodyArray.push(body);
		}
		var body = new zsP_Body(cc.rect(0, 0, 50, 10000));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY);
		body.retain();
		body.setPosition(10, 150);
//		this._rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 50, 10000));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY);
		body.retain();
		body.setPosition(900, 150);
//		this._rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 400, 200));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY_SLOPE_UP);
		body.retain();
		body.setFriction(0.5);
		body.setPosition(200, 100);
//		this._rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 400, 200));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY_SLOPE_DOWN);
		body.retain();
		body.setFriction(0.5);
		body.setPosition(200, 100);
// this._rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 100, 200));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY_LADDER);
		body.retain();
		body.setPosition(200, 100);
		
		body.setState(zsP_Body_const.STATE_MOVE_AND_BACK);
		body.setVx(5);
		body.setVy(5);
		body.setMoveTime(30);
		
//		this._rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 600, 200));
		body.setType(zsP_Body_const.TYPE_RIGID_BODY);
		body.retain();
		body.setFriction(1);
		body.setOutForce(5);
		body.setPosition(200, 100);
//		this._rigidBodyArray.push(body);
		
		return true;
	},
	
	addMapTiled : function(rect,type) {
		var body = new zsP_Body(cc.rect(0, 0, rect.width, rect.height));
//		cc.log(type);
		body.setType(type);
		body.setLifeTime(1);
		body.setPosition(rect.x, rect.y);
//		body.setFriction(0.5);
		this.addRigidBody(body);
	},
	
	addRigidBody : function(body) {
		body.setBefPos();
		body.retain();
		this._rigidBodyArray.push(body);
	},
	
	addBody:function(body){
		body.setBefPos();
		body.retain();
		this._bodyArray.push(body);
	},
	
	setG:function(g){
		this._G = g;
	},
	
	initCycle : function(dt) {
		for(var i = 0; i < this._rigidBodyArray.length ;i++){
			var body =this._rigidBodyArray[i];
			body.setBefPos();	
			body.cycle(dt);

			if(body.getLifeTime()!=zsP_Body_const.LIFE_TIME_LIMIT && body.getLifeTime()<0){

				this._rigidBodyArray.splice(i, 1);
				i--;

				continue;
			}

		}
		
		
		for(var i = 0; i < this._bodyArray.length ;i++){

			var body =this._bodyArray[i];

			body.initState();
			
			
			if (body.isCanFall()&&!body.isOnLadder()) {
				body._Vy -=this._G;
				
				if(body._Vy<-body.getMaxG()){
					body._Vy = -body.getMaxG();
				}
			}


			body.cycle(dt);
		}
	},
	
	cycle:function (dt) {
		// chipmunk step
		
		for(var i = 0; i < this._bodyArray.length ;i++){
			
			var body =this._bodyArray[i];
			
//			body.initState();
			
			
			
//			body.setOnLadder(false);
			var isCollisionLadder = false;
		
			
			for(var j = 0;j<this._rigidBodyArray.length;j++){
				var body2 =this._rigidBodyArray[j];
				if(cc.rectIntersectsRect(body.getBodyRect(), body2.getBodyRect())){
					
					if(body2.getType() == zsP_Body_const.TYPE_RIGID_BODY_LADDER){
						isCollisionLadder = true;
						body.setCollisionLadder(true);
						
						if(!body.isOnLadder()&& cc.rectGetMinY(body.getBefBodyRect())>=cc.rectGetMaxY(body2.getBefBodyRect())){
							
							body.y = cc.rectGetMaxY(body2.getBodyRect());
							body.setVy(0);
							body.setAy(0);
							
							
							if(body2.getBefPos().x != body2.x&&(body.getDir()!=zsP_Body_const.DIR_LEFT&&body.getDir()!=zsP_Body_const.DIR_RIGHT)){// 添加
								// 移动平台
								// 摩擦力
								body.setEff_X_Time(1,(body2.x-body2.getBefPos().x)*body2.getFriction(),1);
							}

							if(body2.getBefPos().y != body2.y&&(body.getDir()!=zsP_Body_const.DIR_UP&&body.getDir()!=zsP_Body_const.DIR_DOWN)){// 添加
								// 移动平台
								// 摩擦力

								body.setEff_Y_Time(1,(body2.y-body2.getBefPos().y)*body2.getFriction(),1);


							}
							
							body.clearDownEff_y();
							
						}
						
						if(body.isOnLadder()){
							if(body2.getBefPos().x != body2.x&&(body.getDir()!=zsP_Body_const.DIR_LEFT&&body.getDir()!=zsP_Body_const.DIR_RIGHT)){// 添加
								// 移动平台
								// 摩擦力
								body.setEff_X_Time(1,(body2.x-body2.getBefPos().x)*body2.getFriction(),2);
							}
							
							if(body2.getBefPos().y != body2.y&&(body.getDir()!=zsP_Body_const.DIR_UP&&body.getDir()!=zsP_Body_const.DIR_DOWN)){// 添加
								// 移动平台
								// 摩擦力
								
								body.setEff_Y_Time(1,(body2.y-body2.getBefPos().y)*body2.getFriction(),2);
								
							}
						}
					}else{
						
						
						if(body2.getType() == zsP_Body_const.TYPE_RIGID_BODY_SLOPE_UP){
							
							if(cc.rectGetMaxX( body.getBodyRect())>cc.rectGetMaxX(body2.getBodyRect())){
								if(cc.rectGetMinX(body.getBefBodyRect())<cc.rectGetMaxX(body2.getBefBodyRect())){
									body.y = cc.rectGetMaxY(body2.getBodyRect())
									body.setVy(0);
									body.setAy(0);
									body.clearEff_y();
								}else{
									if(body.y<cc.rectGetMaxY(body2.getBodyRect())){
										body.x = cc.rectGetMaxX(body2.getBodyRect());
										body.clearEff_x();
									}
								}
							}else{
								var y = (cc.rectGetMaxX( body.getBodyRect())-cc.rectGetMinX(body2.getBodyRect()))*body2.getBodyRect().height/body2.getBodyRect().width;
								if(cc.rectGetMinY(body.getBodyRect())<(y+cc.rectGetMinY(body2.getBodyRect()))){

									body.y = y+cc.rectGetMinY(body2.getBodyRect());
									body.setVy(0);
									body.setAy(0);
									body.clearEff_y();
									if(body2.getFriction()<1){
										body.setEff_X_Time(1,-this._G*(1-body2.getFriction()),4);

									}
								}
							}

						}else if(body2.getType() == zsP_Body_const.TYPE_RIGID_BODY_SLOPE_DOWN){

							if(cc.rectGetMinX( body.getBodyRect())<cc.rectGetMinX(body2.getBodyRect())){
								if(cc.rectGetMaxX(body.getBefBodyRect())>cc.rectGetMinX(body2.getBefBodyRect())){
									body.y = cc.rectGetMaxY(body2.getBodyRect());
									body.setVy(0);
									body.setAy(0);
									body.clearEff_y();
								}else{
									if(body.y<cc.rectGetMaxY(body2.getBodyRect())){
										body.x = cc.rectGetMinX(body2.getBodyRect())-body.getBodyRect().width;
										body.clearEff_x();
									}
									
								}

							}else{
								var y = ((cc.rectGetMaxX(body2.getBodyRect())-cc.rectGetMinX( body.getBodyRect())))*body2.getBodyRect().height/body2.getBodyRect().width;
								if(cc.rectGetMinY(body.getBodyRect())<y+cc.rectGetMinY(body2.getBodyRect())){

									body.y = y+cc.rectGetMinY(body2.getBodyRect());
									body.setVy(0);
									body.setAy(0);

									if(body2.getFriction()<1){
										body.setEff_X_Time(1,this._G*(1-body2.getFriction()),5);

									}
									
									body.clearEff_y();
								}
							}

						}else{

							// 判断上下

							if(cc.rectGetMaxY(body2.getBefBodyRect())<=cc.rectGetMinY(body.getBefBodyRect())){// 从上往下
								
								body.y = cc.rectGetMaxY(body2.getBodyRect());
								body.setVy(0);
								body.setAy(0);

								if(body2.getBefPos().x != body2.x&&(body.getDir()!=zsP_Body_const.DIR_LEFT&&body.getDir()!=zsP_Body_const.DIR_RIGHT)){// 添加
									// 移动平台
									// 摩擦力
									body.setEff_X_Time(1,(body2.x-body2.getBefPos().x)*body2.getFriction(),6);
								}
								
								
								if(body2.getFriction()<0.8&&body.getBefVx()!=body.getVx()){// 添加上面物体摩擦力
									// 速度变化
//									cc.log("bVx : "+body.getBefVx()+"Vx : "+body.getVx()+"v : "+(body.getBefVx()-body.getVx())*(1-body2.getFriction()));
//									body.setEff_X_Time(20*(1-body2.getFriction()),(body.getBefVx()-body.getVx())*(1-body2.getFriction()),7);
									body.setInertia((body.getBefVx()-body.getVx())*(0.8-body2.getFriction()), 30*(1-body2.getFriction()));
								}
								
								
								if(body2.getOutForce()!=0){//添加赋予外力
									
									body.setEff_X_Time(1, body2.getOutForce()*(body2.getFriction()),8);
									
								}
								
								body.clearDownEff_y();
							
								continue;
							}else if(cc.rectGetMinY(body2.getBefBodyRect())>=cc.rectGetMaxY(body.getBefBodyRect())){ // 从下往上
								
								
								
								body.y = cc.rectGetMinY(body2.getBodyRect())-body.getBodyRect().height;
								body.setVy(0);
								body.setAy(0);
								body.clearUpEff_y();
								continue;
							}


							// /////////

							// 判断左右

							// if(body.getDir() == zsP_Body_const.DIR_RIGHT){//向右移动
							//						
							// }else if(body.getDir() == zsP_Body_const.DIR_LEFT){//向左移动
							//						
							// }
							
							
							
							if(cc.rectGetMinX(body2.getBefBodyRect())>=cc.rectGetMaxX(body.getBefBodyRect())){
								
								body.x = cc.rectGetMinX(body2.getBodyRect())-body.getBodyRect().width-1;
								body.clearEff_x();
								continue;
							}else if(cc.rectGetMaxX(body2.getBefBodyRect())<=cc.rectGetMinX(body.getBefBodyRect())){
								
								body.x = cc.rectGetMaxX(body2.getBodyRect())+1;
								body.clearEff_x();
								continue;
							}

							// /////////
						}
					}
				}
			}
			
			if(!isCollisionLadder){
				body.setCollisionLadder(false);
				body.setOnLadder(false);
			}
			
			if(body._isClear_eff_x){
				body.clearEff_x_data();
			}
			if(body._isClear_eff_y){
				body.clearEff_y_data();
			}else if(body._isClear_Up_eff_y){
				body.clearUpEff_y_data();
			}else if(body._isClear_Down_eff_y){
				body.clearDownEff_y_data();
			}
			
			body.addEffV();
			
			body.setBefVx();
			if(!body.isPassRange()){
				if (body.x<this._range.x) {
					body.x = this._range.x;
				}else if(body.x+body.getBodyRect().width > this._range.x+this._range.width){
					body.x = this._range.x+this._range.width-body.getBodyRect().width;
				}
			}
			
			
			
		}
		
		
		this.enableDebug();
	},
	
	enableDebug:function(){
		this._drawNode.clear();
		for(var i = 0; i < this._bodyArray.length ;i++){
			var body =this._bodyArray[i];
		
			
			this._drawNode.drawRect(cc.p(body.getBefBodyRect().x, body.getBefBodyRect().y), cc.p(body.getBefBodyRect().x+body.getBodyRect().width, body.getBefBodyRect().y+body.getBodyRect().height), cc.color(0, 0, 255, 100), 2, cc.color(0, 0, 0, 100));

			
			this._drawNode.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(0, 255, 0, 100), 2, cc.color(0, 0, 0, 100));
			this._drawNode.drawCircle(body.getPosition(), 10, 360, 10, true, 5, cc.color(0, 0, 0, 100));
// this._drawNode.drawRect(cc.p(body.getBodyRect().x, cc.rectGetMaxY(body.getBodyRect())),
// cc.p(body.getBodyRect().x+body.getBodyRect().width,
// cc.rectGetMaxY(body.getBodyRect())-body.getBodyRect().height), cc.color(0,
// 255, 0, 100), 2, cc.color(0, 0, 0, 100));
			
			
			
			
		}
		
		for(var i = 0; i < this._rigidBodyArray.length ;i++){
			
			var body =this._rigidBodyArray[i];


			

// this._drawNode.drawRect(cc.p(body.getBefBodyRect().x, body.getBefBodyRect().y),
// cc.p(body.getBefBodyRect().x+body.getBodyRect().width,
// body.getBefBodyRect().y+body.getBodyRect().height), cc.color(0, 0, 255, 100),
// 2, cc.color(0, 0, 0, 100));

			if(body.getType() == zsP_Body_const.TYPE_RIGID_BODY_SLOPE_UP){
				this._drawNode.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(0, 255, 255, 100), 2, cc.color(0, 0, 0, 100));
				this._drawNode.drawSegment(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height),2, cc.color(0, 255, 255, 100))
			}else if(body.getType() == zsP_Body_const.TYPE_RIGID_BODY_SLOPE_DOWN){
				this._drawNode.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(0, 255, 255, 100), 2, cc.color(0, 0, 0, 100));
				this._drawNode.drawSegment(cc.p(body.getBodyRect().x, body.getBodyRect().y+body.getBodyRect().height), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y),2, cc.color(0, 255, 255, 100))
			}else if(body.getType() == zsP_Body_const.TYPE_RIGID_BODY_LADDER){
				this._drawNode.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(255, 255, 0, 100), 2, cc.color(0, 0, 0, 100));

			}else{
				this._drawNode.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(255, 0, 0, 100), 2, cc.color(0, 0, 0, 100));

			}
			
			this._drawNode.drawCircle(body.getPosition(), 10, 360, 10, true, 5, cc.color(0, 0, 0, 100));
			
		}
		
		
	},
	
});