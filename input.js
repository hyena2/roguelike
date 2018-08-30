document.onkeyup = function(key){

	text = ""; //Reset text at the begining of the turn
	currentTile = player.x + (player.y*5);

	if(key.key == "ArrowRight"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile + 1]);
			updateMap();
		}else{
			if(tiles[map_[currentTile + 1]].solid == false){
				player.x++;
				updateMap();
				text += "You moved to the East.";
			}
		}
	}

	if(key.key == "ArrowLeft"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile - 1]);
			updateMap();
		}else{
			if(tiles[map_[currentTile - 1]].solid == false){
				player.x--;
				updateMap();
				text += "You moved to the West.";
			}
		}
	}

	if(key.key == "ArrowDown"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile + width]);
			updateMap();
		}else{
			if(tiles[map_[currentTile + width]].solid == false){
				player.y++;
				updateMap();
				text += "You moved to the South.";
			}
		}
	}

	if(key.key == "ArrowUp"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile - width]);
			updateMap();
		}else{
			if(tiles[map_[currentTile - width]].solid == false){
				player.y--;
				updateMap();
				text += "You moved to the North.";
			}
		}
	}


	if(key.key == "a"){
		player.choosenCommand = player.attack;
		text += "In wich direction do you want to attack?";
	}

	if(key.key == "t"){
		player.choosenCommand = player.take;
		text += "What do you want to take?";
	}

	drawText(text); //Display resulting text
}

