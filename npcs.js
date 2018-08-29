var leecher = {

	character : "=",
	at: 2,
	df: 3,
	hp:5,
	alive: true,
	x: 3,
	y: 2,
	move: function(){
		moveNpc(this,[0,1,2,3]);
	},
	display: function(){
		displayEntity(this);
	},

}
