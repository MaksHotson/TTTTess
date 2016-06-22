var tess = new Array(5);

for(var i = 0; i < 5; i++)
	tess[i] = new Array(5);
for(i = 0; i < 5; i++)
	for(var j = 0; j < 5; j++)
		tess[i][j] = new Array(5);
for(i = 0; i < 5; i++)
	for(j = 0; j < 5; j++)
		for(var k = 0; k < 5; k++)
			tess[i][j][k] = new Array(5);

var m = 0;
var n = 1;
var a, b, d, colr;

var wdth = window.innerWidth;
var hght = window.innerHeight;

d = Math.min(hght, wdth)/35.0;
a = Math.min(hght, wdth)/28.0;
b = a*1.6;

var stage = new Konva.Stage({
  container: 'container',
  width: wdth,
  height: hght
});
var layer = new Konva.Layer();

///*
for(i = 0; i < 5; i++)
	for(j = 0; j < 5; j++)
		for(var k = 0; k < 5; k++)
			for(var l = 0; l < 5; l++) {
				colr = '#d0d0d0';
				tess[i][j][k][l] = new Konva.Circle({
					x: b/2+a*j+(b+4*a)*i,
					y: b/2+a*l+(b+4*a)*k,
					radius: d/2,
					fill: colr
				});
				tess[i][j][k][l].num = 0;
				tess[i][j][k][l].tx = i;
				tess[i][j][k][l].ty = j;
				tess[i][j][k][l].tz = k;
				tess[i][j][k][l].tt = l;
				layer.add(tess[i][j][k][l]);
}
stage.add(layer);

for(i = 0; i < 5; i++)
	for(j = 0; j < 5; j++)
		for(var k = 0; k < 5; k++)
			for(var l = 0; l < 5; l++) {
				tess[i][j][k][l].on('mouseup touchend', function(evt) {
					repaint(evt.target);
				});
}
