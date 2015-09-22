

var zsP_Body_const = {
		
		TYPE_NORMAL : 0,
		
		TYPE_RIGID_BODY : 1, //固体
		
		TYPE_RIGID_BODY_SLOPE_UP : 2, //楼梯上

		TYPE_RIGID_BODY_SLOPE_DOWN : 3, //楼梯下

		TYPE_RIGID_BODY_DRIVE : 4, // 

		TYPE_RIGID_BODY_LADDER : 5, //梯子
		
		TYPE_RIGID_BODY_ROOF : 6, //薄地板不判断左右 可跳下

	    DIR_STAY : 0,

	    DIR_RIGHT : 1,

	    DIR_LEFT : 2,

	    DIR_UP : 3,

	    DIR_DOWN : 4,

	    STATE_NORMAL : 0,

	    STATE_RIGID_BODY : 1,

	    STATE_MOVE : 100,

	    STATE_MOVE_AND_BACK : 101,

	   	STATE_BACK : 102,
	   	
	   	LIFE_TIME_LIMIT : -10,
	   	
	   	ON_GROUND_NO : 0,
	   	
	   	ON_GROUND_RIGID : 1,
	   	
	   	ON_GROUND_ROOF : 2,

	   
};

//var zsP_Body_const.TYPE_NORMAL = 0;
//
//var zsP_Body_const.TYPE_RIGID_BODY = 1;
//
//var zsP_Body_const.TYPE_RIGID_zsP_Body_const.SLOPE_UP = 2;
//
//var zsP_Body_const.TYPE_RIGID_zsP_Body_const.SLOPE_DOWN = 3;
//
//var zsP_Body_const.TYPE_RIGID_zsP_Body_const.DRIVE = 4;
//
//var zsP_Body_const.TYPE_RIGID_zsP_Body_const.LADDER = 5;
//
//var zsP_Body_const.DIR_STAY = 0;
//
//var zsP_Body_const.DIR_RIGHT = 1;
//
//var zsP_Body_const.DIR_LEFT = 2;
//
//var zsP_Body_const.DIR_UP = 3;
//
//var zsP_Body_const.DIR_DOWN = 4;
//
//var zsP_Body_const.STATE_NORMAL = 0;
//
//var zsP_Body_const.STATE_RIGID_BODY = 1;
//
//var zsP_Body_const.STATE_MOVE = 100;
//
//var zsP_Body_const.STATE_MOVE_AND_BACK = 101;
//
//var zsP_Body_const.STATE_BACK = 102;

var zsP_Body = cc.Node.extend({
	
	_isCanFall : false,//是否受到重力影响
	
	_isOnLadder : false,//是否在爬梯子
	
	_isCollisionLadder : false,//是否碰到梯子
	
	_type : zsP_Body_const.TYPE_NORMAL,
	
	_state : zsP_Body_const.STATE_NORMAL,
	
	_bodyRect : null,
	
	_dir : zsP_Body_const.DIR_STAY,
	
	_befPos : null,//上次位置
	_befVx : 0,// 上次速度
	
	_Vx : 0,//速度x
	_Vy : 0,//速度y
	_Ax : 0,//加速度x
	_Ay : 0,//加速度y
	
	_isClear_eff_x:false,//是否清除影响速度x
	_eff_x : [],//影响速度x时间
	
	_isClear_eff_y:false,//是否清除影响向上速度y
	_isClear_Up_eff_y:false,//是否清除影响向上速度y
	_isClear_Down_eff_y:false,//是否清除影响向下速度y
	
	_eff_y : [],//影响速度y
	
	
	_moveTime : 0,//移动时间
	_nowMoveTime : 0,
	
	_friction : 1,//摩擦力0-1百分系数
	
	_outForce : 0,//给上面物体附加外力
	
	_lifeTime : zsP_Body_const.LIFE_TIME_LIMIT,
	
	_inertia_x : 0,
	
	_inertia_time : 0,
	
	_isPassRange : false,
	
	_maxG : null,//最大重力加速度防止穿越
	
	_node : null,//显示对象
	
	_nodeAnchor : null, //显示对象相对锚点
	
	_onGroundType : 0,
	ctor:function (bodyRect) {
		
		this._super();
		
		this._nodeAnchor =  cc.p(0.5, 0);
		
		this.setBodyRect(bodyRect);
		
//		this.Vx = -10;
//		this.Vy = 14;
		
		return true;
	},
	
	setNode : function(node) {
		this._node = node;
	},
	
	setNodePos : function() {
		if(this._node != null){
			this._node.setPosition( cc.pAdd(this.getPosition(), cc.p(this._bodyRect.width*this._nodeAnchor.x, this._bodyRect.height*this._nodeAnchor.y)));
		}else{
//			cc.log("zsbody _node is null");
		}
		
	},
	
	setBodyRect : function(bodyRect) {
		this._bodyRect = bodyRect;
		this._maxG = bodyRect.height-1;
	},
	
	getMaxG : function() {
		return this._maxG;
	},
	
	isPassRange : function() {
		return this._isPassRange;
	},
	
	setLifeTime : function(time) {
		this._lifeTime = time;
	},
	
	getLifeTime : function() {
		return this._lifeTime;
	},
	
	setType:function(type){
		this._type = type;
		
		
	},
	
	getType:function(){
		return this._type;
	},
	
	setIsCanFall:function(can){
		this._isCanFall = can;
	},
	
	isCanFall:function(){
		return this._isCanFall;	
	},
	
	cycle:function (dt) {
		// chipmunk step
		if(this._lifeTime!=zsP_Body_const.LIFE_TIME_LIMIT){
			this._lifeTime--;
		}
		
		switch (this._state) {
		case zsP_Body_const.STATE_NORMAL:
//			if(this._type ==  zsP_Body_const.TYPE_NORMAL){
//				cc.log("???!!"+this._Vy);
//			}
			
			
			this.x += this._Vx;
			this.y += this._Vy;

			this._Vx += this._Ax;
			this._Vy += this._Ay;
			
			if (this._inertia_time>0) {
				this._inertia_time--;
				this.x += this._inertia_x;
			}
			
			
			
			this.setDir();
			
			break;
		case zsP_Body_const.STATE_MOVE_AND_BACK:
			
			this.x += this._Vx;
			this.y += this._Vy;
			
			this._nowMoveTime++;
			if(this._nowMoveTime>=this._moveTime){
				this._nowMoveTime = 0;
				this.setState(zsP_Body_const.STATE_BACK);
			}
			
			break;
		case zsP_Body_const.STATE_BACK:
			
			this.x -= this._Vx;
			this.y -= this._Vy;

			this._nowMoveTime++;
			if(this._nowMoveTime>=this._moveTime){
				this._nowMoveTime = 0;
				this.setState(zsP_Body_const.STATE_MOVE_AND_BACK);
			}
			
			break;

		default:
			break;
		}
	},
	
	setInertia : function(x,t) {
		this._inertia_x = x;
		this._inertia_time = t;
	},
	
	getBodyRect:function(){
		return	cc.rect(this.getPositionX()+this._bodyRect.x,this.getPositionY()+this._bodyRect.y,this._bodyRect.width,this._bodyRect.height); ;
	},
	
	getBefBodyRect:function(){
		return	cc.rect(this._befPos.x+this._bodyRect.x,this._befPos.y+this._bodyRect.y,this._bodyRect.width,this._bodyRect.height); ;
	},
	
	setBefPos:function(){
		this._befPos = this.getPosition();
	},
	
	getBefPos:function(){
		return this._befPos;
	},
	
	setBefVx:function(){
		this._befVx = this._Vx;
	},
	
	getBefVx:function(){
		return this._befVx;
	},
	
	getDir:function(){
		
		return this._dir;	
	},
	
	setDir:function(){
		if(this._Vx > 0){
			this._dir = zsP_Body_const.DIR_RIGHT;

		}else if(this._Vx < 0){
			this._dir = zsP_Body_const.DIR_LEFT;

		}else if(this._Vy > 0){
			this._dir = zsP_Body_const.DIR_UP;
		}else if(this._Vy < 0){
			this._dir = zsP_Body_const.DIR_DOWN;
		}else{
			this._dir = zsP_Body_const.DIR_STAY;
		}
	},
	
	addVx:function(vx){
		this._Vx+=vx;
	},
	
	addVy:function(vy){
		this._Vy+=vy;
	},
	
	setVx:function(vx){
		this._Vx = vx;	
	},
	
	getVx:function(){
		return this._Vx;
	},
	
	setVy:function(vy){
		this._Vy = vy;
	},
	
	getVy:function(){
		return this._Vy;
	},
	
	setV:function(vx,vy){
		this.setVx(xv);
		this.setVy(vy);
	},
	
	setAx:function(ax){
		this._Ax = ax;
	},
	
	setAy:function(ay){
		this._Ay = ay;
	},
	
	setJump:function(vy){
		this._Vy = vy;
		this.setOnLadder(false);
	},
	
	setMoveTime:function(time){
		this._moveTime = time;
		this._nowMoveTime = 0;
	},
	
	setState:function(state){
		this._state = state;
	},
	
	setFriction:function(f){
		this._friction = f;
	},
	
	getFriction:function(){
		return this._friction;
	},
	
	setEff_X_Time:function(time,speed,type){
		
		for (var i = 0; i < this._eff_x.length; i++) {
			if (this._eff_x[i][2]==type) {
				return;
			}
		}
		
		this._eff_x.push([time,speed,type]);
		
	},
	
	
	setEff_Y_Time:function(time,speed,type){
		
		for (var i = 0; i < this._eff_y.length; i++) {
			if (this._eff_y[i][2]==type) {
//				this._eff_y[i][0] = time;
//				this._eff_y[i][1] = speed;
				return;
			}
		}

		this._eff_y.push([time,speed,type]);



	},
	
	getEff_Y_Time : function() {
		return this._eff_y.length;
	},
	
	
	clearEff_x:function(){
		this._isClear_eff_x = true;
		
	},
	
	clearEff_x_data : function() {
		this._eff_x = [];
		
		this._isClear_eff_x = false;
	},
	
	clearUpEff_y:function(){
		
		this._isClear_Up_eff_y = true;
		if (this._isClear_Down_eff_y) {
			this._isClear_eff_y = true;
		}
	},
	
	clearUpEff_y_data:function(){

		for (var i = 0; i < this._eff_y.length; ++i) {
			
			if(this._eff_y[i][1]>0){
				this._eff_y.splice(i, 1);
			}
		}
		this._isClear_Up_eff_y = false;
	},
	
	
	
	clearDownEff_y:function(){
		
		this._isClear_Down_eff_y = true;
		
		if (this._isClear_Up_eff_y) {
			this._isClear_eff_y = true;
		}
		
	},
	
	clearDownEff_y_data:function(){
		
		for (var i = 0; i < this._eff_y.length; ++i) {
			
			if(this._eff_y[i][1]<0){
				
				this._eff_y.splice(i, 1);
			}
		}
		this._isClear_Down_eff_y = false;
		
		
	},
	
	clearEff_y:function(){
		this._isClear_eff_y = true;
	},
	
	clearEff_y_data:function(){
		
		this._eff_y = [];
		this._isClear_eff_y = false;
		this._isClear_Down_eff_y = false;
		this._isClear_Up_eff_y = false;
	},
	
	clearEff:function(){
		this.clearEff_x();
		this.clearEff_y();
	},
	
	setOnLadder:function(on){
		this._isOnLadder = on;
	},
	
	isOnLadder:function(){
		return this._isOnLadder;
	},
	
	addEffV:function(){

		if(this._eff_x.length>0){
			
			var addX = 0;
			
			for(var i = 0;i<this._eff_x.length;++i){
				this._eff_x[i][0]--;
				addX += this._eff_x[i][1];
				
				if(this._eff_x[i][0]<=0){
					this._eff_x.splice(i, 1);
					i--;
					continue;
				}
			}
			
			this.x+=addX;
			
		}
		
		if(this._eff_y.length>0){
			
			var addY = 0;
			for(var i = 0;i<this._eff_y.length;++i){
				
				
				
				this._eff_y[i][0]--;
				addY += this._eff_y[i][1];

				if(this._eff_y[i][0]<=0){
					this._eff_y.splice(i, 1);
					i--;
					continue;
				}
			}
			
			
			this.y +=addY;
			
		}	
	},
	
	initState:function(){
		this.setBefPos();
//		this.setBefVx();
		this._isClear_eff_x = false;
		this._isClear_eff_y = false;
	},
	
	setOutForce : function(f){
		this._outForce = f;
	},
	
	getOutForce : function() {
		return this._outForce;
	},
	
	setCollisionLadder : function(is){
		this._isCollisionLadder = is;
	},
	
	isCollisionLadder : function() {
		return this._isCollisionLadder;
	},
	
	
	setNOOnGround : function() {
		
		this._isOnGround = zsP_Body_const.ON_GROUND_NO;
		
	},
	
	getOnGround : function() {
		return this._isOnGround;
	},
	
	isOnGround : function() {
		return this._isOnGround!=zsP_Body_const.ON_GROUND_NO;
	},
	
	setOnGround : function(ontype) {
		this.setVy(0);
		this.setAy(0);
		this.clearDownEff_y();
		this._isOnGround = ontype;
	},

	
	
});