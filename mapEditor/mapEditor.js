var state = {
	mapWidth: 80,
	map : { mapName : "", map : []},
	previousEditorPos : [0,0],
	currentEditorPos : [0,0],
	game : {},
	gameMaps: null,
	drawMap : function(){
		for(var i = 0; i < this.map['map'].length; i++ ){
			foreground = ROT.Color.toRGB([255, 255, 255]);
			background = ROT.Color.toRGB([0, 0, 0]);
			colors = "%c{" + foreground + "}%b{" + background + "}";
			display.drawText(Math.round(i/80),i%80, colors + state.map['map'][i]);
		}
	},
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
	notify: function () {
		for (var i = 0; i < this.subscribers.length; i++) {
			this.subscribers[i].callback(this);
		}
	},
	subscribe: function (subscriber) {
		this.subscribers.push(subscriber);
	},
	subscribers: [],
}

for (var i = 0; i < 4000; i++) {
	state.map['map'].push(".");
}

//Subscriber
var mapUpdater = {
	callback: function (state) {
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
window.onload = function () {

	document.body.appendChild(container);
	state.subscribe(mapUpdater);
	state.subscribe(editorPosHandler);
	state.subscribe(gameMapsUpdate);

	loadGame('http://localhost:1234/getGame', "test", (response) => {
		state.set(['game'], [JSON.parse(response)[0]]) //Even we only want one element the back returns an array, 
		delete state.game._id; //Delete the _id property so mongodb can update the object without problems
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
		if (e.key != "Shift" && e.key != "AltGraph" && e.key != "Dead" && e.key != "Control") {
			var updatedMap = state.map;
			updatedMap['map'][(state.currentEditorPos[0] * state.mapWidth) + state.currentEditorPos[1]] = e.key;
			state.set(['map'], [updatedMap]);
		}
	}
}

//Event
var saveMap = document.getElementById("saveMap");
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

	state.set(['game'], [updatedGame]); //FIX, updatedGame and state.game are THE SAME object, so this step
	// is not needed, but thats wrong! change it.
	updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
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