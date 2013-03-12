// -- Example 024

function main() {
   return scale(10,expand(0.2, 8, 
       difference(
           cube(2),
           translate([-0.3,-0.3,-0.3], cube(2))
        )
    ));
}
