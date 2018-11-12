var state = {
	game: {},
	map: null,
	mapInfo: [],
	width: 80,
	height: 20,
	tiles: [],
	player: {
		character: "@",
		at: 5,
		df: 3,
		hp: 5,
		x: 2,
		y: 2,
		alive: true,
		inventory: [],
		choosenCommand: null,
	},
	playerController: {
		display: function () {
			displayEntity(state.player);
		},
		attack: function (targetTile) {
			attack(this, targetTile.npc);
			this.choosenCommand = null;
			text = "You attacked!";
		},
		take: function (targetTile) {
			if (targetTile.object != null) {
				take(this, targetTile.object);
				this.choosenCommand = null;
			}
		},
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

//Event
window.onload = function () {
	loadGame('http://localhost:1234/getGame', "test", (response) => {
		state.set(['game'], [JSON.parse(response)[0]]) //Even we only want one element the back returns an array, 
		state.set(['map'], [state.game.maps[0]]);
		//Fill map info
		tempMapInfo = [];
		for (var i = 0; i < state.map.length; i++) {
			tempMapInfo[i] = {
				tile: state.map[i],
				npc: null,
				object: null,
			}
		}
		state.set(['mapInfo'], [tempMapInfo]);
		state.game.tiles.map(tile => {
			state.tiles[tile.character] = { solid: tile.solid, description: tile.description };
		})
		drawMap(80, 20, state.map.map);
		state.playerController.display();
	});
	document.body.appendChild(container);
}

var playerRenderer = {
	callback: function () {
		if(state.map != null){ //Check because of the first call
			drawMap(80,20,state.map.map);
		}
		state.playerController.display();
	}
}
state.subscribe(playerRenderer);

