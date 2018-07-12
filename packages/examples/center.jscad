// title      : Center
// author     : Rene K. Mueller
// license    : MIT License
// description: testing all the different options of the OpenSCAD-like OpenJSCAD functions (aside of the strict object oriented approaches)
// file       : center.jscad

function main () {
  var o = [];

  pos = function (p) {
    o.push(
      union(
        cube({size: [2, 0.05, 0.05], center: [false, true, true]}).setColor(1, 0, 0),
        cube({size: [2, 0.05, 0.05], center: [false, true, true]}).setColor(1, 0, 0).rotateY(-90),
        cube({size: [2, 0.05, 0.05], center: [false, true, true]}).setColor(1, 0, 0).rotateZ(90),
        p
      )
    );
  }
  pos(cube());
  pos(cube(1.5));
  pos(cube({size: 0.8}));
  pos(cube({size: [1, 2, 3]}));
  pos(cube({size: [1, 2, 3], center: true}));
  pos(cube({size: [1, 2, 3], center: [true, true, false]}));
  pos(cube({size: [1, 2, 3], round: true, center: [true, true, false]}));
  pos(cube({size: [1, 2, 3], round: true, center: [true, true, false]}).setColor(1, 1, 0));

  pos(sphere());
  pos(sphere(0.8));
  pos(sphere({r: 1.1}));
  pos(sphere({r: 1, center: false}));
  pos(sphere({r: 1, center: [true, true, false]}));
  pos(sphere({r: 1, fn: 10}));
  pos(sphere({r: 1, fn: 32}).setColor([1, 1, 0]));
  pos(cube({size: 0.01, center: true}));

  pos(cylinder());
  pos(cylinder({r: 1, h: 4}));
  pos(cylinder({r: 1, h: 4, center: true}));
  pos(cylinder({r: 1, h: 4, center: [true, true, false]}));
  pos(cylinder({r1: 1, r2: 0, h: 4, center: [false, false, true]}));
  pos(cylinder({r: 1, start: [0, 0, 0], end: [1, 1, 4], center: [true, true, false]}));
  pos(color('yellow', cylinder({r: 1, start: [0, 0, 0], end: [1, 1, 4], center: [true, true, false]})));
  pos(cube({size: 0.01, center: true}));

  for (var i = 0; i < o.length; i++) {
    o[i] = o[i].translate([(i % 8) * 3, Math.floor(i / 8) * 4, 0]);
  }

  return o;
}
