n = 11;

a02 = function() {
   b = function() { 
      var o = [];
      for(var i=0; i<8; i++) {
         o.push(cube([4,1,1]).translate([1,-0.5,-0.5]).rotateZ(i/8*360));
      }
      o.push(sphere({r:1.2, center:true}));
      return union(o);
   }
   return b();
};

