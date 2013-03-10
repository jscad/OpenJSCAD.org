// -- Example 1

function main() {
   return translate([0,0,7.5],scale(5,union(
        difference(
            cube({size: 3, center: true}),
            sphere(2).setColor(1,1,0)),
        sphere(1.0).setColor(1,1,0))));
}
