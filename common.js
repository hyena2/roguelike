
var display = new ROT.Display({width:80, height:20});
var container = display.getContainer();

function displayEntity(entity){
	foreground = ROT.Color.toRGB([255,255,255]);
	background = ROT.Color.toRGB([0,0,0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(entity.x,entity.y,colors + entity.character);
}


function drawText(text){
	foreground = ROT.Color.toRGB([255,255,255]);
	background = ROT.Color.toRGB([0,0,0]);
	colors = "%c{" + foreground + "}%b{" + background + "}";
	display.drawText(0,19,colors + text);
}