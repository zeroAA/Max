var zsP_World = cc.Node.extend({
	
	_G : 0,
	_bodyArray:null,
	_rigidBodyArray:null,
	_realFall : false,
	
	drawNode:null,
	
	ctor:function () {

		this._super();
		
		drawNode = new cc.Node();
		this.addChild(drawNode, 100);
		_bodyArray = new Array();
		_rigidBodyArray = new Array();
		
// var body = new zsP_Body(cc.rect(0, 0, 100, 100));
//		
// body.retain();
// body.setType(BODY_TYPE_NORMAL);
// body.setIsCanFall(true);
// body.setPosition(400, 500);
//		
//		
//		
// // var test = new cc.Node();
// // test.retain();
// _bodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 10000, 50));
		body.setType(BODY_TYPE_RIGID_BODY);
		body.retain();
		body.setPosition(10, 50);
		_rigidBodyArray.push(body);
		for(var i = 0 ; i < 1 ; ++i){
			
		
		var body = new zsP_Body(cc.rect(0, 0, 200, 50));
		body.retain();
		body.setType(BODY_TYPE_RIGID_BODY);
		body.setPosition(170+i*50, 150);
		body.setState(BODY_STATE_MOVE_AND_BACK);
		body.setVx(5);
		body.setMoveTime(30);

// _rigidBodyArray.push(body);
		}
		var body = new zsP_Body(cc.rect(0, 0, 50, 10000));
		body.setType(BODY_TYPE_RIGID_BODY);
		body.retain();
		body.setPosition(10, 150);
		_rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 50, 10000));
		body.setType(BODY_TYPE_RIGID_BODY);
		body.retain();
		body.setPosition(900, 150);
		_rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 400, 200));
		body.setType(BODY_TYPE_RIGID_BODY_SLOPE_UP);
		body.retain();
		body.setFriction(0.5);
		body.setPosition(200, 100);
//		_rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 400, 200));
		body.setType(BODY_TYPE_RIGID_BODY_SLOPE_DOWN);
		body.retain();
		body.setFriction(0.5);
		body.setPosition(200, 100);
// _rigidBodyArray.push(body);
		
		var body = new zsP_Body(cc.rect(0, 0, 100, 500));
		body.setType(BODY_TYPE_RIGID_BODY_LADDER);
		body.retain();
		body.setPosition(200, 100);
		_rigidBodyArray.push(body);
		
		return true;
	},
	
	addBody:function(body){
		body.retain();
		_bodyArray.push(body);
	},
	
	setG:function(g){
		this._G = g;
	},
	
	cycle:function (dt) {
		// chipmunk step
		
		for(var i = 0; i < _rigidBodyArray.length ;i++){
			var body =_rigidBodyArray[i];
			body.setBefPos();	
			body.cycle(dt);
		}
		
		for(var i = 0; i < _bodyArray.length ;i++){
			
			var body =_bodyArray[i];
			
			body.setBefPos();
			
			
			if (body.isCanFall()&&!body.getOnLadder()) {
				
				if(!this._realFall){
					body._Vy -=this._G;
				}else{
					body._Ay -=this._G;
				}
			
			}
			
			body.cycle(dt);
			
			body.setOnLadder(false);
			
			for(var j = 0;j<_rigidBodyArray.length;j++){
				var body2 =_rigidBodyArray[j];
				if(cc.rectIntersectsRect(body.getBodyRect(), body2.getBodyRect())){
					
					if(body2.getType() == BODY_TYPE_RIGID_BODY_LADDER){
						if(!cc.rectIntersectsRect(body.getBefBodyRect(), body2.getBodyRect())){
							body.setVy(0);
							body.setAy(0);
						}
						
						body.setOnLadder(true);
						
						if(cc.rectGetMinY(body.getBefBodyRect())>cc.rectGetMaxY(body2.getBefBodyRect())){
							body.y = cc.rectGetMaxY(body2.getBodyRect());
							body.setVy(0);
							body.setAy(0);
						}
					}else{
						
						
						if(body2.getType() == BODY_TYPE_RIGID_BODY_SLOPE_UP){

							if(cc.rectGetMaxX( body.getBodyRect())>cc.rectGetMaxX(body2.getBodyRect())){
								if(cc.rectGetMinX(body.getBefBodyRect())<cc.rectGetMaxX(body2.getBefBodyRect())){
									body.y = cc.rectGetMaxY(body2.getBodyRect())
									body.setVy(0);
									body.setAy(0);
								}else{
									body.x = cc.rectGetMaxX(body2.getBodyRect());
									body.clearEff_x();
								}
							}else{
								var y = (cc.rectGetMaxX( body.getBodyRect())-cc.rectGetMinX(body2.getBodyRect()))*body2.getBodyRect().height/body2.getBodyRect().width;
								if(cc.rectGetMinY(body.getBodyRect())<(y+cc.rectGetMinY(body2.getBodyRect()))){

									body.y = y+cc.rectGetMinY(body2.getBodyRect());
									body.setVy(0);
									body.setAy(0);

									if(body2.getFriction()<1){
										body.setEff_X_Time(1,-this._G*(1-body2.getFriction()));

									}
								}
							}

						}else if(body2.getType() == BODY_TYPE_RIGID_BODY_SLOPE_DOWN){

							if(cc.rectGetMinX( body.getBodyRect())<cc.rectGetMinX(body2.getBodyRect())){
								if(cc.rectGetMaxX(body.getBefBodyRect())>cc.rectGetMinX(body2.getBefBodyRect())){
									body.y = cc.rectGetMaxY(body2.getBodyRect())
									body.setVy(0);
									body.setAy(0);
								}else{
									body.x = cc.rectGetMinX(body2.getBodyRect())-body.getBodyRect().width;
									body.clearEff_x();
								}

							}else{
								var y = ((cc.rectGetMaxX(body2.getBodyRect())-cc.rectGetMinX( body.getBodyRect())))*body2.getBodyRect().height/body2.getBodyRect().width;
								if(cc.rectGetMinY(body.getBodyRect())<y+cc.rectGetMinY(body2.getBodyRect())){

									body.y = y+cc.rectGetMinY(body2.getBodyRect());
									body.setVy(0);
									body.setAy(0);

									if(body2.getFriction()<1){
										body.setEff_X_Time(1,this._G*(1-body2.getFriction()));

									}
								}
							}

						}else{

							// 判断上下

							if(cc.rectGetMaxY(body2.getBefBodyRect())<=cc.rectGetMinY(body.getBefBodyRect())){// 从上往下
								body.y = cc.rectGetMaxY(body2.getBodyRect());
								body.setVy(0);
								body.setAy(0);

								if(body2.getBefPos().x != body2.x&&body.getDir()==BODY_DIR_STAY){// 添加
									// 移动平台
									// 摩擦力
									body.x+=(body2.x-body2.getBefPos().x)*body2.getFriction();
								}

								if(body2.getFriction()<1&&body.getBefVx()!=0&&body.getVx()==0){// 添加上面物体摩擦力
									// 速度变化

									body.setEff_X_Time(30*(1-body2.getFriction()),body2.getBefVx()*(1-body2.getFriction()));
								}

								continue;
							}else if(cc.rectGetMinY(body2.getBefBodyRect())>=cc.rectGetMaxY(body.getBefBodyRect())){ // 从下往上
								body.y = cc.rectGetMinY(body2.getBodyRect())-body.getBodyRect().height+1;
								body.setVy(0);
								body.setAy(0);

								continue;
							}


							// /////////

							// 判断左右

							// if(body.getDir() == BODY_DIR_RIGHT){//向右移动
							//						
							// }else if(body.getDir() == BODY_DIR_LEFT){//向左移动
							//						
							// }
							if(cc.rectGetMinX(body2.getBefBodyRect())>=cc.rectGetMaxX(body.getBefBodyRect())){
								body.x = cc.rectGetMinX(body2.getBodyRect())-body.getBodyRect().width;
								body.clearEff_x();
								continue;
							}else if(cc.rectGetMaxX(body2.getBefBodyRect())<=cc.rectGetMinX(body.getBefBodyRect())){
								body.x = cc.rectGetMaxX(body2.getBodyRect());
								body.clearEff_x();
								continue;
							}

							// /////////
						}
					}
				}
			}
			
			body.setBefVx();
		}
		
		
		this.enableDebug();
	},
	
	enableDebug:function(){
		drawNode.removeAllChildren(true);
		for(var i = 0; i < _bodyArray.length ;i++){
			var body =_bodyArray[i];
		
			var darw = new cc.DrawNode();
		
			darw.drawRect(cc.p(body.getBefBodyRect().x, body.getBefBodyRect().y), cc.p(body.getBefBodyRect().x+body.getBodyRect().width, body.getBefBodyRect().y+body.getBodyRect().height), cc.color(0, 0, 255, 100), 2, cc.color(0, 0, 0, 100));

			
			darw.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(0, 255, 0, 100), 2, cc.color(0, 0, 0, 100));
			darw.drawCircle(body.getPosition(), 10, 360, 10, true, 5, cc.color(0, 0, 0, 100));
// darw.drawRect(cc.p(body.getBodyRect().x, cc.rectGetMaxY(body.getBodyRect())),
// cc.p(body.getBodyRect().x+body.getBodyRect().width,
// cc.rectGetMaxY(body.getBodyRect())-body.getBodyRect().height), cc.color(0,
// 255, 0, 100), 2, cc.color(0, 0, 0, 100));
			
			
			
			drawNode.addChild(darw,	20,-100);
		}
		
		for(var i = 0; i < _rigidBodyArray.length ;i++){
			
			var body =_rigidBodyArray[i];


			var darw = new cc.DrawNode();

// darw.drawRect(cc.p(body.getBefBodyRect().x, body.getBefBodyRect().y),
// cc.p(body.getBefBodyRect().x+body.getBodyRect().width,
// body.getBefBodyRect().y+body.getBodyRect().height), cc.color(0, 0, 255, 100),
// 2, cc.color(0, 0, 0, 100));

			if(body.getType() == BODY_TYPE_RIGID_BODY_SLOPE_UP){
				darw.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(0, 255, 255, 100), 2, cc.color(0, 0, 0, 100));
				darw.drawSegment(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height),2, cc.color(0, 255, 255, 100))
			}else if(body.getType() == BODY_TYPE_RIGID_BODY_SLOPE_DOWN){
				darw.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(0, 255, 255, 100), 2, cc.color(0, 0, 0, 100));
				darw.drawSegment(cc.p(body.getBodyRect().x, body.getBodyRect().y+body.getBodyRect().height), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y),2, cc.color(0, 255, 255, 100))
			}else if(body.getType() == BODY_TYPE_RIGID_BODY_LADDER){
				darw.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(255, 255, 0, 100), 2, cc.color(0, 0, 0, 100));

			}else{
				darw.drawRect(cc.p(body.getBodyRect().x, body.getBodyRect().y), cc.p(body.getBodyRect().x+body.getBodyRect().width, body.getBodyRect().y+body.getBodyRect().height), cc.color(255, 0, 0, 100), 2, cc.color(0, 0, 0, 100));

			}
			
			darw.drawCircle(body.getPosition(), 10, 360, 10, true, 5, cc.color(0, 0, 0, 100));
			drawNode.addChild(darw,	10,-100);
		}
		
		
	},
	
});