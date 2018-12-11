window.onload = function () {
    document.getElementById("login-button").onclick = function(){
        console.log("aaa");
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;
       login("http://localhost:1234",name,password) ;
    }
}