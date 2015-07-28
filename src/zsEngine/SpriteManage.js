var SpriteManage = cc.Node.extend({

	_spriteSet : null,

	ctor:function () {

		this._super();

		this._spriteSet = new Array();

		return true;
	},

	addSprite : function(sprite) {
		this.addSpriteAndZ(sprite,0);
	},

	addSpriteAndZ : function(sprite , z) {
		this._spriteSet.push(sprite);
		this.addChild(sprite, z);
	},


	cycle:function(dt){
		for (var i = 0; i < this._spriteSet.length; ++i) {
			var sprite = this._spriteSet[i];
			sprite.cycle(dt);
			if(sprite.getState() == Sprite_const.STATE_DEAD){

				this._spriteSet.splice(i, 1);
				this.removeChild(sprite, true);
				i--;
				continue;
			}
		}
	},

	getSprite : function() {
		return this._spriteSet;
	},

});