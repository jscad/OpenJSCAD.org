// title      : Primitives
// author     : Rene K. Mueller
// license    : MIT License
// description: testing primitives function
// file       : primitives.jscad

function main () {
  var o = [
    cube(),
    cube({size: [1, 2, 3]}),
    cube({round: true}),
    cube({size: [1, 2, 3], round: true}),
    sphere(),
    sphere({fn: 8}),
    cylinder({r: 1, h: 10}),
    cylinder({r: 1, h: 10, round: true}),
    cylinder({r1: 3, r2: 0, h: 10}),
    cylinder({start: [0, 0, 0], end: [3, 3, 10], r: 1}),
    torus({ri: 0.5, ro: 2}),
    torus({ri: 0.1, ro: 2})
  ];
  for (var i = 0; i < o.length; i++) {
    o[i] = o[i].translate([(i % 4 - 2) * 6, Math.floor(i / 4 - 2) * 6, 0]);
  }
  return o;
}
