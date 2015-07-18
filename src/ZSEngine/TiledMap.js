
var TiledMap = cc.TMXTiledMap.extend({

	ctor:function (name) {

		this._super(name);

		return true;
	},
	
	getIndextAt : function(pos){
		return cc.p(parseInt(pos.x/this.getTileSize().width),
				parseInt((this.getMapSize().height*this.getTileSize().height-pos.y)/this.getTileSize().height));
	},
	
	getInfoAt : function(pos,layer,info) {
		
		var tpos = this.getIndextAt(pos);
		
		if (tpos.x<0||tpos.x>=this.getMapSize().width
				||tpos.y<0||tpos.y>=this.getMapSize().height
				) {
			return 0;
		}
		
		var type = 0;
		
		
		var id = type = this.getLayer(layer).getTileGIDAt(tpos);
		
		if(id!=0){
			var propertiesDict = this.getPropertiesForGID(id);
			type = propertiesDict[info];
		}
		
		return type;
	},
	
	getRectAt : function(pos,layer) {
		return cc.rect(this.getLayer(layer).getPositionAt(this.getIndextAt(pos)).x, this.getLayer(layer).getPositionAt(this.getIndextAt(pos)).y, this.getTileSize().width, this.getTileSize().height);
	},
	
	getRectsAt : function(body,layer,type,info) {

		var array = new Array();
		
		
//		//右边
//		x = cc.rectGetMaxX(body);
//		y = cc.rectGetMaxY(body);
//
//		while (y > cc.rectGetMinY(body)) {
//			var t = this.getInfoAt(cc.p(x, y),layer,info);
//
//			if(t == type){
//				array.push(this.getRectAt(cc.p(x, y), layer));
//			}
//			y -= this.getTileSize().height;
//			if(y<cc.rectGetMinY(body)){
//				y = cc.rectGetMinY(body);
//			}
//		}
		
		//右边
		x = cc.rectGetMaxX(body);
		y = cc.rectGetMinY(body);

		while (y<cc.rectGetMaxY(body)) {
			y += this.getTileSize().height;
			if (y>cc.rectGetMaxY(body)) {
				y = cc.rectGetMaxY(body);
			}
			var t = this.getInfoAt(cc.p(x, y),layer,info);

			if(t == type){
				array.push(this.getRectAt(cc.p(x, y), layer));
			}
		}
		
		////
		// 左边
		x = cc.rectGetMinX(body);
		y = cc.rectGetMinY(body);

		while (y<cc.rectGetMaxY(body)) {
			y += this.getTileSize().height;
			if (y>cc.rectGetMaxY(body)) {
				y = cc.rectGetMaxY(body);
			}
			var t = this.getInfoAt(cc.p(x, y),layer,info);

			if(t == type){
				array.push(this.getRectAt(cc.p(x, y), layer));
			}
		}
		////
		
		//下
		var x = cc.rectGetMinX(body);
		var y = cc.rectGetMinY(body);
		
		while (x<cc.rectGetMaxX(body)) {
			
			var t = this.getInfoAt(cc.p(x, y),layer,info);
			
			if(t == type){
				array.push(this.getRectAt(cc.p(x, y), layer));
			}
			
			x +=this.getTileSize().width;
			
			if (x > cc.rectGetMaxX(body)) {
				x = cc.rectGetMaxX(body);
				
				t = this.getInfoAt(cc.p(x, y),layer,info);

				if(t == type){
					array.push(this.getRectAt(cc.p(x, y), layer));
				}
			}
		}
		//////
		
		
		
		///上边
		
		var x = cc.rectGetMinX(body);
		var y = cc.rectGetMaxY(body);

		while (x<cc.rectGetMaxX(body)) {
			
			

			x +=this.getTileSize().width;

			if (x > cc.rectGetMaxX(body)) {
				x = cc.rectGetMaxX(body);
				break;
			}
			
			var t = this.getInfoAt(cc.p(x, y),layer,info);

			if(t == type){
				array.push(this.getRectAt(cc.p(x, y), layer));
			}
		}
		
//		x = cc.rectGetMinX(body);
//		y = cc.rectGetMaxY(body);
//		
//		while (x < cc.rectGetMaxX(body)) {
//			x += this.getTileSize().width;
//			if (x>cc.rectGetMaxX(body)) {
//				x = cc.rectGetMaxX(body);
//			}
//			
//			var t = this.getInfoAt(cc.p(x, y),layer,info);
//
//			if(t == type){
//				array.push(this.getRectAt(cc.p(x, y), layer));
//			}
//		}
		////
		
		return array;
	},
});