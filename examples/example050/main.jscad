// Example 050: platonic library (not yet working)

include("platonic.jscad");

function main() {
   var s = [];
   s.push( tetrahedron() );
   s.push( cube() );
   s.push( octahedron() );
   s.push( dodecahedron() );
   s.push( icosahedron() );
   for(var i=0; i<s.length; i++) {
      s.translate([i-2,0,0]);
   }
   return union(s);
}

