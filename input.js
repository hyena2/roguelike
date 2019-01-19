document.onkeyup = function(key){
    if(state.mode == "inventory"){
        inventoryInput(key);
    }else{
        gameInput(key);
    }
}

