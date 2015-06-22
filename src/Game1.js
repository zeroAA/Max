
var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new GameLayer();
		this.addChild(layer);
	}
});

var space;
var startX=0;
var GameLayer = cc.Layer.extend({
	
	BG_Z:-50,
	
	PLAYER_Z:-10,
	
	_bg_layer:null,
	
	actor:null,
	
	body:null,
	
	actor1:null,
	
	map:null,
	
	ctor:function () {
		
		this._super();
		
		var win = cc.winSize;
		
		this.initPhysics();
		
		this._bg_layer = new BackLayer();
	
		this.addChild(this._bg_layer,this.BG_Z);
		
		this.map = new cc.TMXTiledMap(res.map1_tmx);
		
		this.addChild(this.map, -5);
		
		ccs.armatureDataManager.addArmatureFileInfo(res.player_1_csb);
		
		this.actor1 = new ccs.Armature("player_1");
		
		this.actor1.getAnimation().playWithIndex(0);
		this.addChild(this.actor1,this.PLAYER_Z);
		
		this.body = new cp.Body(1, cp.momentForBox(1, this.actor1.boundingBox().width, this.actor1.boundingBox().height) );
		this.body.setPos( cc.p(win.width*0.5, win.height*0.5) );
		startX = this.body.getPos().x;
//		this.body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
		this.space.addBody( this.body );

		// create shape
		var shape = new cp.BoxShape( this.body, this.actor1.boundingBox().width, this.actor1.boundingBox().height);
		shape.setElasticity( 0.5 );
		shape.setFriction( 1000 );
		this.space.addShape( shape );
		
//		this.actor = new cc.PhysicsSprite(res.CloseNormal_png);
//		this.actor.setBody(body);
//		this.addChild(this.actor,this.PLAYER_Z);
		
		var body1 = new cp.Body(100, cp.momentForBox(1, this.actor1.boundingBox().width, this.actor1.boundingBox().height) );
		body1.setPos( cc.p(win.width*0.8, win.height*0.3) );
		this.space.addBody( body1 );

		// create shape
		var shape1 = new cp.SegmentShape(this.space.staticBody,
				cp.v(win.width*0.8, 0),// start point
				cp.v(30,  win.height),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape( shape1 );
			
		
		var _debugNode =new cc.PhysicsDebugNode(this.space);
		// Parallax ratio and offset
		this.addChild(_debugNode, 10);
		
//		var contentSize = actor.getBoundingBox();
//		// 2. init the runner physic body
//		var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
//		//3. set the position of the runner
//		body.p = cc.p(g_runnerStartX, g_groundHight + contentSize.height*0.5);
//		//4. apply impulse to the body
//		body.applyImpulse(cp.v(150, 0), cp.v(0, 0));//run speed
//		//5. add the created body to space
//		this.space.addBody(body);
//		//6. create the shape for the body
//		var shape = new cp.BoxShape(body, contentSize.width - 14, contentSize.height);
//		//7. add shape to space
//		this.space.addShape(shape);
//		//8. set body to the physic sprite
//		actor.setBody(body);
//		
//		actor.setPosition(win.width*0.5, win.height*0.5);
//		this.addChild(actor,this.PLAYER_Z);
		
//		var armature = new ccs.Armature("res/player/player_1.csb");
//		armature.getAnimation().playWithIndex(0);
//		armature.x = 50 + this.armatureCount * 2;
//		armature.y = 150;
//		armature.scale = 0.6;
		
//		this.addChild(armature);
		
		
		
		this.scheduleUpdate();
		
		return true;
		
	},
	
	// init space of chipmunk
	initPhysics:function() {
		//1. new space object 
		this.space = new cp.Space();
		//2. setup the  Gravity
		this.space.gravity = cp.v(0, -350);

		// 3. set up Walls
		var wallBottom = new cp.SegmentShape(this.space.staticBody,
				cp.v(0, g_groundHight),// start point
				cp.v(4294967295, g_groundHight),// MAX INT:4294967295
				0);// thickness of wall
		this.space.addStaticShape(wallBottom);
	},
	
	update:function (dt) {
		// chipmunk step
		this.space.step(dt);
		this.actor1.setPosition(this.body.getPos());
		this.setPosition(cc.p(-this.body.getPos().x+startX,0));
	},

});