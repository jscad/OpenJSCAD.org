// title      : Example 004
// author     : OpenSCAD.org, adapted by Rene K. Mueller
// license    : MIT License
// description: example004.scad ported to OpenJSCAD.org
// file       : example004.jscad

function example004 () {
  return difference(
    cube({size: 30, center: true}),
    sphere(20)
  );
}

function main () {
  return example004();
}
