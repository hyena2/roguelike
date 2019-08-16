var tilesUpdater = {
	callback : function(state){
		tilesNode = document.getElementById("tiles");
		while (tilesNode.hasChildNodes()) { //Reset node
			tilesNode.removeChild(tilesNode.lastChild);
		}
		state.game.tiles.map(tile => {
			newTileNode = '<div class="tile">'+
				'<p>Character: ' + tile.character + '<p>' +
				'<p>Description: ' + tile.description + '<p>' + 
				'<p>Damage: ' + tile.damage + '<p>' +
				'<p>Solid: ' + tile.solid + '<p>'+
				'<button class="remove-button" tile="'+ tile.character + '" onclick="removeTile(this)">Remove</button>' +
				'</div>';
			tilesNode.insertAdjacentHTML('beforeend',newTileNode); //Inserts string as html code
		})
	}
}
//Event
var saveButton = document.getElementById("tile-save");
saveButton.onclick = function () {
	var character = document.getElementById("tile-character").value;
	var description = document.getElementById("description").value;
	var damage = document.getElementById("damage").checked;
	var solid = document.getElementById("solid").checked;
	var newTile = {character : character, description : description, damage : damage, solid : solid};
	var updatedTiles = state.game.tiles;

	//In case the tile was already defined, filter it in order to update it.
	updatedTiles = updatedTiles.filter(tile => tile.character != newTile.character);

	updatedTiles.push(newTile);
	var updatedGame = state.game;
	updatedGame.tiles = updatedTiles;
	state.set(['game'],[updatedGame]);
}

function removeTile(element){
	var tileCharacter = element.getAttribute("tile");
	var updatedTiles = state.game.tiles;
	updatedTiles = updatedTiles.filter(tile => tile.character != tileCharacter);
	var updatedGame = state.game;
	updatedGame.tiles = updatedTiles;
	state.set(['game'],[updatedGame]);
}
