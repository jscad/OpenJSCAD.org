// Example 025: rectangular_extrude()

function main() {
   return union( 
      // openscade like
      rectangular_extrude([ [0,0], [10,0], [0,10] ], {w: 1, h: 3, edges: 3, closed: false}),
      rectangular_extrude([ [0,0], [10,0], [0,10] ], {w: 1, h: 3, edges: 5, closed: true}).translate([0,15,0]),

      // object-oriented
      new CSG.Path2D([ [10,10], [-10,10], [-10,-10], [10,-10] ], true).
         rectangularExtrude(1, 3, 10, true).translate([0,-15,0])
   );
}

