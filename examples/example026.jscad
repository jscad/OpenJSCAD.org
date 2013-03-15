// Example 026: linear_extrude()

function main() {
   return union(
      scale(3,
         linear_extrude({height: 10}, 
            circle({r: 1, fn: 5, center: true})
         )
      ),
      scale(3,
         linear_extrude({height: 10, twist: 90}, 
            translate([2,0,0], square({size: [1,2], center: true}))
         ).translate([0,5,0])
      ),
      scale(3,
         linear_extrude({height: 10, twist: -500, slices: 50 }, 
            translate([2,0,0], circle({r: 1, fn: 8, center: true}))
         ).translate([0,-6,0])
      ),
      scale(3,
         linear_extrude({height: 10, twist: 90 }, 
            polygon({ points:[[0,0],[3,0],[1,4],[2,1]] })
         ).translate([0,10,0])
      )
   );
}

