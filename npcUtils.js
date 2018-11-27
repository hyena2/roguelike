npcUtils = {
	moveNpc: function (npc) {
		var dice = Math.round(Math.random() * 4);
		switch (dice) {
			case 0:
				var npcsInTargetPosition = state.npcs.filter(n => n.posX == npc.posX - 1).length > 0 ? true : false;
				var playerInTargetPosition = state.player.x == npc.posX - 1;
				if (npc.posX > 0 && !npcsInTargetPosition && !playerInTargetPosition) npc.posX--;
				break;
			case 1:
				var npcsInTargetPosition = state.npcs.filter(n => n.posX == npc.posX + 1).length > 0 ? true : false;
				var playerInTargetPosition = state.player.x == npc.posX + 1;
				if (npc.posX < state.height) npc.posX++;
				break;
			case 2:
				var npcsInTargetPosition = state.npcs.filter(n => n.posY == npc.posY - 1).length > 0 ? true : false;
				var playerInTargetPosition = state.player.y == npc.posY - 1;
				if (npc.posY > 0) npc.posY--;
				break;
			case 3:
				var npcsInTargetPosition = state.npcs.filter(n => n.posY == npc.posY + 1).length > 0 ? true : false;
				var playerInTargetPosition = state.player.y == npc.posY + 1;
				if (npc.posY < state.width) npc.posY++;
				break;
		}
	}
}
