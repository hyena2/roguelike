var state = {
    tiles : [],
    set : function(props,values){
		for(var i = 0; i < props.length; i++){
			this[props[i]] = values[i];
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
        while (tilesNode.hasChildNodes()) {
            tilesNode.removeChild(tilesNode.lastChild);
        }
        state.tiles.map(tile => {
            newTileNode = "<p>Character: " + tile.character + "<p>" +
            "<p>Description: " + tile.description + "<p>" + 
            "<p>Damage: " + tile.damage + "<p>" +
            "<p>Solid: " + tile.solid + "<p>";
            tilesNode.insertAdjacentHTML('beforeend',newTileNode); //Inserts string as html code
        })
    }
}

window.onload = function () {
    state.subscribe(tilesUpdater);
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
    updatedTiles.push(newTile);
    state.set(['tiles'],[updatedTiles]);
    post("http://localhost:1234/insertTiles", state.tiles[0]);
}