// Example 025: rectangular_extrude()

function main() {
   return union( 
      // openscade like
      rectangular_extrude([ [0,0], [10,0], [5,10], [0,10] ]),
      rectangular_extrude([ [0,0], [10,0], [5,10], [0,10] ], {w: 1, h: 3, closed: false}).translate([0,15,0]),

      // object-oriented
      new CSG.Path2D([ [10,10], [-10,10], [-20,0], [-10,-10], [10,-10] ], /*closed=*/true).
         rectangularExtrude(1, 3, 10).translate([0,-15,0])
   );
}

