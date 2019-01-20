var state = {
    mapWidth: 80,
    mapHeight: 20,
    map : { mapName : "", map : null},
    previousEditorPos : [0,0],
    currentEditorPos : [0,0],
    game : {
        gameName : "",
        maps : [],
        tiles : [],
        npcs : [],
        objects : [],
        title : "", 
        intialPlayerX : 0,
        initialPlayerY : 0,
        winningCondition : [],
    },
    subscribers: [],
    gameMaps: null,
    drawMap : function(){
        for (var i = 0; i < this.map['map'].length; i++) {
            for (var j = 0; j < this.map['map'][i].length; j++) {
                foreground = ROT.Color.toRGB([255, 255, 255]);
                background = ROT.Color.toRGB([0, 0, 0]);
                colors = "%c{" + foreground + "}%b{" + background + "}";
                display.drawText(i, j, colors + state.map['map'][i][j]);
            }
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
}


