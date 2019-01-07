state.map.map = [];
for (var i = 0; i < state.mapWidth; i++) {
	state.map.map[i] = [];
	for (var j = 0; j < state.mapHeight; j++) {
		state.map.map[i][j] = ".";
	}
}

//Subscriber
var mapUpdater = {
	callback: function (state) {
		background = ROT.Color.toRGB([255, 255, 255]);
		foreground = ROT.Color.toRGB([0, 0, 0]);
		colors = "%c{" + foreground + "}%b{" + background + "}";
		display.drawText(state.currentEditorPos[0], state.currentEditorPos[1],
			colors + state.map['map'][state.currentEditorPos[0]][state.currentEditorPos[1]]);
	}
}

//Subscriber
var editorPosHandler = {
	callback: function (state) {
		changeTileToBlackBackground(state.previousEditorPos);
		changeTileToWhiteBackground(state.currentEditorPos);
	}
}

//Subscriber
var gameMapsUpdate = {
	callback: function (state) {
		var mapsNode = document.getElementById("maps");
		while (mapsNode.hasChildNodes()) { //Reset node
			mapsNode.removeChild(mapsNode.lastChild);
		}
		state.game.maps.map(map => {
			newMapNode = '<p class="maps" map-name="' + map.mapName + '">' + map.mapName + '<p>';
			mapsNode.insertAdjacentHTML('beforeend', newMapNode); //Inserts string as html code
		})
		var maps = document.getElementsByClassName("maps");
		for (var i = 0; i < maps.length; i++) {
			maps[i].onclick = function () {
				var mapName = this.getAttribute("map-name");
				state.set(['map'], [state.game.maps.filter(map => map.mapName == mapName)[0]]);
				state.drawMap();
			}
		}
	}
}


//Event
window.onkeydown = function (e) {
	if (e.key == "ArrowDown") {
		e.preventDefault();
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0], state.currentEditorPos[1] + 1]]);
	}
	else if (e.key == "ArrowUp") {
		e.preventDefault();
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0], state.currentEditorPos[1] - 1]]);
	}
	else if (e.key == "ArrowRight") {
		e.preventDefault();
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0] + 1, state.currentEditorPos[1]]]);
	}
	else if (e.key == "ArrowLeft") {
		e.preventDefault();
		state.set(['previousEditorPos'], [state.currentEditorPos]);
		state.set(['currentEditorPos'], [[state.currentEditorPos[0] - 1, state.currentEditorPos[1]]]);
	}
	else {
		if (e.key != "Shift" && e.key != "AltGraph" && e.key != "Dead" && e.key != "Control") {
			var updatedMap = state.map;
			updatedMap['map'][state.currentEditorPos[0]][state.currentEditorPos[1]] = e.key;
			state.set(['map'], [updatedMap]);
		}
	}
}

//Event
var saveMap = document.getElementById("map-save");
saveMap.onclick = function () {
	//Set the map name
	var mapName = document.getElementById("mapName").value;
	var updatedGame = state.game;
	var map = state.map;
	map.mapName = mapName;
	state.set(['map'], [map]);

	var mapUpdated = false;
	for (var i = 0; i < updatedGame.maps.length; i++) {
		if (updatedGame.maps[i].mapName == mapName) {
			updatedGame.maps[i] = state.map;
			mapUpdated = true;
			break;
		}
	}
	if (!mapUpdated) { //There is no map with that name so push it
		updatedGame.maps.push(state.map);
	}

	state.set(['game'], [updatedGame]);
}


function changeTileToWhiteBackground(tile) {
	background = ROT.Color.toRGB([255, 255, 255]);
	foreground = ROT.Color.toRGB([0, 0, 0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(tile[0], tile[1], colors + state.map['map'][tile[0]][tile[1]]);
}

function changeTileToBlackBackground(tile) {
	foreground = ROT.Color.toRGB([255, 255, 255]);
	background = ROT.Color.toRGB([0, 0, 0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(tile[0], tile[1], colors + state.map['map'][tile[0]][tile[1]]);
}
