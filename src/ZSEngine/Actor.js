
var Actor_const = {
		STATE_NORMAL : 100,
		STATE_DEAD : 101,
};

var Actor = ccs.Armature.extend({
	
	_state : Actor_const.STATE_NORMAL,
	_proState : this._state,
	_isAutoDead : true,
	_body1 : null,
	_body2 : null,
	
	_darwNode : null,
	
	ctor:function (name) {

		this._super(name);
		this._body1 = new Array();
		this._body2 = new Array();
		
//		this.setBodyPonit();
		this.playWithIndex(0);
		if(DEBUG_DRAW){
			this.debugDraw();
		}
		
		
		
		
		
		return true;
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
	
	cycle:function(dt){
		
	},
	
	setBodyPonit:function(){
		this._body1 = [];
		this._body2 = [];
//		cc.getmap
//		cc.log("le : "+ this.getBoneNum());
//		cc.log("name : "+this.getAnimation().getMovementID());
		for(var i = 1 ; i < this.getBoneNum() ; ++i){
			var str = "body"+i+"_1";
			
			if(this.getBone(str)){
				this._body1.push(this.getBone(str).getPos());
//				cc.log("x : "+this._body1[0].x+"y : "+this._body1[0].y);
				
				var str1 = "body"+i+"_2"
					this._body2.push(cc.p(this.getBone(str1).getPos().x, this.getBone(str1).getPos().y));
//				cc.log("x : "+this.getBone(str1).x+"y : "+this._body2[0].y);
			}
		}
	},
	
	isCollisionBodyRect : function(rect) {
		return this.isCollisionBodyRectByIndext(rect,0);
	},
	
	isCollisionBodyRectByIndext : function(rect,indext) {
		return cc.rectIntersectsRect(this.getBodyRectByIndext(indext), rect);
	},
	
	getBodyRect:function(){
		return this.getBodyRectByIndext(0);
	},
	
	getBodyRectByIndext:function(indext){
		if(indext>this._body1.length){
			cc.log(this.getName() +"getBodyRect indext is over!");
		}
		var rect = cc.rect(this._body1[indext].x+this.x, this._body2[indext].y+this.y, this._body2[indext].x-this._body1[indext].x, this._body1[indext].y-this._body2[indext].y);
		
		return rect;
	},
	
	setAutoDead:function(isDead){
		this._isAutoDead = isDead;
	},
	
	play:function(name){
		this.getAnimation().play(name);
		this.setBodyPonit();
	},
	
	playWithIndex:function(indext){
		this.getAnimation().playWithIndex(indext);
		this.setBodyPonit();
	},
	
	debugDraw:function(){
//		if(this.){
//			
//		}
//		this.removeChild(this.darwNode, true);
		this._darwNode = new cc.Node();
		
		this.addChild(this._darwNode, 100);
		
		for(var i = 0 ; i < this._body1.length ; ++i){
			var darw = new cc.DrawNode();
			
			darw.drawRect(cc.p(this.getBodyRect().x, this.getBodyRect().y), cc.p(this.getBodyRect().x+this.getBodyRect().width, this.getBodyRect().y+this.getBodyRect().height), cc.color(255, 0, 0, 180), 2, cc.color(0, 0, 0, 180));
			
			darw.drawCircle(cc.p(this.getBodyRect().x, this.getBodyRect().y), 10, 360, 10, true, 5, cc.color(255, 255, 255, 100));
			
			this._darwNode.addChild(darw);
			
			
		}
		
	},
});