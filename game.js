var width = 5;
var height = 5;
var text = "";

map_ = [1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,1,1,1,1];
map_Info = [];

//Fill map info
for(var i = 0; i < map_.length; i++){
	map_Info[i] = {
		tile : map_[i],
		npc : null,
	}
}

var npcs = [];
npcs[0] = Object.create(leecher);
npcs[1] = Object.create(leecher);

window.onload = function() {
	document.body.appendChild(container);
	drawMap(5,5,map_);
	player.display();
	leecher.display();
	drawText(text);
}

