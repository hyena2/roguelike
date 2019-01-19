window.onload = function () {
	document.getElementById("map-holder").appendChild(container);
	state.subscribe(mapUpdater);
	state.subscribe(editorPosHandler);
	state.subscribe(gameMapsUpdate);
	state.drawMap();
	state.subscribe(tilesUpdater);
	state.subscribe(npcsUpdater);
	state.subscribe(objectsUpdater);
}
