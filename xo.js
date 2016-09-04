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

//var _k_d = 35.0;
var _k_d = 0.8;
var _k_a1 = 28.0;
var _k_a2 = 31.0;
var _k_b1 = 1.6;
var _k_b2 = 1.57;
var _k_a;
var _k_b;
var _w_ = 0;
var _v_ = 0;

var wdth = window.innerWidth;
var hght = window.innerHeight;

function geom() {
	if(wdth > hght) {
		if(wdth > (hght*_k_a2/_k_a1)) {	_w_ = 1; a = hght/_k_a1; _k_b = _k_b1; }
		else { _w_ = 0; a = wdth/_k_a2; _k_b = _k_b2;}
		b = a*_k_b;
		x_xz = a*20+b*5.5; y_xz = 0.5*b+a; y_yt = 1.5*b+5*a; y_u = 2.5*b+9*a; 
		_v_ = 0; x_yt = x_xz; x_u = x_xz;
	}
	else {
		if(hght > (wdth*_k_a2/_k_a1)) { _w_ = 1; a = wdth/_k_a1; _k_b = _k_b1;}
		else { _w_ = 0; a = hght/_k_a2; _k_b = _k_b2;}
		b = a*_k_b;
		y_xz = a*20+b*5.5; x_xz = 0.5*b+a; x_yt = 1.5*b+5*a; x_u = 2.5*b+9*a; 
		_v_ = 1; y_yt = y_xz; y_u = y_xz;
	}
	d = a*_k_d;
}

geom();

var stage = new Konva.Stage({
  container: 'container',
  width: wdth,
  height: hght
});
var layer = new Konva.Layer();

var arrow_xz;
var arrow_yt;
var arrow_u;

var image_xz = new Image();
image_xz.onload = function() {
  arrow_xz = new Konva.Image({
	x: x_xz,
    y: y_xz,
    image: image_xz,
//	fill: '#d0d0d0',
    width: b,
    height: b
  });
  arrow_xz.on('mouseup touchend', function() {
	xzproc();
	repaintwin();
  })
  layer.add(arrow_xz);
  stage.add(layer);
};
image_xz.src = 'xz.png'

var image_yt = new Image();
image_yt.onload = function() {
  arrow_yt = new Konva.Image({
	x: x_yt,
    y: y_yt,
    image: image_yt,
//	fill: '#d0d0d0',
    width: b,
    height: b
  });
  arrow_yt.on('mouseup touchend', function() {
	ytproc();
	repaintwin();
  })
  layer.add(arrow_yt);
  stage.add(layer);
};
image_yt.src = 'yt.png'

var image_u = new Image();
image_u.onload = function() {
  arrow_u = new Konva.Image({
	x: x_u,
    y: y_u,
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

function resize() { 
	wdth = window.innerWidth;
	hght = window.innerHeight;

	stage.size({
		width: wdth,
		height: hght
	});
	geom();
	for(var i = 0; i < 5; i++)
		for(var j = 0; j < 5; j++)
			for(var k = 0; k < 5; k++)
				for(var l = 0; l < 5; l++) {
					tess[i][j][k][l].setAttrs({
						x: b/2+a*j+(b+4*a)*i,
						y: b/2+a*l+(b+4*a)*k,
						radius: d/2
					});
					arrow_xz.setAttrs({
						x: x_xz,
						y: y_xz,
						width: b,
						height: b
					});
					arrow_yt.setAttrs({
						x: x_yt,
						y: y_yt,
						width: b,
						height: b
					});
					arrow_u.setAttrs({
						x: x_u,
						y: y_u,
						width: b,
						height: b
					});
				};
}

window.onresize = resize;



//function xzproc() {	alert('xz');	}
//function ytproc() {	alert('yt');	}
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
				tess[i][j][k][l].g = {x:i, y:j, z:k, t:l};
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
