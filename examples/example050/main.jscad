// Example 050: platonics with library

includePath("examples/example050/");      // only required when drag'n'drop (must run local web-server)

include("platonic.jscad");
//require("./platonic.jscad");    // doesn't like .jscad extension

function platonic(n) {
   var a = n();
   return polyhedron({points: a[0], triangles: a[1]});
}

function main() {
   var s = [];
   s.push(platonic(tetrahedron));
   s.push(platonic(hexahedron));
   s.push(platonic(octahedron));
   s.push(platonic(dodecahedron));
   s.push(platonic(icosahedron));
   for(var i=0; i<s.length; i++) {
      s[i] = s[i].translate([i*2,0,0]);
   }
   return union(s).scale(5);
}

