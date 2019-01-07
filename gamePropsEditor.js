var state = {
	winningCondition : "",
	game : {},
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

window.onload = function () {
    state.subscribe(tilesUpdater);
	loadGame('http://localhost:1234/getGame',"test",(response) => {
            state.set(['game'],[JSON.parse(response)[0]]);
            delete state.game._id;
    });
}


var saveButton = document.getElementById("save");
saveButton.onclick = function () {
	var winningCondition = document.getElementById("win-condition").value();
	state.set(['winningCondition'],[winningCondition]);
	updateGame('http://localhost:1234/updateGame', state.game.gameName, state.game);
}
