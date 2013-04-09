// -- hull() 

function showHull() {
   var o = Array.prototype.slice.call(arguments);
   return group( 
      union(o).translate([20,0,0]),    // flat single
      hull(o).translate([-10,0,0]),    // flat convex hulled
      linear_extrude({height: 10},     // convex hulled extruded
         hull(o)).translate([-40,0,0])
   );
}

function main() {
   return [
      showHull(
         circle({r: 8, center: true}).translate([0,20,0]), 
         circle({r: 8, center: true})
      ).translate([-20,-20,0]),
      
      showHull(
         circle({r: 8, center: true}).translate([-15,10,0]),
         square({size: [10,10], center: true})
      ).translate([-20,30,0])
   ];
}
