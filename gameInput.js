function gameInput(key){
    
    text = ""; //Reset text at the begining of the turn

    if(key.key == "ArrowRight"){
        if(state.player.choosenCommand != null){
            var target = getTarget(state.player.x + 1, state.player.y);
            state.player.choosenCommand(state.map.map[state.player.x + 1][state.player.y],target);
            //updateMap();
        }else{
            if(state.player.x == state.width -1){
                var mapX = state.map.x;
                var nextMap = state.game.maps.filter(m => m.x == Number(mapX) + 1);
                if(nextMap[0] != undefined){
                    var updatedPlayer = state.player;
                    updatedPlayer.x = 0;
                    state.set(['map'],[nextMap[0]]);
                    state.drawMap();
                    state.set(['player'],[updatedPlayer],true);
                }
            }else{
                var npcsInTargetPosition = state.mapNpcs.filter(n => n.posX == state.player.x + 1 && n.posY == state.player.y).length > 0 ? true : false;
                if(state.tiles[state.map.map[state.player.x + 1][state.player.y]].solid == false && !npcsInTargetPosition){
                    updatedPlayer = state.player;
                    updatedPlayer.x++;
                    state.set(['player'],[updatedPlayer],true);
                }
            }
        }
    }

    if(key.key == "ArrowLeft"){
        if(state.player.choosenCommand != null){
            var target = getTarget(state.player.x - 1, state.player.y);
            state.player.choosenCommand(state.map.map[state.player.x - 1][state.player.y],target);
            //updateMap();
        }else{
            if(state.player.x == 0){
                var mapX = state.map.x;
                var nextMap = state.game.maps.filter(m => m.x == Number(mapX) - 1);
                if(nextMap[0] != undefined){
                    var updatedPlayer = state.player;
                    updatedPlayer.x = state.width - 1;
                    state.set(['map'],[nextMap[0]]);
                    state.drawMap();
                    state.set(['player'],[updatedPlayer],true);
                }
            }else{
                var npcsInTargetPosition = state.mapNpcs.filter(n => n.posX == state.player.x - 1 && n.posY == state.player.y).length > 0 ? true : false;
                if(state.tiles[state.map.map[state.player.x - 1][state.player.y]].solid == false && !npcsInTargetPosition){
                    updatedPlayer = state.player;
                    updatedPlayer.x--;
                    state.set(['player'],[updatedPlayer],true);
                }
            }
        }
    }

    if(key.key == "ArrowDown"){
        if(state.player.choosenCommand != null){
            var target = getTarget(state.player.x, state.player.y + 1);
            state.player.choosenCommand(state.map.map[state.player.x][state.player.y + 1],target);
            //updateMap();
        }else{
            if(state.player.y == state.height - 1){
                var mapY = state.map.y;
                var nextMap = state.game.maps.filter(m => m.y == Number(mapY) + 1);
                if(nextMap[0] != undefined){
                    var updatedPlayer = state.player;
                    updatedPlayer.y = 0;
                    state.set(['map'],[nextMap[0]]);
                    state.drawMap();
                    state.set(['player'],[updatedPlayer],true);
                }
            }else{
                var npcsInTargetPosition = state.mapNpcs.filter(n => n.posY == state.player.y + 1 && n.posX == state.player.x).length > 0 ? true : false;
                if(state.tiles[state.map.map[state.player.x][state.player.y + 1]].solid == false && !npcsInTargetPosition){
                    updatedPlayer = state.player;
                    updatedPlayer.y++;
                    state.set(['player'],[updatedPlayer],true);
                }
            }
        }
    }

    if(key.key == "ArrowUp"){
        if(state.player.choosenCommand != null){
            var target = getTarget(state.player.x, state.player.y - 1);
            state.player.choosenCommand(state.map.map[state.player.x][state.player.y - 1],target);
            //updateMap();
        }else{
            if(state.player.y == 0){
                var mapY = state.map.y;
                var nextMap = state.game.maps.filter(m => m.y == Number(mapY) - 1);
                if(nextMap[0] != undefined){
                    var updatedPlayer = state.player;
                    updatedPlayer.y = state.height - 1;
                    state.set(['map'],[nextMap[0]]);
                    state.drawMap();
                    state.set(['player'],[updatedPlayer],true);
                }
            }else{
                var npcsInTargetPosition = state.mapNpcs.filter(n => n.posY == state.player.y - 1 && n.posX == state.player.x).length > 0 ? true : false;
                if(state.tiles[state.map.map[state.player.x][state.player.y - 1]].solid == false && !npcsInTargetPosition){
                    updatedPlayer = state.player;
                    updatedPlayer.y--;
                    state.set(['player'],[updatedPlayer],true);
                }
            }
        }
    }


    if(key.key == "a"){
        state.player.choosenCommand = state.playerController.attack;
        text += "In wich direction do you want to attack?";
    }

    if(key.key == "t"){
        state.player.choosenCommand = state.playerController.take;
        text += "What do you want to take?";
    }

    if(key.key == "l"){
        state.player.choosenCommand = state.playerController.look;
        text += "In which direction are you looking?";
    }

    if(key.key == "i"){
        state.showInventory();
        //state.set(["mode"],["inventory"]);
    }

    drawText(text); //Display resulting text
}

function getTarget(x,y){
    var npc = state.mapNpcs.filter(n => n.posX == x && n.posY == y);
    if(npc.length == 1) return npc[0];
    var object = state.mapObjects.filter(o => o.posX == x && o.posY == y);
    if(object.length == 1) return object[0];
    return null;
}
