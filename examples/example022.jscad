// -- Example 022

function main() {
   var w = new Array();
   
   w.push( sphere() );
   w.push( cube(2).translate([2,-1,0]) );
   w.push( cylinder({r1:1,r2:0,h:2}).translate([-3,0,0]) );

   return union(w).scale(10);
}
