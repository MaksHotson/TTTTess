
var arr = [];
var d;
var xz_state = 0;
var yt_state = 0;

function field() {}

var plin = new Array(5);

for(i = 0; i < 5; i++) {
	plin[i] = new field();
	plin[i].num = 0;
	plin[i].num0 = 0;
	plin[i].x = 0;
	plin[i].y = 0;
	plin[i].z = 0;
	plin[i].t = 0;
}

function cube_line_set() {
	for(var lsi = 0; lsi < 5; lsi++) {
		tess[plin[lsi].x][plin[lsi].y][plin[lsi].z][plin[lsi].t].num = plin[lsi].num;
	}
	if(lineresult == 2) {
		arr[arr.length-1].cx = plin[last_c].x;
		arr[arr.length-1].cy = plin[last_c].y;
		arr[arr.length-1].cz = plin[last_c].z;
		arr[arr.length-1].ct = plin[last_c].t;
	}
}

function cube_line_get() {
	for(var lgi = 0; lgi < 5; lgi++) {
		plin[lgi].num = tess[plin[lgi].x][plin[lgi].y][plin[lgi].z][plin[lgi].t].num;
		plin[lgi].num0 = tess[plin[lgi].x][plin[lgi].y][plin[lgi].z][plin[lgi].t].num;
	}
}

var last_c;

function line_test() {
	var h, c, lti;
	h = 0;
	c = 0;
	for(lti = 0; lti < 5; lti++) {
		if(plin[lti].num == -1) h++;
		if(plin[lti].num == -2) c++;
	}
	if((h*c) != 0)
		return 0; // do nothing
	if(h == 5) {
		human_done++;
//		return 1;
		return 0;
	}
	if(c == 5) {
		comp_done++;
//		return 2;
		return 0;
	}

	human_ena++;
	comp_ena++;
	if(h > 0) { comp_ena--; }
	if(c > 0) { human_ena--; }

	for(lti = 0; lti < 5; lti++) {
//		if(plin[lti].num >= 0) plin[lti].num += 60/(6-h-c)-10;
		if(plin[lti].num >= 0) plin[lti].num += (h+c)*(h+c)*(h+c);
	}
	return 3;
}

var str_out = '';
var stop = 0;
var debug_win;
var lineresult;

function line_handle() {
	cube_line_get();
	lineresult = line_test();
	cube_line_set();
	if((lineresult == 1) || (lineresult == 2)) repaintwin();
	if(debug_win == 1) {
		str_out = '';
		newWin.document.write("<tr>");
		for(var lhi = 0; lhi < 5; lhi++) {
			newWin.document.write("<td>" + "</td>");
			newWin.document.write("<td>" + plin[lhi].x + "</td>");
			newWin.document.write("<td>" + plin[lhi].y + "</td>");
			newWin.document.write("<td>" + plin[lhi].z + "</td>");
			newWin.document.write("<td>" + plin[lhi].t + "</td>");
			newWin.document.write("<td>" + "</td>");
			newWin.document.write("<td>" + plin[lhi].num0 + "</td>");
			newWin.document.write("<td>" + plin[lhi].num + "</td>");
		}
		newWin.document.write("</tr>");
	}
}

var ii = 0, jj = 0, kk = 0, ll = 0;

function diag_0() {
var i = 0, j = 0, k = 0, l = 0, m = 0;
	if(debug_win == 1) {
		newWin.document.write("<tr>");
		newWin.document.write("<td> diag_0</td>");
		newWin.document.write("</tr>");
	}
//		alert("diag_0");
	for(i = 0; i < 4; i++)
		for(j = 0; j < 5; j++)
			for(k = 0; k < 5; k++)
				for(l = 0; l < 5; l++) {
					for(m = 0; m < 5; m++) {
						switch (i) {
							case 0:	plin[m].x = j; plin[m].y = k; plin[m].z = l; plin[m].t = m; break;
							case 1: plin[m].x = j; plin[m].y = k; plin[m].t = l; plin[m].z = m; break;
							case 2: plin[m].x = j; plin[m].z = k; plin[m].t = l; plin[m].y = m; break;
							case 3: plin[m].y = j; plin[m].z = k; plin[m].t = l; plin[m].x = m; break;
						}	
					}
					line_handle();
				}
}

function diag_1() {
var i = 0, j = 0, k = 0, l = 0, m = 0;
	if(debug_win == 1) {
		newWin.document.write("<tr>");
		newWin.document.write("<td> diag_1</td>");
		newWin.document.write("</tr>");
	}
//		alert("diag_1");
	for(i = 0; i < 6; i++)
		for(j = 0; j < 5; j++)
			for(k = 0; k < 5; k++) {
				for(l = 0; l < 5; l++) {
					switch (i) {
						case 0: plin[l].z = l; plin[l].t = l; plin[l].x = j; plin[l].y = k; break;
						case 1: plin[l].y = l; plin[l].t = l; plin[l].x = j; plin[l].z = k; break;
						case 2: plin[l].y = l; plin[l].z = l; plin[l].x = j; plin[l].t = k; break;
						case 3: plin[l].x = l; plin[l].t = l; plin[l].y = j; plin[l].z = k; break;
						case 4: plin[l].x = l; plin[l].z = l; plin[l].y = j; plin[l].t = k; break;
						case 5: plin[l].x = l; plin[l].y = l; plin[l].z = j; plin[l].t = k; break;
					}
				}
				line_handle();
				for(l = 0; l < 5; l++) {
					switch (i) {
						case 0: plin[l].z = l; plin[l].t = 4-l; plin[l].x = j; plin[l].y = k; break;
						case 1: plin[l].y = l; plin[l].t = 4-l; plin[l].x = j; plin[l].z = k; break;
						case 2: plin[l].y = l; plin[l].z = 4-l; plin[l].x = j; plin[l].t = k; break;
						case 3: plin[l].x = l; plin[l].t = 4-l; plin[l].y = j; plin[l].z = k; break;
						case 4: plin[l].x = l; plin[l].z = 4-l; plin[l].y = j; plin[l].t = k; break;
						case 5: plin[l].x = l; plin[l].y = 4-l; plin[l].z = j; plin[l].t = k; break;
					}
				}
				line_handle();
	}
}

function diag_2() {
var i = 0, j = 0, k = 0, l = 0, m = 0;
	if(debug_win == 1) {
		newWin.document.write("<tr>");
		newWin.document.write("<td> diag_2</td>");
		newWin.document.write("</tr>");
	}
//		alert("diag_2");
	for(i = 0; i < 4; i++)
		for(j = 0; j < 5; j++) {
			for(k = 0; k < 5; k++) {
				switch (i) {
					case 0: plin[k].y = k; plin[k].z = k; plin[k].t = k; plin[k].x = j; break;
					case 1: plin[k].x = k; plin[k].z = k; plin[k].t = k; plin[k].y = j; break;
					case 2: plin[k].x = k; plin[k].y = k; plin[k].t = k; plin[k].z = j; break;
					case 3: plin[k].x = k; plin[k].y = k; plin[k].z = k; plin[k].t = j; break;
				}
			}
			line_handle();
			for(k = 0; k < 5; k++) {
				switch (i) {
					case 0: plin[k].y = k; plin[k].z = 4-k; plin[k].t = k; plin[k].x = j; break;
					case 1: plin[k].x = k; plin[k].z = 4-k; plin[k].t = k; plin[k].y = j; break;
					case 2: plin[k].x = k; plin[k].y = 4-k; plin[k].t = k; plin[k].z = j; break;
					case 3: plin[k].x = k; plin[k].y = 4-k; plin[k].z = k; plin[k].t = j; break;
				}
			}
			line_handle();
			for(k = 0; k < 5; k++) {
				switch (i) {
					case 0: plin[k].y = 4-k; plin[k].z = k; plin[k].t = k; plin[k].x = j; break;
					case 1: plin[k].x = 4-k; plin[k].z = k; plin[k].t = k; plin[k].y = j; break;
					case 2: plin[k].x = 4-k; plin[k].y = k; plin[k].t = k; plin[k].z = j; break;
					case 3: plin[k].x = 4-k; plin[k].y = k; plin[k].z = k; plin[k].t = j; break;
				}
			}
			line_handle();
			for(k = 0; k < 5; k++) {
				switch (i) {
					case 0: plin[k].y = 4-k; plin[k].z = 4-k; plin[k].t = k; plin[k].x = j; break;
					case 1: plin[k].x = 4-k; plin[k].z = 4-k; plin[k].t = k; plin[k].y = j; break;
					case 2: plin[k].x = 4-k; plin[k].y = 4-k; plin[k].t = k; plin[k].z = j; break;
					case 3: plin[k].x = 4-k; plin[k].y = 4-k; plin[k].z = k; plin[k].t = j; break;
				}
			}
			line_handle();
	}
}

function diag_3() {
var i = 0, j = 0, k = 0, l = 0, m = 0;
	if(debug_win == 1) {
		newWin.document.write("<tr>");
		newWin.document.write("<td> diag_3</td>");
		newWin.document.write("</tr>");
	}
//		alert("diag_3");
	for(k = 0; k < 5; k++) {plin[k].x = k; plin[k].y = k; plin[k].z = k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = k; plin[k].y = k; plin[k].z = 4-k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = k; plin[k].y = 4-k; plin[k].z = k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = k; plin[k].y = 4-k; plin[k].z = 4-k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = 4-k; plin[k].y = k; plin[k].z = k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = 4-k; plin[k].y = k; plin[k].z = 4-k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = 4-k; plin[k].y = 4-k; plin[k].z = k; plin[k].t = k;}
	line_handle();
	for(k = 0; k < 5; k++) {plin[k].x = 4-k; plin[k].y = 4-k; plin[k].z = 4-k; plin[k].t = k;}
	line_handle();
}

var ss = '';
var ii_i = 0, jj_j = 0, kk_k = 0, ll_l = 0;
var tmp_coord = 0;
var t_p, t_gp, t_g;

function repaintwin() {
	for(var rri = 0; rri < 5; rri++)
		for(var rrj = 0; rrj < 5; rrj++)
			for(var rrk = 0; rrk < 5; rrk++)
				for(var rrl = 0; rrl < 5; rrl++) {
					t_p = tess[rri][rrj][rrk][rrl];
					t_gp = tess[t_p.g.x][t_p.g.y][t_p.g.z][t_p.g.t];
					colr = blank_field_color; t_gp.setFill(colr);
					switch (t_p.num) {
						case -1: colr = human_color; break;
						case -2: colr = comp_color; break;
						case -3: colr = human_win_color; break;
						case -4: colr = comp_win_color; break;
					}
					t_gp.setFill(colr);
				}
	layer.draw();  
}

function xzproc() {
	xz_state = 1 - xz_state;
	for(var rrk = 0; rrk < 5; rrk++)
		for(var rrl = 0; rrl < 5; rrl++)
			for(var rri = 0; rri < 5; rri++)
				for(var rrj = 0; rrj < rri; rrj++) {
					t_g = tess[rri][rrj][rrk][rrl].g;
					tess[rri][rrj][rrk][rrl].g = tess[rrj][rri][rrk][rrl].g;
					tess[rrj][rri][rrk][rrl].g = t_g;
				}	
}

function ytproc() {
	yt_state = 1 - yt_state;
	for(var rri = 0; rri < 5; rri++)
		for(var rrj = 0; rrj < 5; rrj++)
			for(var rrk = 0; rrk < 5; rrk++)
				for(var rrl = 0; rrl < rrk; rrl++) {
					t_g = tess[rri][rrj][rrk][rrl].g;
					tess[rri][rrj][rrk][rrl].g = tess[rri][rrj][rrl][rrk].g;
					tess[rri][rrj][rrl][rrk].g = t_g;
				}	
}

function undoproc() {
//	if((arr.length > 0) & (stop==0)){
	if(arr.length > 0){
		d = arr.pop();
		tess[d.hx][d.hy][d.hz][d.ht].num = 0;
		tess[d.cx][d.cy][d.cz][d.ct].num = 0;
		if(stop==1) {
			stop=0;
//			for(var rri = 0; rri < 5; rri++)
//				for(var rrj = 0; rrj < 5; rrj++)
//					for(var rrk = 0; rrk < 5; rrk++)
//						for(var rrl = 0; rrl < 5; rrl++) {
//							switch (tess[rri][rrj][rrk][rrl].num) {
//								case -3: tess[rri][rrj][rrk][rrl].num = -1; break;
//								case -4: tess[rri][rrj][rrk][rrl].num = -2; break;
//							}
//						}
		}
//		repaintwin();
//		layer.draw();  
		human_done = 0, human_ena = 0, comp_done = 0, comp_ena = 0;
		diag_0();
		diag_1();
		diag_2();
		diag_3();
		redraw_text();
		repaintwin();
		layer.draw();  
	}
}

function repaint(t) {
	if(stop==1) {
		return;	
	}
	debug_win = 0;
	if(tess[t.g.x][t.g.y][t.g.z][t.g.t].num >= 0) {
		if(debug_win == 1) {
			newWin = window.open();
			newWin.document.write("<table border = 1>");
		}
		tess[t.g.x][t.g.y][t.g.z][t.g.t].num = -1;
		arr.push({hx:t.g.x, hy:t.g.y, hz:t.g.z, ht:t.g.t});
		human_done = 0, human_ena = 0, comp_done = 0, comp_ena = 0;
		diag_0();
		diag_1();
		diag_2();
		diag_3();
//		redraw_text();
//		ss = '';
		if(stop==1) {
			return;	
		}
        ii_i = 0; jj_j = 0; kk_k = 0; ll_l = 0;
		for(var ri = 0; ri < 5; ri++)
			for(var rj = 0; rj < 5; rj++)
				for(var rk = 0; rk < 5; rk++)
					for(var rl = 0; rl < 5; rl++) {
							ss = ss + ', ' + tess[ri][rj][rk][rl].num;
							if(tess[ri][rj][rk][rl].num > tess[ii_i][jj_j][kk_k][ll_l].num) {
								ii_i = ri; jj_j = rj; kk_k = rk; ll_l = rl;
							}
						}
		if(debug_win == 1) {
			newWin.document.write("</table>");
		}
//		newWin.document.write("<p>" + ss + "</p>");
//		alert(ss);
		t_p = tess[ii_i][jj_j][kk_k][ll_l];
		t_p.num = -2;
		arr[arr.length-1].cx = t_p.tx;
		arr[arr.length-1].cy = t_p.ty;
		arr[arr.length-1].cz = t_p.tz;
		arr[arr.length-1].ct = t_p.tt;
		human_done = 0, human_ena = 0, comp_done = 0, comp_ena = 0;
		diag_0();
		diag_1();
		diag_2();
		diag_3();
		redraw_text();
		repaintwin();
		for(ri = 0; ri < 5; ri++)
			for(rj = 0; rj < 5; rj++)
				for(rk = 0; rk < 5; rk++)
					for(rl = 0; rl < 5; rl++) {
							if(tess[ri][rj][rk][rl].num > 0) {
								tess[ri][rj][rk][rl].num = 0;
							}
						}
		layer.draw();  
		if(human_ena*comp_ena == 0) stop = 1;
	};
}
