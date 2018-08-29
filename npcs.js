var leecher = {

	character : "=",
	at: 2,
	df: 3,
	hp:5,
	alive: true,
	x: 3,
	y: 2,
	name: "leecher",
	desciption: "A gigantic worm-like animal that stinks",
	move: function(){
		moveNpc(this,[0,1,2,3]);
	},
	display: function(){
		displayEntity(this);
	},
	attack: function(){
		attack(this,player);
		text += "The leechen attacked you!";
	},
	think: function(){
		if((player.x == this.x + 1 && player.y == this.y) || (player.x == this.x - 1 && player.y == this.y) ||
		   (player.y == this.y - 1 && player.x == this.x) || (player.y == this.y + 1 && player.x == this.x)){ 
			this.attack();
		}else{
			this.move();
		}
	}
}
