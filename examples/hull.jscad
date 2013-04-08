// -- hull() 

function main() {
   return union(
      union(
         linear_extrude({height:0.1}, translate([-15,10,0], circle({r: 10, center: true}))),
         linear_extrude({height:0.1}, square({size: [10,10], center: true}))
      ).translate([-20,0,0]),
      
      linear_extrude({height: 10}, 
         hull(
            translate([-15,10,0], circle({r: 10, center: true})),
            square({size: [10,10], center: true})
         ).translate([20,0,0])
      )
   );
}
