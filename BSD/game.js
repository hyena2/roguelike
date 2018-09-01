
var map = [];

for(var i = 0; i < 80; i++){
	map[i] = [];
	for(var j = 0; j < 40; j++){
		map[i].push("");
	}
}

window.onload = function() {
	document.body.appendChild(container);
	divideSpace(0,0,80,40,4,7);
	drawMap(80,40,map);
}

