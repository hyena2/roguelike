var width = 5;
var height = 5;
var text = "";

//This is the initial state of the map
map_ = [1,1,1,1,1,
        1,0,0,0,1,
        1,0,0,0,1,
        1,0,0,0,1,
		1,1,1,1,1];
//This reflects the changes in the map
map_Info = [];

//Fill map info
for(var i = 0; i < map_.length; i++){
	map_Info[i] = {
		tile : map_[i],
		npc : null,
		object : null,
	}
}

var npcs = [];
npcs[0] = Object.create(leecher);
npcs[1] = Object.create(leecher);

var items = [];

for(var i = 0; i < 1; i++){
	var randomX = Math.floor(Math.random() * 5);
	var randomY = Math.floor(Math.random() * 5);
	var newItem = Object.create(potion);
	newItem.x = randomX;
	newItem.y = randomY;
	items.push(newItem);
	map_Info[newItem.y * 5 + newItem.x].object = newItem;
}

window.onload = function() {
	document.body.appendChild(container);
	drawMap(5,5,map_);
	player.display();
	leecher.display();
	drawText(text);
}

