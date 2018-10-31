function loadGame(url,gameName,callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(xhttp.response);
        }
    };
    xhttp.open("GET", url +"/" + gameName, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function updateGame(url,gameName,game){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    }
    xhttp.open("PUT", url +"/" + gameName, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(game));
}