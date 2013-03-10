// -- Example 2

var cubes = new Array();

function main() {
   for(var i=0; i<100; i++) {
      cubes[i] = translate([
         50*Math.random()-25,
         50*Math.random()-25,
         50*Math.random()-25],
         cube(1));
   }
   return union(cubes);
}
