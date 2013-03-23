// -- Example 000: OpenJSCAD.org logo

function main() {
   return scale(10,
      translate([0,0,1.5],
      union(
            difference(
               cube({size: 3, center: true}),
               sphere(2)
            ),
            intersection(
                sphere(1.3),
                cube({size: 2.1, center: true})
            )
         )
      )
   );
}

