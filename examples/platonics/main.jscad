// Example 050: platonics with library

include("platonic.jscad");

function platonicSolid(n) {
   var a = n();
   return polyhedron({points: a[0], triangles: a[1]});
}

function platonicWire(n) {
   var a = n();
   var p = a[0];
   var t = a[1];
   var o = [];
   
   for(var i=0; i<t.length; i++) {
      for(var j=0; j<t[i].length; j++) {
         var p1 = p[t[i][j]];
         var p2 = p[t[i][(j+1)%t[i].length]];
         o.push(cylinder({start: p1, end: p2, fn:3, r: 0.02}));
      }
   }
   return union(o);
}

function main() {
   var s = [];
   s.push(platonicSolid(tetrahedron));
   s.push(platonicSolid(hexahedron));
   s.push(platonicSolid(octahedron));
   s.push(platonicSolid(dodecahedron));
   s.push(platonicSolid(icosahedron));
   for(var i=0; i<s.length; i++) {
      s[i] = s[i].scale(5).translate([(i-s.length/2)*2,0,0]);
   }
   return s;
}

