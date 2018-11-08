player = {
	character: "@",
	at: 5,
	df: 3,
	hp:5,
	x: 2,
	y: 2,
	alive: true,
	inventory: [],
	choosenCommand: null,
	display: function(){
		displayEntity(this);
	},
	attack: function(targetTile){
		attack(this,targetTile.npc);
		this.choosenCommand = null;
		text = "You attacked!";
	},
	take: function(targetTile){
		if(targetTile.object != null){
			take(this,targetTile.object);
			this.choosenCommand = null;
		}
	},
}
