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

//Calculates the most common element in array
function mode(numbers) {
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(i);
            }
        }
 
    return modes;
}
