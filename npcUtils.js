npcUtils = {
	moveNpc: function (npc) {
		var dice = Math.round(Math.random() * 4);
		switch (dice) {
			case 0:
				if (npc.posX > 0) npc.posX--;
				break;
			case 1:
				if (npc.posX < state.height) npc.posX++;
				break;
			case 2:
				if (npc.posY > 0) npc.posY--;
				break;
			case 3:
				if (npc.posY < state.width) npc.posY++;
				break;
		}
	}
}
