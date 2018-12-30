// title      : Vector Text Rendering
// author     : Rene K. Mueller
// license    : MIT License
// description: playing with vector font
// date       : 2013/04/22
// file       : text.jscad

function getParameterDefinitions () {
  return [
    { name: 's', initial: 'Hello World!', type: 'text', caption: 'Text to render', size: 30 },
    { name: 'c', initial: 'A', type: 'text', caption: 'Char to render', size: 2 }
  ];
}

function main (param) {
  var o = [];

  var l = vector_text(0, 0, param.s); // get line segments [ [ [x1,y1], [x2,y2] ...], [ ]... ]

  l.forEach(function (s) { // process the line segments
    o.push(rectangular_extrude(s, {w: 2, h: 2}));
  });

  if (param.c.length) {
    var c = vector_char(0, 0, param.c); // get data for one character
    var a = c.segments;
    for (var i = 0; i < 5; i++) {
      var p = [];
      a.forEach(function (s) {
        p.push(circularExtrude(s, {r: i / 2 + 1, fn: 8})); // variable thickness
      });
      o.push(union(p).setColor(hsl2rgb(i / 5, 1, 0.5)).translate([i * (c.width + i / 2), 30, 0]));
    }
  }
  return union(o).scale(0.5).translate([-50, 0, 0]);
}

// -- simplistic circularExtrude done with cylinders + spheres

function circularExtrude (s, p) {
  var o = [];
  var r = 1; fn = 16; rot = 0;
  if (p) {
    if (p.r) r = p.r;
    if (p.fn) fn = p.fn;
    if (p.rot !== undefined) rot = p.rot;
  }
  for (var i = 0; i < s.length - 1; i++) {
    var p1 = s[i].concat(0);
    var p2 = s[i + 1].concat(0);
    o.push(cylinder({start: p1, end: p2, r: r, fn: fn}));
    o.push(sphere({center: true, r: r, fn: fn}).translate(p1));
    if (i === s.length - 2) {
      o.push(sphere({center: true, r: r, fn: fn}).translate(p2));
    }
  }
  return union(o);
}
