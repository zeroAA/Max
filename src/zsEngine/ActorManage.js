var ActorManage = cc.Node.extend({
	
	_actorSet : null,
	
	ctor:function () {

		this._super();
		
		this._actorSet = new Array();
		
		return true;
	},
	
	addActor : function(actor) {
//		this.addActorAndZ(actor,0);
		this._actorSet.push(actor);
		this.addChild(actor, actor.getLocalZOrder());
	},
	
//	addActorAndZ : function(actor , z) {
//		this._actorSet.push(actor);
//		this.addChild(actor, actor.getLocalZOrder());
//	},
	
	
	cycle:function(dt){
		for (var i = 0; i < this._actorSet.length; ++i) {
			var actor = this._actorSet[i];
			actor.cycle(dt);
			if(actor.getState() == Actor_const.STATE_DEAD){
				
				this._actorSet.splice(i, 1);
				this.removeChild(actor, true);
				i--;
				continue;
			}
		}
	},
	
	getActor : function() {
		return this._actorSet;
	},
	
});