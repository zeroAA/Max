
var BackLayer = cc.Layer.extend({
	ctor:function () {

		this._super();
		
		var win = cc.winSize;
		
		var bg = new cc.Sprite(res.BG_1_png);

		bg.setPosition(cc.p(win.width*0.5, win.height*0.5));

		this.addChild(bg);
		
		return true;
	}
});