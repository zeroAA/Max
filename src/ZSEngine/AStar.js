var AStar = cc.Class.extend({
	open : null, //待遍历的数组
	close : null, //关闭数组
	starPoint : null, //开始点
	closePoint : null, //结束点
	map : null, //地图数组
	dirs : null, //上左下右
	path : null, //路径数组
	ctor:function(){},
	findPath:function(start,end,m){
		this.open = new Array();
		this.close = new Array();
		this.path = new Array();
		this.starPoint = start;
		this.closePoint = end;
		this.map = m;
		this.dirs = [[0,1],[-1,0],[0,-1],[1,0]];
		for (var i = 0; i < this.map.length; i++) {
			this.close[i] = new Array();
			for (var n = 0; n < this.map[i].length; n++) {
				this.close[i][n] = 0;
			};
		};
		//加入起始节点  [x, y , G ,F ,father]
		this.open.push([this.starPoint[0],
		                this.starPoint[1],
		                0,
		                (Math.abs(this.closePoint[0]-this.starPoint[0])*10 + Math.abs(this.closePoint[1]-this.starPoint[1])*10),
		                null
		                ]);
		return this.ergodicGrid(this.open[0]);
	},
	//根据F值进行排序
	fSort:function(a,b){
		return a[3] - b[3];
	},
	//循环遍历网格    
	ergodicGrid:function(g){
		var around = this.getGridAround(g);
		for (var i = 0; i < around.length; i++) {
			//4.判断网格点是否为终点，为真则回溯路径点并结束遍历，为假则向下执行
			if (around<i>[0] == this.closePoint[0] && around<i>[1] == this.closePoint[1]) {
				cc.log("end");
				var ele = g;
				this.path.unshift([around<i>[0],around<i>[1]]);
				do{
					this.path.unshift([ele[0],ele[1]]);
					ele = ele[4];
				}while(ele[4] != null);
				return this.path;
			};
			//5.计算四周网格点的GHF值压入open堆栈并设当前网格点为父坐标；
			var G = g[2] + 10;
			var H = Math.abs(this.closePoint[0] - around<i>[0]) * 10 + Math.abs(this.closePoint[1] - around<i>[1]) * 10;
			var F = G + H;
			this.open.push([around<i>[0],around<i>[1],G,F,g]);
		};
		//6.将当前网格点压出open堆栈，并设置close数组坐标为1
		var out = this.open.shift(); //open.shift删除并返回数组的第一个元素
		this.close[out[1]][out[0]] = 1;
		//7.根据四周网格点F值重新排列open堆栈
		this.open.sort(this.fSort);
		//8.判断open堆栈是否为0，为真则返回null，为假则向下执行
		if (this.open.length == 0) return null;
		return this.ergodicGrid(this.open[0]);
	},
	//获取网格点上左下右
	getGridAround:function(g){
		var a = new Array();
		var xl = this.map[0].length;
		var yl = this.map.length;
		//1.获取当前网格点四周网格点坐标；
		for (var i = 0; i < this.dirs.length; i++) {
			var x = g[0] + this.dirs<i>[0];
			var y = g[1] + this.dirs<i>[1];
			if(x < 0 || x >= xl || y < 0 || y >= yl) continue;
			//2.判断四周网格点是否为父坐标；为真则不做处理，为假则向下执行
			if (g[4] != null) {
				if (x == g[4][0] && y == g[4][1]) continue;
			};
			//3.判断四周网格点是否为障碍或close数组里的坐标；为真则不处理，为假则向下执行
			if (this.map[y][x] == 0 || this.close[y][x] == 1) continue;
			a.push([x,y]);
		};
		return a;
	}
});