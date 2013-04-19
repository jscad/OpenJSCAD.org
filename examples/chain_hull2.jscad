// title: Chain Hull 2
// author: Rene K. Mueller
// date: 2013/04/18
// description: Whosa whatsis suggested "Chain Hull" as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN

function main() {
   var o = [];
   var n = 6;
   for(var i=0; i<n; i++) {
      var x = sin(i/n*360)*10;
      var y = cos(i/n*360)*10;
      o.push(circle({center: true}).translate([x,y,0]));
   }
   return [
      linear_extrude({height: 5}, chain_hull({closed: true}, o)).translate([-25,0,0]), 
      chain_hull({closed: true}, o),
      union(o).translate([25,0,0])
   ];
}



