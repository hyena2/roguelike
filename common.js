
var display = new ROT.Display({width:80, height:20});
var container = display.getContainer();

function displayEntity(entity){
	foreground = ROT.Color.toRGB([255,255,255]);
	background = ROT.Color.toRGB([0,0,0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(entity.x,entity.y,colors + entity.character);
}

function drawMap(width,height,map){
	for(var i = 0; i < width; i++){
		for(var j = 0; j < height; j++){
			foreground = ROT.Color.toRGB([255,255,255]);
			background = ROT.Color.toRGB([0,0,0]);
			colors = "%c{" + foreground + "}%b{" + background + "}";
			display.drawText(j,i,colors + map[(i*width)+j]);
		}
	}
}

function moveNpc(npc,directions){

	var dice = directions[Math.floor(Math.random() * directions.length)];
	var currentTile = npc.x + (npc.y*height);
	var moved = false;

	if(dice == 0 && tiles[map_[currentTile + 1]].solid == false){
		npc.x++;
		moved = true;
		map_Info[currentTile + 1].npc = npc; //Update map_Info
		map_Info[currentTile].npc = null; //Reset old tile in map_Info
	}

	if(dice == 1 && tiles[map_[currentTile - 1]].solid == false){
		npc.x--;
		moved = true;
		map_Info[currentTile - 1].npc = npc;
		map_Info[currentTile].npc = null; 
	}

	if(dice == 2 && tiles[map_[currentTile + width]].solid == false){
		npc.y++;
		moved = true;
		map_Info[currentTile + width].npc = npc;
		map_Info[currentTile].npc = null; 
	}

	if(dice == 3 && tiles[map_[currentTile - width]].solid == false){
		npc.y--;
		moved = true;
		map_Info[currentTile - width].npc = npc;
		map_Info[currentTile].npc = null; 
	}

	//The function calls itself until it finds a tile free to move
	if(!moved){
		//Remove invalid direction
		directions.splice[dice,1];
		moved = moveNpc(npc,directions);
	}
}

function attack(attacker,target){
	if(target != null){
		target.hp -= attacker.at - target.df;
		if(target.hp < 0){
			target.alive = false;
		}
	}
}

function drawText(text){
	foreground = ROT.Color.toRGB([255,255,255]);
	background = ROT.Color.toRGB([0,0,0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(0,19,colors + text);
}

function updateMap(){
	display.clear();
	drawMap(5,5,map_);
	updateNpcs();
	player.display();
}

function updateNpcs(){
	npcs.map(function(npc){
		npc.think();
		npc.display();
	});
}
