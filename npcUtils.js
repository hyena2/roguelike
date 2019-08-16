npcUtils = {
	moveNpc: function (npc) {
		var dice = Math.round(Math.random() * 3);
		switch (dice) {
			case 0:
				if(npc.posX > 0){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posX == npc.posX - 1 && n.posY == npc.posY).length > 0 ? true : false;
					var playerInTargetPosition = state.player.x == npc.posX - 1 && state.player.y == npc.posY;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX-1][npc.posY]].solid;
					if (npc.posX > 0 && !npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posX--;
					break;
				}else{
					break;
				}
			case 1:
				if(npc.posX < state.width - 1){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posX == npc.posX + 1 && n.posY == npc.posY).length > 0 ? true : false;
					var playerInTargetPosition = state.player.x == npc.posX + 1 && state.player.y == npc.posY;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX+1][npc.posY]].solid;
					if (!npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posX++;
					break;
				}else{
					break;
				}
			case 2:
				if(npc.posY > 0){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posY == npc.posY - 1 && n.posX == npc.posX).length > 0 ? true : false;
					var playerInTargetPosition = state.player.y == npc.posY - 1 && state.player.x == npc.posX;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX][npc.posY-1]].solid;
					if (!npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posY--;
					break;
				}else{
					break;
				}
			case 3:
				if(npc.posY < state.height - 1){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posY == npc.posY + 1 && n.posX == npc.posX).length > 0 ? true : false;
					var playerInTargetPosition = state.player.y == npc.posY + 1 && state.player.x == npc.posX;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX][npc.posY+1]].solid;
					if (!npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posY++;
					break;
				}else{
					break;
				}
		}
		var stateText = state.text;
	},
	isPlayerAround: function(npc){
		if((npc.posX == state.player.x - 1 && npc.posY == state.player.y )|| 
		   (npc.posX == state.player.x + 1 && npc.posY == state.player.y)|| 
		   (npc.posY == state.player.y - 1 && npc.posX == state.player.x)|| 
		   (npc.posY == state.player.y + 1 && npc.posX == state.player.x)){
			return true;
		}else{
			return false;
		}
	},
	attack: function(npc,target){
		target.hp -= npc.attack;
		state.text += npc.description + " attacked you. "
			console.log(npc);
	},
}
