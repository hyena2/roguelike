var state = {
	game: {},
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

map_ = [];
//This reflects the changes in the map
map_Info = [];

width = 80;
height = 20;

//Event
window.onload = function(){
	loadGame('http://localhost:1234/getGame', "test", (response) => {
		state.set(['game'], [JSON.parse(response)[0]]) //Even we only want one element the back returns an array, 
		//Fill map info
		for (var i = 0; i < map_.length; i++) {
			map_Info[i] = {
				tile: map_[i],
				npc: null,
				object: null,
			}
		}
		tiles = [];
		state.game.tiles.map(function (tile) {
			tiles[tile.character] = { solid : tile.solid, description : tile.description };
		})
		map_ = state.game.maps[0].map;
		drawMap(80, 20, map_);
		player.display();
	});
	document.body.appendChild(container);
}
