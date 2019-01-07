var npcsUpdater = {
	callback : function(state){
		npcsNode = document.getElementById("npcs");
		while (npcsNode.hasChildNodes()) { //Reset node
			npcsNode.removeChild(npcsNode.lastChild);
		}
		state.game.npcs.map(npc => {
			newNpcNode = '<div class="npc"><p>Character: ' + npc.character + '<p>' +
				'<p>Description: ' + npc.description + '<p>' + 
				'<p>Attack: ' + npc.attack + '<p>' +
				'<p>Defense: ' + npc.defense + '<p>'+
				'<p>Hp: ' + npc.hp + '<p>'+
				'<button class="remove-button" npc="'+ npc.character + '" onclick="removeNpc(this)">Remove</button><div>';
			npcsNode.insertAdjacentHTML('beforeend',newNpcNode); //Inserts string as html code})
		});
	}
}

//Event
var saveButton = document.getElementById("npc-save");
saveButton.onclick = function () {
	var character = document.getElementById("npc-character").value;
	var description = document.getElementById("npc-description").value;
	var attack = document.getElementById("npc-attack").value;
	var defense = document.getElementById("npc-defense").value;
	var hp = document.getElementById("npc-hp").value;
	var newNpc = {character : character, description : description, attack : attack, defense : defense, hp : hp};
	var updatedNpcs = state.game.npcs;

	//In case the tile was already defined, filter it in order to update it.
	updatedNpcs = updatedNpcs.filter(npc => npc.character != newNpc.character);

	updatedNpcs.push(newNpc);
	var updatedGame = state.game;
	updatedGame.npcs = updatedNpcs;
	state.set(['game'],[updatedGame]);
}

function removeNpc(element){
	var npcCharacter = element.getAttribute("npc");
	var updatedNpcs = state.game.npcs;
	updatedNpcs = updatedNpcs.filter(npc => npc.character != npcCharacter);
	state.set(['npcs'],[updatedNpcs]);
	var updatedGame = state.game;
	updatedGame.npcs = state.npcs;
	state.set(['game'],[updatedGame]);
	updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
}
