document.getElementById("game-export").onclick = function(){
	var link = document.createElement('a');
	link.download = 'game.txt';
	var blob = new Blob([JSON.stringify(state.game)], {type: 'text/plain'});
	link.href = window.URL.createObjectURL(blob);
	link.click();
}

function openFile(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.onload = function(){
		//callback, called after file readed
		var text = reader.result;
		state.set(['game'],[JSON.parse(text)]);
	};
	reader.readAsText(input.files[0]);
};
