var state = {
	npcs : [],
	game : {},
	set: function (props, values) {
		for (var i = 0; i < props.length; i++) {
			if (!typeof values[i] === 'object') { //If the value is an object, copy by value
				this[props[i]] = values[i];
			} else {
				this[props[i]] = JSON.parse(JSON.stringify(values[i])); //Copy by value, this makes a copy of an object not a reference
			}
		}
		this.notify();
	},
	//Observer pattern, this is the observer, for every change in the state, it will call the callback of subcribers
	notify : function(){
		for(var i = 0; i < this.subscribers.length;i++){
			this.subscribers[i].callback(this);
		}
	},
	subscribe : function(subscriber){
		this.subscribers.push(subscriber);
	},
	subscribers : [],
}

var npcsUpdater = {
	callback : function(state){
		npcsNode = document.getElementById("npcs");
		while (npcsNode.hasChildNodes()) { //Reset node
			npcsNode.removeChild(npcsNode.lastChild);
		}
		state.npcs.map(npc => {
			newNpcNode = '<p>Character: ' + npc.character + '<p>' +
				'<p>Description: ' + npc.description + '<p>' + 
				'<p>Attack: ' + npc.attack + '<p>' +
				'<p>Defense: ' + npc.defense + '<p>'+
				'<p>Hp: ' + npc.hp + '<p>'+
				'<button class="remove-button" npc="'+ npc.character + '" onclick="removeNpc(this)">Remove</button>';
			npcsNode.insertAdjacentHTML('beforeend',newNpcNode); //Inserts string as html code})
		});
	}
}

window.onload = function () {
	state.subscribe(npcsUpdater);
	loadGame('http://localhost:1234/getGame',"test",(response) => {
			state.set(['game'],[JSON.parse(response)[0]]);
			delete state.game._id;
			state.set(['npcs'],[state.game.npcs]);
			});
}

//Event
var saveButton = document.getElementById("save");
saveButton.onclick = function () {
	var character = document.getElementById("character").value;
	var description = document.getElementById("description").value;
	var attack = document.getElementById("attack").value;
	var defense = document.getElementById("defense").value;
	var hp = document.getElementById("hp").value;
	var newNpc = {character : character, description : description, attack : attack, defense : defense, hp : hp};
	var updatedNpcs = state.npcs;

	//In case the tile was already defined, filter it in order to update it.
	updatedNpcs = updatedNpcs.filter(npc => npc.character != newNpc.character);

	updatedNpcs.push(newNpc);
	state.set(['npcs'],[updatedNpcs]);
	var updatedGame = state.game;
	updatedGame.npcs = state.npcs;
	state.set(['game'],[updatedGame]);
	updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
}

function removeNpc(element){
	var npcCharacter = element.getAttribute("npc");
	var updatedNpcs = state.npcs;
	updatedNpcs = updatedNpcs.filter(npc => npc.character != npcCharacter);
	state.set(['npcs'],[updatedNpcs]);
	var updatedGame = state.game;
	updatedGame.npcs = state.npcs;
	state.set(['game'],[updatedGame]);
	updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
}
