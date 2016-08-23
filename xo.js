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

var image_xz = new Image();
image_xz.onload = function() {
  var arrow_xz = new Konva.Image({
	x: b/2+a*4+(b+4*a)*4+b,
    y: b/2+a,
    image: image_xz,
//	fill: '#d0d0d0',
    width: b,
    height: b
  });
  arrow_xz.on('mouseup touchend', function() {
	xzproc();
  })
  layer.add(arrow_xz);
  stage.add(layer);
};
image_xz.src = 'xz.png'

var image_yt = new Image();
image_yt.onload = function() {
  var arrow_yt = new Konva.Image({
	x: b/2+a*4+(b+4*a)*4+b,
    y: b/2+a+b+4*a,
    image: image_yt,
//	fill: '#d0d0d0',
    width: b,
    height: b
  });
  arrow_yt.on('mouseup touchend', function() {
	ytproc();
  })
  layer.add(arrow_yt);
  stage.add(layer);
};
image_yt.src = 'yt.png'

var image_u = new Image();
image_u.onload = function() {
  var arrow_u = new Konva.Image({
	x: b/2+a*4+(b+4*a)*4+b,
    y: b/2+a+b+4*a+b+4*a,
    image: image_u,
//	fill: '#d0d0d0',
    width: b,
    height: b
  });
  arrow_u.on('mouseup touchend', function() {
	undoproc();
  })
  layer.add(arrow_u);
  stage.add(layer);
};
image_u.src = 'undo.png'

//function xzproc() {	alert('xz');	}
function ytproc() {	alert('yt');	}
// function undoproc() {	alert('undo');	}

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
