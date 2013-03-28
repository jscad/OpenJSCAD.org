// Example 029: torus()

function main() {
   return union(
      torus(),
   
      torus({ ifn:4 }).translate([-10,0,0]),
      torus({ ifn:4,irot:45 }).translate([-10,10,0]),
      torus({ ifn:4,ofn:4,irot:45 }).translate([-10,20,0]),
      torus({ ifn:4,ofn:5,irot:45 }).translate([-10,30,0]),

      torus({ ofn:8 }).translate([10,0,0]),
      torus({ ofn:4 }).translate([20,0,0]),
      torus({ ofn:3 }).translate([30,0,0])
   ).scale(3);
}

