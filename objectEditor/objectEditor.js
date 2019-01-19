var objectsUpdater = {
	callback : function(state){
		objectsNode = document.getElementById("objects");
		while (objectsNode.hasChildNodes()) { //Reset node
			objectsNode.removeChild(objectsNode.lastChild);
		}
		state.game.objects.map(object => {
			newObjectNode = '<div class="object">'+
				'<p>Character: ' + object.character + '<p>' +
				'<p>Description: ' + object.description + '<p>' + 
				'<button class="remove-button" object="'+ object.character + '" onclick="removeObject(this)">Remove</button>' +
				'</div>';
			objectsNode.insertAdjacentHTML('beforeend',newObjectNode); //Inserts string as html code
		})
	}
}
//Event
var saveButton = document.getElementById("object-save");
saveButton.onclick = function () {
	console.log("adasd");
	var character = document.getElementById("object-character").value;
	var description = document.getElementById("object-description").value;
	var newObject = {character : character, description : description};
	var updatedObjects = state.game.objects;

	//In case the tile was already defined, filter it in order to update it.
	updatedObjects = updatedObjects.filter(object => object.character != object.character);

	updatedObjects.push(newObject);
	var updatedGame = state.game;
	updatedGame.objects = updatedObjects;
	state.set(['game'],[updatedGame]);
}

function removeObject(element){
	var objectCharacter = element.getAttribute("object");
	var updatedObjects = state.game.objects;
	updatedObjects = updatedObjects.filter(object => object.character != objectCharacter);
	var updatedGame = state.game;
	updatedGame.objects = updatedObjects;
	state.set(['game'],[updatedGame]);
}
