var Player_const = {
		DIR_LEFT : 0,
		DIR_RIGHT : 1,
		
		STATE_STAY : 0,
		STATE_JUMP : 4,
		STATE_FALL : 5,
		STATE_RUN : 9,
		STATE_STOP : 10,
		
		ANIM_STAY : 0,
		ANIM_ATK1 : 1,
		ANIM_ATK2 : 2,
		ANIM_ATK3 : 3,
		ANIM_JUMP1 : 4,
		ANIM_JUMP2 : 5,
		ANIM_JUMP3 : 6,
		ANIM_JUMP4 : 7,
		ANIM_BACK : 8,
		ANIM_RUN : 9,
		ANIM_STOP : 10,
		ANIM_DOWN : 11,
		ANIM_HITBACK : 12,
		ANIM_HIT : 13,
};


var Player = Actor.extend({

	_dir : null,
	
	_jumpC : 0,
	
	_state : Player_const.STATE_STAY,
	
	ctor:function (name) {
		this._super(name);
		this._dir = Player_const.DIR_LEFT;
		return;
	},
	
	
	cycle : function(dt) {
		if (this._state == Player_const.STATE_STOP) {
			if (this.getAnimation().getCurrentMovementID()=="") {
				this.playWithIndex(Player_const.ANIM_STAY);
				this._state = Player_const.STATE_STAY;
			}
		}
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
		
		if (this._jumpC==0) {
			this.playWithIndex(Player_const.ANIM_JUMP1);
		}else{
			this.playWithIndex(Player_const.ANIM_JUMP4);
		}
	},
	
	playFall : function() {
		this._state = Player_const.STATE_FALL;
		
		this.playWithIndex(Player_const.ANIM_JUMP3);
	},
	
	playStay : function() {
		this._state = Player_const.STATE_STAY;
		
		this.playWithIndex(Player_const.ANIM_STAY);
		
		this.clearJumpC();
	},
	
	playStop : function() {
		if (this._state == Player_const.STATE_RUN) {
			this.playWithIndex(Player_const.ANIM_STOP);
			this._state = Player_const.STATE_STOP;
		}
		
	},
	
	playRun : function() {
		if (this._state == Player_const.STATE_STAY||this._state == Player_const.STATE_STOP) {
			this.playWithIndex(Player_const.ANIM_RUN);
			this._state = Player_const.STATE_RUN;
		}
		
	},
});