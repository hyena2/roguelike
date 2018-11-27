var state = {
    tiles : [],
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

var tilesUpdater = {
    callback : function(state){
        tilesNode = document.getElementById("tiles");
        while (tilesNode.hasChildNodes()) { //Reset node
            tilesNode.removeChild(tilesNode.lastChild);
        }
        state.tiles.map(tile => {
            newTileNode = '<p>Character: ' + tile.character + '<p>' +
            '<p>Description: ' + tile.description + '<p>' + 
            '<p>Damage: ' + tile.damage + '<p>' +
            '<p>Solid: ' + tile.solid + '<p>'+
	    '<button class="remove-button" tile="'+ tile.character + '" onclick="removeTile(this)">Remove</button>';
            tilesNode.insertAdjacentHTML('beforeend',newTileNode); //Inserts string as html code
        })
    }
}

window.onload = function () {
    state.subscribe(tilesUpdater);
	loadGame('http://localhost:1234/getGame',"test",(response) => {
            state.set(['game'],[JSON.parse(response)[0]]);
            delete state.game._id;
            state.set(['tiles'],[state.game.tiles]);
    });
}

//Event
var saveButton = document.getElementById("save");
saveButton.onclick = function () {
    var character = document.getElementById("character").value;
    var description = document.getElementById("description").value;
    var damage = document.getElementById("damage").checked;
    var solid = document.getElementById("solid").checked;
    var newTile = {character : character, description : description, damage : damage, solid : solid};
    var updatedTiles = state.tiles;

    //In case the tile was already defined, filter it in order to update it.
    updatedTiles = updatedTiles.filter(tile => tile.character != newTile.character);

    updatedTiles.push(newTile);
    state.set(['tiles'],[updatedTiles]);
    var updatedGame = state.game;
    updatedGame.tiles = state.tiles;
    state.set(['game'],[updatedGame]);
    updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
}

function removeTile(element){
	var tileCharacter = element.getAttribute("tile");
	var updatedTiles = state.tiles;
	updatedTiles = updatedTiles.filter(tile => tile.character != tileCharacter);
	state.set(['tiles'],[updatedTiles]);
	var updatedGame = state.game;
	updatedGame.tiles = state.tiles;
	state.set(['game'],[updatedGame]);
	updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
}

