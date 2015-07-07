var Sprite_const = {
		STATE_NORMAL : 100,
		STATE_DEAD : 101,
};

var Sprite = cc.Sprite.extend({
	
	_state : Sprite_const.STATE_NORMAL,
	
	_proState : this._state,
	_isAutoDead : true,
	
	ctor:function (name) {

		this._super(name);
		
		return true;
	},
	
	cycle : function(dt) {
		
	},
	
	getBodyRect:function(){
		return this.boundingBox();
	},
	
	setAutoDead:function(isDead){
		this._isAutoDead = isDead;
	},
	
	getState : function() {
		return this._state;
	},

	setState : function(state) {
		this._state = state;
	},
	
	setProState : function(state){
		this._proState = state;
	},
	
	getProState : function() {
		return this._proState;
	},
});