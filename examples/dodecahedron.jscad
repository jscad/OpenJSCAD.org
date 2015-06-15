// title      : Dodecahedron
// author     : OpenSCAD, adapted by Rene K. Mueller
// license    : MIT License
// description: testing dodecahedron() function
// file       : dodecahedron.jscad

function dodecahedron(h) {  // from http://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Commented_Example_Projects
   var c = cube({ size: [2,2,1], center: true });

   for(var i=0; i<=4; i++) { // loop i from 0 to 4, and intersect results
      // make a cube, rotate it 116.565 degrees around the X axis,
      // then 72*i around the Z axis
      c = c.intersect(
         cube({size: [2,2,1], center: true}).
         rotateX(116.565).
         rotateZ(72*i)
      );
   }
   return scale([h,h,h],c); // scale by height parameter
}

function main() {
   return dodecahedron(30);
}

