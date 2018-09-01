
var display = new ROT.Display({width:80, height:20});
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

	if(counter < 1){
		return //Finished
	}

	var division;
	
	if(Math.random() > 0.5){
		division = "horizontal";
	}else{
		division = "vertical";
	}

	if(division == "horizontal"){
		var randomY = Math.floor(Math.random() * (height - minimun * 2) + minimun); 
		for(var i = 0; i < width; i++){
			map[topLeftCornerX + i][topLeftCornerY + randomY] = counter;
		}
		if(randomY > minimun * 2){ //Check if the new space can be divided again
			divideSpace(topLeftCornerX,topLeftCornerY,width,randomY,minimun,counter - 1);
		}

		if(height - randomY > minimun * 2){
			divideSpace(topLeftCornerX,topLeftCornerY + randomY,width,height - randomY,minimun,counter - 1);
		}
	}
	if(division == "vertical"){
		var randomX = Math.floor(Math.random() * (width - minimun * 2) + minimun); 
		for(var i = 0; i < height; i++){
			map[topLeftCornerX + randomX][topLeftCornerY + i] = counter;
		}
		if(randomX > minimun * 2){
			divideSpace(topLeftCornerX,topLeftCornerY,randomX,height,minimun,counter - 1);
		}
		if(width - randomX > minimun * 2){ 
			divideSpace(topLeftCornerX + randomX,topLeftCornerY,width - randomX,height,minimun,counter - 1);
		}
	}
}
