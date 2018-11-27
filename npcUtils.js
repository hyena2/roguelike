npcUtils = {
	moveNpc: function (npc) {
		var dice = Math.round(Math.random() * 4);
		switch (dice) {
			case 0:
				if(npc.posX > 0){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posX == npc.posX - 1).length > 0 ? true : false;
					var playerInTargetPosition = state.player.x == npc.posX - 1 && state.player.y == npc.posY;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX-1][npc.posY]].solid;
					if (npc.posX > 0 && !npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posX--;
					break;
				}else{
					break;
				}
			case 1:
				if(npc.posX < state.height){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posX == npc.posX + 1).length > 0 ? true : false;
					var playerInTargetPosition = state.player.x == npc.posX + 1 && state.player.y == npc.posY;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX+1][npc.posY]].solid;
					if (!npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posX++;
					break;
				}else{
					break;
				}
			case 2:
				if(npc.posY > 0){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posY == npc.posY - 1).length > 0 ? true : false;
					var playerInTargetPosition = state.player.y == npc.posY - 1 && state.player.x == npc.posX;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX][npc.posY-1]].solid;
					if (!npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posY--;
					break;
				}else{
					break;
				}
			case 3:
				if(npc.posY < state.width){
					var npcsInTargetPosition = state.mapNpcs.filter(n => n.posY == npc.posY + 1).length > 0 ? true : false;
					var playerInTargetPosition = state.player.y == npc.posY + 1 && state.player.x == npc.posX;
					var targetTileIsSolid = state.tiles[state.map.map[npc.posX][npc.posY+1]].solid;
					if (!npcsInTargetPosition && !playerInTargetPosition && !targetTileIsSolid) npc.posY++;
					break;
				}else{
					break;
				}
		}
	}
}
