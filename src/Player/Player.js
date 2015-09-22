var Player_const = {
		DIR_LEFT : 0,
		DIR_RIGHT : 1,
		
		STATE_STAY : 0,
		STATE_ATK : 1,
		STATE_SKILL : 1,
		STATE_JUMP : 3,
		STATE_FALL : 4,
		STATE_RUN : 5,
		
		ANIM_STAY : 0,
		ANIM_ATK : 1,
		ANIM_SKILL : 2,
		ANIM_JUMP_UP : 3,
		ANIM_JUMP_DOWN : 4,
		ANIM_RUN :5,

};


var Player = Actor.extend({

	_dir : null,
	
	_jumpC : 0,
	
	_state : Player_const.STATE_STAY,
	
	
	ctor:function (name) {
		this._super(name);
		this._dir = Player_const.DIR_LEFT;
		
		return true;
	},
	
	
	cycle : function(dt) {
		if (this._state == Player_const.STATE_ATK) {
			if (this.getAnimation().getCurrentMovementID()=="") {
				this.playStay();
			}
		}
		
//		this.debugDraw();
	},
	
	getDir : function() {
		return this._dir;
	},
	
	setDir :function(dir){
		
		if (this._dir != dir) {
			this.setScaleX(-this.getScaleX());
		}
		this._dir = dir;
		
	},
	
	getJumpC : function(){
		return this._jumpC;
	},
	
	addJumpC : function(){
		
		this._jumpC++;
	},
	
	clearJumpC : function() {
		this._jumpC=0;
	},
	
	playJump : function() {
		this._state = Player_const.STATE_JUMP;
		
		this.playWithIndex(Player_const.ANIM_JUMP_UP);
		
	},
	
	playFall : function() {
		if (this._state != Player_const.STATE_ATK) {
			this._state = Player_const.STATE_FALL;

			this.playWithIndex(Player_const.ANIM_JUMP_DOWN);
		}
		
	},
	
	playStay : function() {
		this._state = Player_const.STATE_STAY;
		
		this.playWithIndex(Player_const.ANIM_STAY);
		
		
	},
	
	
	playRun : function() {
		if (this._state == Player_const.STATE_STAY) {
			this.playWithIndex(Player_const.ANIM_RUN);
			this._state = Player_const.STATE_RUN;
		}
		
	},
	
	playAtk : function() {
		if (this._state != Player_const.STATE_ATK) {
			
			this.playWithIndex(Player_const.ANIM_ATK);

			this._state = Player_const.STATE_ATK;
			
		}
		
		
	},
	
	
	isCanRun : function() {
		
		
		
		return this._state != Player_const.STATE_ATK;
	},
	
	isCanChangeDir : function() {
		return this._state != Player_const.STATE_ATK;
	},
	
	isCanJump : function() {
//		return this._state != Player_const.STATE_ATK;
		return this._jumpC<2;
	},
});