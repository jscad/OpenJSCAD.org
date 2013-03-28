// Example 028: rotate_extrude()

function main() {
   return union(
      // openscad-like
      rotate_extrude(translate([4,0,0],circle({r: 1, fn: 30, center: true}))),
      rotate_extrude({fn: 5},
         translate([4,0,0],circle({r: 1, fn: 30, center: true}))).translate([0,10,0]),
      rotate_extrude({fn: 30},
         translate([4,0,0],circle({r: 1, fn: 5, center: true}))).translate([0,20,0]),

      // openjscad-openjscad mixed
      rotate_extrude({fn: 4},circle({r: 1, fn: 4, center: true}).translate([4,0,0])).translate([-10,0,0]),
      rotate_extrude({fn: 4},circle({r: 1, fn: 4, center: true}).rotateZ(45).translate([4,0,0])).translate([-20,0,0]),
      rotate_extrude({fn: 3},circle({r: 1, fn: 4, center: true}).rotateZ(45).translate([4,0,0])).translate([-20,10,0]),
      rotate_extrude({fn: 5},circle({r: 1, fn: 4, center: true}).rotateZ(45).translate([4,0,0])).translate([-20,20,0]),
      
      rotate_extrude(polygon({points:[[0,0],[2,1],[1,2],[1,3],[3,4],[0,5]]})).translate([10,0,0]),
      rotate_extrude({fn:4},polygon({points:[[0,0],[2,1],[1,2],[1,3],[3,4],[0,5]]})).translate([18,0,0])
   );
}

