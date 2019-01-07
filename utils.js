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
    xhttp.setRequestHeader("Authorization", getCookie("token"));
    xhttp.send(JSON.stringify(game));
}

function login(url, name, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        console.log(xhttp.response);
        document.cookie = "token=" + xhttp.response;
    }
    xhttp.open("POST", url + "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("Authorization", document.cookie);
    xhttp.send(JSON.stringify({ name: name, password: password }));
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

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
