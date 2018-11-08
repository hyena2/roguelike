var potion =  {
	character: "p",
	name: "potion",
	x: 3,
	y: 3,
	effect : function (target){
		target.hp++;
	},
	description: "A little bottle with a green liquid",
	display : function(){
		displayEntity(this);
	},
}
