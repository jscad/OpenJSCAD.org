// title: Sphere
// author: Rene K. Mueller
// description: sphere, two kinds of

function main() {
   return [
      sphere({r: 10, fn: 16}).translate([15,-25,0]),
      sphere({r: 10, fn: 16, type: 'geodesic'}).translate([-15,-25,0]),

      sphere({r: 10, fn: 32}).translate([15,0,0]),
      sphere({r: 10, fn: 32, type: 'geodesic'}).translate([-15,0,0]),

      sphere({r: 10, fn: 32}).scale([0.5,1,2]).translate([15,25,0]),
      sphere({r: 10, fn: 32}).scale([0.5,2,1]).translate([30,25,0]),
      sphere({r: 10, fn: 32, type: 'geodesic'}).scale([0.5,1,2]).translate([-15,25,0]),
      sphere({r: 10, fn: 32, type: 'geodesic'}).scale([0.5,2,1]).translate([-30,25,0]),
   ];
}


