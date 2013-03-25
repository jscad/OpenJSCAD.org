// -- Example 000: OpenJSCAD.org logo

function main() {
   return union(
      difference(
         cube({size: 3, center: true}),
         sphere(2)
      ),
      intersection(
          sphere(1.3),
          cube({size: 2.1, center: true})
      )
   ).translate([0,0,1.5]).scale(10);
}
