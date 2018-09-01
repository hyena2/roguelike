
var display = new ROT.Display({width:80, height:20});
var container = display.getContainer();

function drawMap(width,height,map){
	for(var i = 0; i < width; i++){
		for(var j = 0; j < height; j++){
			foreground = ROT.Color.toRGB([255,255,255]);
			background = ROT.Color.toRGB([0,0,0]);
			colors = "%c{" + foreground + "}%b{" + background + "}";
			display.drawText(j,i,colors + map[(i*width)+j]);
		}
	}
}

