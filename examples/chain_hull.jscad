// title: Chain Hull
// author: Rene K. Mueller
// date: 2013/04/18
// description: Whosa whatsis suggested "Chain Hull" as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN

function main() {
   var o = [];
   for(var i=0; i<12; i++) {
      var x = sin(i/12*180)*10;
      var y = cos(i/12*180)*10;
      o.push(circle({center: true}).scale(6-i/2).translate([x,y,0]));
   }
   return [
      linear_extrude({height: 10}, chain_hull(o)).translate([-20,0,0]), 
      chain_hull(o), 
      union(o).translate([20,0,0])
   ];
}

