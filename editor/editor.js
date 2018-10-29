var state = {
	mapWidth: 80,
	map : [],
	previousEditorPos : [0,0],
	currentEditorPos : [0,0],
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
	state.map.push(".");
}

//Subscriber
var mapUpdater = {
	callback: function(state){
		background = ROT.Color.toRGB([255, 255, 255]);
		foreground = ROT.Color.toRGB([0, 0, 0]);
		colors = "%c{" + foreground + "}%b{" + background + "}";
		display.drawText(state.currentEditorPos[0], state.currentEditorPos[1], 
			colors + state.map[(state.currentEditorPos[0] * state.mapWidth) + state.currentEditorPos[1]]);
	}
}

//Subscriber
var editorPosHandler = {
	callback: function (state) {
		changeTileToBlackBackground(state.previousEditorPos);
		changeTileToWhiteBackground(state.currentEditorPos);
	}
}

window.onload = function () {
	document.body.appendChild(container);
	state.subscribe(mapUpdater);
	state.subscribe(editorPosHandler);
	drawMap(20, 80, state.map);
}


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
		console.log(e.key)
		if(e.key != "Shift" && e.key != "AltGraph" && e.key != "Dead" && e.key != "Control"){
			var updatedMap = state.map;
			updatedMap[(state.currentEditorPos[0] * state.mapWidth) + state.currentEditorPos[1]] = e.key;
			state.set(['map'], [updatedMap]);
		}
	}
}

function mouseIsOverMap(mousePos) {
	if (mousePos[0] != -1 && mousePos[1] != -1) {
		return true;
	} else {
		return false;
	}
}

function changeTileToWhiteBackground(tile) {
	background = ROT.Color.toRGB([255, 255, 255]);
	foreground = ROT.Color.toRGB([0, 0, 0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(tile[0], tile[1], colors + state.map[(tile[0] * state.mapWidth) + tile[1]]);
}

function changeTileToBlackBackground(tile) {
	foreground = ROT.Color.toRGB([255, 255, 255]);
	background = ROT.Color.toRGB([0, 0, 0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(tile[0], tile[1], colors + state.map[(tile[0] * state.mapWidth) + tile[1]]);
}
