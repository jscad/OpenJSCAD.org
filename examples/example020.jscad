// -- Example 020

var cubes = new Array();

function main() {
   for(var i=0; i<100; i++) {
      cubes[i] = translate([
         150*Math.random()-75,
         150*Math.random()-75,
         150*Math.random()-75],
         cube(5));
   }
   return union(cubes);
}
