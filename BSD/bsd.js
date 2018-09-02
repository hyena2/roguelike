//How to use this functions, call divideSpace with he root space that is the map, then join the spaces left like this:
/*
	divideSpace(0,0,80,40,4,7);
	for (var i = 0; i < spaces.length; i++){
		joinSpaces(spaces[i]);
	}
*/
//That will generate a random map

spaces = [];
var pairsId = 0;

//Given a space, divide from a random point and divide the saces generated
function divideSpace(topLeftCornerX,topLeftCornerY,width,height,minimun,counter){

	var division;
	var randomX;
	var randomY;
	
	if(counter > 0){
		if(Math.random() > 0.5){
			division = "horizontal";
		}else{
			division = "vertical";
		}

		if(division == "horizontal"){
			randomY = Math.floor(Math.random() * (height - minimun * 2) + minimun); 
			/*
			//For developing porpuoses,remove when done
			for(var i = 0; i < width; i++){
				map[topLeftCornerX + i][topLeftCornerY + randomY] = counter;
			}
			*/
			//Check if the new space can be divided again
			if(randomY > minimun * 2){ 
				divideSpace(topLeftCornerX,topLeftCornerY,width,randomY,minimun,counter - 1);
			}else{
				//If subdivision isnt possible we already must make a room
				generateRoom(topLeftCornerX,topLeftCornerY,width,randomY,minimun); 
			}
			if(height - randomY > minimun * 2){
				divideSpace(topLeftCornerX,topLeftCornerY + randomY,width,height - randomY,minimun,counter - 1);
			}else{
				generateRoom(topLeftCornerX,topLeftCornerY + randomY,width,height - randomY,minimun);
			}

			storeSpacePairs(division,topLeftCornerX,topLeftCornerY,width,height,randomY)

		}

		if(division == "vertical"){
			randomX = Math.floor(Math.random() * (width - minimun * 2) + minimun); 
			/*
			//For developing porpuoses,remove when done
			for(var i = 0; i < height; i++){
				//map[topLeftCornerX + randomX][topLeftCornerY + i] = counter;
			}
			*/
			if(randomX > minimun * 2){
				divideSpace(topLeftCornerX,topLeftCornerY,randomX,height,minimun,counter - 1);
			}else{
				generateRoom(topLeftCornerX,topLeftCornerY,randomX,height,minimun); //No more space for dividing? Make a room
			}
			if(width - randomX > minimun * 2){ 
				divideSpace(topLeftCornerX + randomX,topLeftCornerY,width - randomX,height,minimun,counter - 1);
			}else{
				generateRoom(topLeftCornerX + randomX,topLeftCornerY,width - randomX,height,minimun);
			}

			storeSpacePairs(division,topLeftCornerX,topLeftCornerY,width,height,randomX)
		}

	}

	//If this is the last iteration, we must do a room
	if(counter == 0){
		generateRoom(topLeftCornerX,topLeftCornerY,width,height,minimun)
	}
}

//Given a space, generate a room with minimun width and height
function generateRoom(topLeftCornerX,topLeftCornerY,width,height,minimun){

	var room = {width: null, height: null, x : null, y: null};
	room.width = Math.floor(Math.random() * (width - minimun)) + minimun;
	room.height = Math.floor(Math.random() * (height - minimun)) + minimun;

	room.x = Math.floor(Math.random() * width);
	while(room.x + room.width > width){
		room.x = Math.floor(Math.random() * width);
	}
	room.y = Math.floor(Math.random() * height);
	while(room.y + room.height > height){
		room.y = Math.floor(Math.random() * height);
	}

	for(var i = 0; i < room.width; i++){
		for (var j = 0; j < room.height; j++){
			map[topLeftCornerX + room.x + i][topLeftCornerY + room.y + j] = ".";
		}
	}
}

//This function store the spaces left in every division in order to join them later
function storeSpacePairs(division,topLeftCornerX,topLeftCornerY,width,height,randomDivisonPoint){

	spaces[pairsId] = [];

	if(division == "horizontal"){
		spaces[pairsId].push({topLeftCornerX:topLeftCornerX,topLeftCornerY:topLeftCornerY,width:width,height:randomDivisonPoint});
		spaces[pairsId].push({topLeftCornerX:topLeftCornerX,topLeftCornerY:topLeftCornerY + randomDivisonPoint,width:width,height:height - randomDivisonPoint});
	}
	else if (division == "vertical"){
		spaces[pairsId].push({topLeftCornerX:topLeftCornerX,topLeftCornerY:topLeftCornerY,width:randomDivisonPoint,height:height});
		spaces[pairsId].push({topLeftCornerX:topLeftCornerX + randomDivisonPoint,topLeftCornerY:topLeftCornerY,width: width - randomDivisonPoint,height:height});
	}

	pairsId++; //Increment id for the next one
}

//This is the function in charge of joining spaces Spaces is an array with length 2 that contains botth spaces to be join, finds a solid tile
//in every space and make a corridor between them
function joinSpaces(spaces){

	var x1 = Math.floor((Math.random() * spaces[0].width) + spaces[0].topLeftCornerX);
	var y1 = Math.floor((Math.random() * spaces[0].height) + spaces[0].topLeftCornerY);

	while(map[x1][y1] != "."){
		x1 = Math.floor((Math.random() * spaces[0].width) + spaces[0].topLeftCornerX);
		y1 = Math.floor((Math.random() * spaces[0].height) + spaces[0].topLeftCornerY);
	}

	var x2 = Math.floor((Math.random() * spaces[1].width) + spaces[1].topLeftCornerX);
	var y2 = Math.floor((Math.random() * spaces[1].height) + spaces[1].topLeftCornerY);

	while(map[x2][y2] != "."){
		x2 = Math.floor((Math.random() * spaces[1].width) + spaces[1].topLeftCornerX);
		y2 = Math.floor((Math.random() * spaces[1].height) + spaces[1].topLeftCornerY);
	}

	while(x1 != x2){
		if(x1 < x2){
			x1++;
		}else{
			x1--;
		}
		map[x1][y1] = ".";
	}

	while(y1 != y2){
		if(y1 < y2){
			y1++;
		}else{
			y1--;
		}
		map[x1][y1] = ".";
	}

}
