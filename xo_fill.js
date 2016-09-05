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
var _k_d = 0.8, _k_a1 = 28.0, _k_a2 = 31.0, _k_b1 = 1.6, _k_b2 = 1.57, _k_a, _k_b, _w_ = 0, _v_ = 0;
var human_done = 0, human_ena = 888, comp_done = 0, comp_ena = 888;

var blank_field_color = '#d0d0d0';
var human_color = '#007733';
var human_win_color = '#00FF77';
var comp_color = '#770033';
var comp_win_color = '#FF0077';

var wdth = window.innerWidth;
var hght = window.innerHeight;

function geom() {
	if(wdth > hght) {
		if(wdth > (hght*_k_a2/_k_a1)) {	_w_ = 1; a = hght/_k_a1; _k_b = _k_b1; }
		else { _w_ = 0; a = wdth/_k_a2; _k_b = _k_b2;}
		b = a*_k_b;
		x_xz = a*20+b*5.5; y_xz = 0.5*b+a; y_yt = 1.5*b+5*a; y_u = 2.5*b+9*a;
		x_ht = x_xz; y_hd = 3.5*b+13*a; y_he = 3.5*b+14*a;
		x_ct = x_xz; y_cd = 4.5*b+17*a; y_ce = 4.5*b+18*a;
		_v_ = 0; x_yt = x_xz; x_u = x_xz;
	}
	else {
		if(hght > (wdth*_k_a2/_k_a1)) { _w_ = 1; a = wdth/_k_a1; _k_b = _k_b1;}
		else { _w_ = 0; a = hght/_k_a2; _k_b = _k_b2;}
		b = a*_k_b;
		y_xz = a*20+b*5.5; x_xz = 0.5*b+a; x_yt = 1.5*b+5*a; x_u = 2.5*b+9*a; 
		x_ht = 3.5*b+14*a; y_hd = y_xz; y_he = y_xz+a;
		x_ct = 3.5*b+18*a; y_cd = y_xz; y_ce = y_xz+a;
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

var HumanDone = new Konva.Text({
	x: x_ht,
	y: y_hd,
	text: human_done,
	fontSize: d,
	fontFamily: 'Calibri',
	fill: human_color,
});
layer.add(HumanDone);
stage.add(layer);

var HumanEna = new Konva.Text({
	x: x_ht,
	y: y_he,
	text: '-' + human_ena,
	fontSize: d,
	fontFamily: 'Calibri',
	fill: human_color,
});
layer.add(HumanEna);
stage.add(layer);

function redraw_text() {
	HumanDone.setAttrs({ text: human_done });
	HumanEna.setAttrs({ text: '-' + human_ena });
	CompDone.setAttrs({ text: comp_done });
	CompEna.setAttrs({ text: '-' + comp_ena });
}

var CompDone = new Konva.Text({
	x: x_ct,
	y: y_cd,
	text: comp_done,
	fontSize: d,
	fontFamily: 'Calibri',
	fill: comp_color,
});
layer.add(CompDone);
stage.add(layer);

var CompEna = new Konva.Text({
	x: x_ct,
	y: y_ce,
	text: '-' + comp_ena,
	fontSize: d,
	fontFamily: 'Calibri',
	fill: comp_color,
});
layer.add(CompEna);
stage.add(layer);

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
					tess[i][j][k][l].setAttrs({ x: b/2+a*j+(b+4*a)*i, y: b/2+a*l+(b+4*a)*k, radius: d/2 });
					arrow_xz.setAttrs({ x: x_xz, y: y_xz, width: b, height: b });
					arrow_yt.setAttrs({ x: x_yt, y: y_yt, width: b, height: b });
					arrow_u.setAttrs({ x: x_u, y: y_u, width: b, height: b });
					HumanDone.setAttrs({ x: x_ht, y: y_hd, fontSize: d });
					HumanEna.setAttrs({ x: x_ht, y: y_he, fontSize: d });
					CompDone.setAttrs({ x: x_ct, y: y_cd, fontSize: d });
					CompEna.setAttrs({ x: x_ct, y: y_ce, fontSize: d });
				};
}

window.onresize = resize;


for(i = 0; i < 5; i++)
	for(j = 0; j < 5; j++)
		for(var k = 0; k < 5; k++)
			for(var l = 0; l < 5; l++) {
//				colr = '#d0d0d0';
				colr = blank_field_color;
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
