// -- OpenJSCAD.org logo

// Title: OpenJSCAD.org Logo
// Author: Rene K. Mueller 
// License: Creative Commons CC BY
// URL: http://openjscad.org/#examples/logo.jscad
// Revision: 0.003

function main() {
   return union(
      difference(
         cube({size: 3, center: true}),
         sphere({r:2, center: true})
      ),
      intersection(
          sphere({r: 1.3, center: true}),
          cube({size: 2.1, center: true})
      )
   ).translate([0,0,1.5]).scale(10);
}
