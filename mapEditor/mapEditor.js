var state = {
	mapWidth: 80,
	map : { mapName : "", map : []},
	previousEditorPos : [0,0],
	currentEditorPos : [0,0],
	game : null,
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

for (var i = 0; i < 4000; i++) {
	state.map['map'].push(".");
}

//Subscriber
var mapUpdater = {
	callback: function(state){
		background = ROT.Color.toRGB([255, 255, 255]);
		foreground = ROT.Color.toRGB([0, 0, 0]);
		colors = "%c{" + foreground + "}%b{" + background + "}";
		display.drawText(state.currentEditorPos[0], state.currentEditorPos[1], 
			colors + state.map['map'][(state.currentEditorPos[0] * state.mapWidth) + state.currentEditorPos[1]]);
	}
}

//Subscriber
var editorPosHandler = {
	callback: function (state) {
		changeTileToBlackBackground(state.previousEditorPos);
		changeTileToWhiteBackground(state.currentEditorPos);
	}
}

//Event
window.onload = function () {
	document.body.appendChild(container);
	state.subscribe(mapUpdater);
	state.subscribe(editorPosHandler);
	loadGame('http://localhost:1234/getGame',"test",(response) => {
		state.set(['game'],[JSON.parse(response)[0]]) //Even we only want one element the back returns an array, 
													  //take only the first element.
	});
	drawMap(20, 80, state.map['map']);
}

//Event
window.onkeyup = function (e) {
	if (e.key == "ArrowDown") {
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0], state.currentEditorPos[1] + 1]]);
	}
else if (e.key == "ArrowUp") {
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0], state.currentEditorPos[1] - 1]]);
	}
	else if (e.key == "ArrowRight") {
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0] + 1, state.currentEditorPos[1]]]);
	}
	else if (e.key == "ArrowLeft") {
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0] - 1, state.currentEditorPos[1]]]);
	}
	else {
		if(e.key != "Shift" && e.key != "AltGraph" && e.key != "Dead" && e.key != "Control"){
			var updatedMap = state.map;
			updatedMap['map'][(state.currentEditorPos[0] * state.mapWidth) + state.currentEditorPos[1]] = e.key;
			state.set(['map'], [updatedMap]);
		}
	}
}

//Event
var saveMap = document.getElementById("saveMap");
saveMap.onclick = function(){
	//Set the map name
	var mapName = document.getElementById("mapName").value;
	var updatedGame = state.game;
	var map = state.map;
	map.mapName = mapName;
	state.set(['map'],[map]);
	//Look for a map in the game with the same name and update it, else push it
	var mapToUpdate = updatedGame.maps.filter(map => {
		map.mapName == state.map.mapName;
	});
	if(mapToUpdate.length == 1){
		mapToUpdate = state.map;
	}else{
		updatedGame.maps.push(state.map);
	}
	state.set(['game'],[updatedGame]); //FIX, updatedGame and state.game are THE SAME object, so this step
									  // is not needed, but thats wrong! change it.
	updateGame('http://localhost:1234/updateGame',state.game.gameName,updatedGame);
}

function changeTileToWhiteBackground(tile) {
	background = ROT.Color.toRGB([255, 255, 255]);
	foreground = ROT.Color.toRGB([0, 0, 0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(tile[0], tile[1], colors + state.map['map'][(tile[0] * state.mapWidth) + tile[1]]);
}

function changeTileToBlackBackground(tile) {
	foreground = ROT.Color.toRGB([255, 255, 255]);
	background = ROT.Color.toRGB([0, 0, 0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(tile[0], tile[1], colors + state.map['map'][(tile[0] * state.mapWidth) + tile[1]]);
}