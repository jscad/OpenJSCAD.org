// title      : Chain Hull
// author     : Rene K. Mueller
// license    : MIT License
// date       : 2013/04/18
// description: Whosa whatsis suggested "Chain Hull" as described at 
//    https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
// file       : hull.jscad

function main() {
   var o = [], p = [];
   
   for(var i=0; i<12; i++) {           // -- shell like
      var x = sin(i/12*180)*10;
      var y = cos(i/12*180)*10;
      o.push(circle({center: true}).scale(6-i/2).translate([x,y,0]));
   }

   var n = 6;
   for(i=0; i<n; i++) {            // -- hexagon chain hulled
      x = sin(i/n*360)*10;
      y = cos(i/n*360)*10;
      p.push(circle({center: true}).translate([x,y,0]));
   }

   return [
      linear_extrude({height: 5}, chain_hull(o)).translate([-20,0,0]), 
      chain_hull(o), 
      union(o).translate([20,0,0]),

      linear_extrude({height: 5}, chain_hull({closed: true}, p)).translate([-25,40,0]), 
      chain_hull({closed: true}, p).translate([0,40,0]),
      union(p).translate([25,40,0])
   ];
}

