document.onkeyup = function(key){

	text = ""; //Reset text at the begining of the turn
	currentTile = player.x + (player.y*80);

	if(key.key == "ArrowRight"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile + 1]);
			updateMap();
		}else{
			if(state.tiles[state.map.map[currentTile + 1]].solid == false){
				updatedPlayer = state.player;
				updatedPlayer.x++;
				state.set(['player'],[updatedPlayer]);
				text += "You moved to the East.";
			}
		}
	}

	if(key.key == "ArrowLeft"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile - 1]);
			updateMap();
		}else{
			if(state.tiles[state.map.map[currentTile - 1]].solid == false){
				updatedPlayer = state.player;
				updatedPlayer.x--;
				state.set(['player'],[updatedPlayer]);
				text += "You moved to the West.";
			}
		}
	}

	if(key.key == "ArrowDown"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile + state.height]);
			updateMap();
		}else{
			if(state.tiles[state.map.map[currentTile + state.width]].solid == false){
				updatedPlayer = state.player;
				updatedPlayer.y++;
				state.set(['player'],[updatedPlayer]);
				text += "You moved to the South.";
			}
		}
	}

	if(key.key == "ArrowUp"){
		if(player.choosenCommand != null){
			player.choosenCommand(map_Info[currentTile - state.height]);
			updateMap();
		}else{
			if(state.tiles[state.map.map[currentTile - state.width]].solid == false){
				updatedPlayer = state.player;
				updatedPlayer.y--;
				state.set(['player'],[updatedPlayer]);
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

