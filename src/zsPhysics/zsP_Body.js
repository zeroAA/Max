
var BODY_TYPE_NORMAL = 0;

var BODY_TYPE_RIGID_BODY = 1;

var BODY_TYPE_RIGID_BODY_SLOPE_UP = 2;

var BODY_TYPE_RIGID_BODY_SLOPE_DOWN = 3;

var BODY_TYPE_RIGID_BODY_DRIVE = 4;

var BODY_TYPE_RIGID_BODY_LADDER = 5;

var BODY_DIR_STAY = 0;

var BODY_DIR_RIGHT = 1;

var BODY_DIR_LEFT = 2;

var BODY_STATE_NORMAL = 0;

var BODY_STATE_RIGID_BODY = 1;

var BODY_STATE_MOVE = 100;

var BODY_STATE_MOVE_AND_BACK = 101;

var BODY_STATE_BACK = 102;

var zsP_Body = cc.Node.extend({
	
	_isCanFall : false,//是否受到重力影响
	
	_isOnLadder : false,
	
	_type : BODY_TYPE_NORMAL,
	
	_state : BODY_STATE_NORMAL,
	
	_bodyRect : null,
	
	_dir : BODY_DIR_STAY,
	
	_befPos : null,//上次位置
	_befVx : 0,// 上次速度
	
	_Vx : 0,//速度x
	_Vy : 0,//速度y
	_Ax : 0,//加速度x
	_Ay : 0,//加速度y
	
	_eff_x : 0,//影响速度x
	_eff_x_time : 0,//影响速度x时间
	_eff_Ax : 0,//影响速度加速度
	
	_eff_y : 0,//影响速度y
	_eff_y_time : 0,//影响速度y时间
	_eff_Ay : 0,//影响速度加速度
	
	
	_moveTime : 0,//移动时间
	_nowMoveTime : 0,
	
	_friction : 1,//摩擦力0-1百分系数

	ctor:function (bodyRect) {
		
		this._super();
		
		this._bodyRect = bodyRect;
		
//		this.Vx = -10;
//		this.Vy = 14;
	
		return true;
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
		
		switch (this._state) {
		case BODY_STATE_NORMAL:
			
			
			this.x += this._Vx;
			this.y += this._Vy;

			this._Vx += this._Ax;
			this._Vy += this._Ay;
			
			
			if(this._eff_x_time>0){
				
				this._eff_x_time--;
				this.x+=this._eff_x;
				this._eff_x+=this._eff_Ax;
			}
			
			if(this._eff_y_time>0){

				this._eff_y_time--;
				this.y+=this._eff_y;
				this._eff_y+=this._eff_Ay;
			}
			
			this.setDir();
			
			break;
		case BODY_STATE_MOVE_AND_BACK:
			
			this.x += this._Vx;
			this.y += this._Vy;
			
			this._nowMoveTime++;
			if(this._nowMoveTime>=this._moveTime){
				this._nowMoveTime = 0;
				this.setState(BODY_STATE_BACK);
			}
			
			break;
		case BODY_STATE_BACK:
			
			this.x -= this._Vx;
			this.y -= this._Vy;

			this._nowMoveTime++;
			if(this._nowMoveTime>=this._moveTime){
				this._nowMoveTime = 0;
				this.setState(BODY_STATE_MOVE_AND_BACK);
			}
			
			break;

		default:
			break;
		}
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
			this._dir = BODY_DIR_RIGHT;

		}else if(this._Vx < 0){
			this._dir = BODY_DIR_LEFT;

		}else{
			this._dir = BODY_DIR_STAY;
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
		if(this.getOnLadder()){
			this.setEff_Y_Time(8, 25);
		}else{
			this._Vy = vy;
		}
		
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
	
	setEff_X_Time:function(time,speed){
		
		this._eff_x_time =time;
		
		this._eff_x = speed;
		
//		this._eff_Ax -= this._eff_x/this._eff_x_time;
		
//		cc.log("??!!!"+this._eff_x_time+"  "+this._eff_x);
		
	},
	
	setEff_Y_Time:function(time,speed){

		this._eff_y_time =time;

		this._eff_y = speed;



	},
	
	clearEff_x:function(){
		this._eff_x_time =0;
		this._eff_x = 0;
		
	},
	
	setOnLadder:function(on){
		this._isOnLadder = on;
	},
	
	getOnLadder:function(){
		return this._isOnLadder;
	},
});