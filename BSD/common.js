
var display = new ROT.Display({width:80, height:40});
var container = display.getContainer();


function drawMap(width,height,map){
	for(var i = 0; i < width; i++){
		for(var j = 0; j < height; j++){
			foreground = ROT.Color.toRGB([255,255,255]);
			background = ROT.Color.toRGB([0,0,0]);
			colors = "%c{" + foreground + "}%b{" + background + "}";
			display.drawText(i,j,colors + map[i][j]);
		}
	}
}

function divideSpace(topLeftCornerX,topLeftCornerY,width,height,minimun,counter){

	var division;
	var randomX;
	var randomY;
	
	if(counter > 0){

		console.log("dividing space " + counter);

		if(Math.random() > 0.5){
			division = "horizontal";
		}else{
			division = "vertical";
		}

		if(division == "horizontal"){
			randomY = Math.floor(Math.random() * (height - minimun * 2) + minimun); 
			//For developing porpuoses,remove when done
			for(var i = 0; i < width; i++){
				map[topLeftCornerX + i][topLeftCornerY + randomY] = counter;
			}
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
		}
		if(division == "vertical"){
			randomX = Math.floor(Math.random() * (width - minimun * 2) + minimun); 
			//For developing porpuoses,remove when done
			for(var i = 0; i < height; i++){
				map[topLeftCornerX + randomX][topLeftCornerY + i] = counter;
			}
			if(randomX > minimun * 2){
				divideSpace(topLeftCornerX,topLeftCornerY,randomX,height,minimun,counter - 1);
			}else{
				generateRoom(topLeftCornerX,topLeftCornerY,randomX,height,minimun);
			}
			if(width - randomX > minimun * 2){ 
				divideSpace(topLeftCornerX + randomX,topLeftCornerY,width - randomX,height,minimun,counter - 1);
			}else{
				generateRoom(topLeftCornerX + randomX,topLeftCornerY,width - randomX,height,minimun);
			}
		}
	}

	//If this is the last iteration, we must do a room
	if(counter == 0){
		generateRoom(topLeftCornerX,topLeftCornerY,width,height,minimun)
	}
}

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
			map[topLeftCornerX + room.x + i][topLeftCornerY + room.y + j] = "#";
		}
	}
}
