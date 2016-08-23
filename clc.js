
var arr = [];
var d;

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
}

function cube_line_get() {
	for(var lgi = 0; lgi < 5; lgi++) {
		plin[lgi].num = tess[plin[lgi].x][plin[lgi].y][plin[lgi].z][plin[lgi].t].num;
		plin[lgi].num0 = tess[plin[lgi].x][plin[lgi].y][plin[lgi].z][plin[lgi].t].num;
	}
}

function line_test() {
	var h, c, lti;
	h = 0;
	c = 0;
	for(lti = 0; lti < 5; lti++) {
		if(plin[lti].num == -1) h++;
		if(plin[lti].num == -2) c++;
	}
	if(h == 5) {
		for(lti = 0; lti < 5; lti++) {
			plin[lti].num = -3;
		}
//		alert("You WIN!!!");
		stop = 1;
//		repaintwin()
		return 1;
	}// human win
	if((h*c) != 0)
		return 0; // do nothing
	if(c == 4) {
		for(lti = 0; lti < 5; lti++) {
			plin[lti].num = -4;
		}
		stop = 1;
//		alert("I WIN!!!");
//		repaintwin()
		return 2;
	} // add one point, comp win
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

function repaintwin() {
		for(var rri = 0; rri < 5; rri++)
			for(var rrj = 0; rrj < 5; rrj++)
				for(var rrk = 0; rrk < 5; rrk++)
					for(var rrl = 0; rrl < 5; rrl++) {
						switch (tess[rri][rrj][rrk][rrl].num) {
							case -1: colr = '#007733'; tess[rri][rrj][rrk][rrl].setFill(colr); break;
							case -2: colr = '#770033'; tess[rri][rrj][rrk][rrl].setFill(colr); break;
							case -3: colr = '#00FF77'; tess[rri][rrj][rrk][rrl].setFill(colr); break;
							case -4: colr = '#FF0077'; tess[rri][rrj][rrk][rrl].setFill(colr); break;
						}
//						tess[ri][rj][rk][rl].setFill(colr);
					}
		layer.draw();  
}

function undoproc() {
//	alert('undo');
	d = arr.pop();
//	alert(d.y + ', ' + d.x + ', ' + (d.y-d.x));
	tess[d.hx][d.hy][d.hz][d.ht].num = 0;
	tess[d.cx][d.cy][d.cz][d.ct].num = 0;
	colr = '#d0d0d0';
	tess[d.hx][d.hy][d.hz][d.ht].setFill(colr);
	tess[d.cx][d.cy][d.cz][d.ct].setFill(colr);
	layer.draw();  
}

function repaint(t) {
	if(stop==1) {
		return;	
	}
	debug_win = 0;
	if(t.num >= 0) {
		if(debug_win == 1) {
			newWin = window.open();
			newWin.document.write("<table border = 1>");
		}
		t.num = -1;
		arr.push({hx:t.tx, hy:t.ty, hz:t.tz, ht:t.tt});
		arr[arr.length-1].y = 9;
		colr = '#007733';
		t.setFill(colr);
		diag_0();
		diag_1();
		diag_2();
		diag_3();
//		ss = '';
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
//		tess[t.tx+1][t.ty][t.tz][t.tt].num = -2;
		tess[ii_i][jj_j][kk_k][ll_l].num = -2;
		arr[arr.length-1].cx = tess[ii_i][jj_j][kk_k][ll_l].tx;
		arr[arr.length-1].cy = tess[ii_i][jj_j][kk_k][ll_l].ty;
		arr[arr.length-1].cz = tess[ii_i][jj_j][kk_k][ll_l].tz;
		arr[arr.length-1].ct = tess[ii_i][jj_j][kk_k][ll_l].tt;
		colr = '#770033';
//		tess[t.tx+1][t.ty][t.tz][t.tt].setFill(colr);
		tess[ii_i][jj_j][kk_k][ll_l].setFill(colr);
		for(ri = 0; ri < 5; ri++)
			for(rj = 0; rj < 5; rj++)
				for(rk = 0; rk < 5; rk++)
					for(rl = 0; rl < 5; rl++) {
							if(tess[ri][rj][rk][rl].num > 0) {
								tess[ri][rj][rk][rl].num = 0;
							}
						}
		layer.draw();  
	};
}
