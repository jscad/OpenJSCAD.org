// title      : OpenJSCAD.org Logo BIG
// author     : Jeff Gay
// license    : MIT License
// revision   : 0.001
// tags       : Logo,Intersection,Sphere,Cube,Big
// file       : logo_big.jscad

function main () {
  var small = union(
    difference(
      cube({size: 3, center: true}),
      sphere({r: 2, center: true})
    ),
    intersection(
      sphere({r: 1.3, center: true}),
      cube({size: 2.1, center: true})
    )
  ).translate([0, 0, 1.5]).scale(10);

  var large = union(
    difference(
      cube({size: 300, center: true}),
      sphere({r: 200, center: true})
    ),
    intersection(
      sphere({r: 130, center: true}),
      cube({size: 210, center: true})
    )
  ).translate([0, 0, 150]);

  return small.union(large);
}
