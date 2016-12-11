// -- 2D to 3D primitives (OpenSCAD like notion)

function linear_extrude(p,s) {
   //console.log("linear_extrude() not yet implemented");
   //return;
   var h = 1, off = 0, /* convexity = 10,*/ twist = 0, slices = 10;
   if(p.height) h = p.height;
   //if(p.convexity) convexity = p.convexity;      // abandoned
   if(p.twist) twist = p.twist;
   if(p.slices) slices = p.slices;
   var o = s.extrude({offset:[0,0,h], twistangle:twist, twiststeps:slices});
   if(p.center==true) {
      var b = new Array;
      b = o.getBounds();      // b[0] = min, b[1] = max
      off = b[1].plus(b[0]);
      off = off.times(-0.5);
      o = o.translate(off);
   }
   return o;
}

function rotate_extrude(p,o) {
   var fn = 32;
   if(arguments.length<2) {
      o = p;      // no switches, just an object
   } else if(p!==undefined) {
      fn = p.fn;
   }
   if(fn<3) fn = 3;
   var ps = [];
   for(var i=0; i<fn; i++) {
      // o.{x,y} -> rotate([0,0,i:0..360], obj->{o.x,0,o.y})
      for(var j=0; j<o.sides.length; j++) {
         // has o.sides[j].vertex{0,1}.pos (only x,y)
         var p = [];
         var m;

         m = new CSG.Matrix4x4.rotationZ(i/fn*360);
         p[0] = new CSG.Vector3D(o.sides[j].vertex0.pos.x,0,o.sides[j].vertex0.pos.y);
         p[0] = m.rightMultiply1x3Vector(p[0]);

         p[1] = new CSG.Vector3D(o.sides[j].vertex1.pos.x,0,o.sides[j].vertex1.pos.y);
         p[1] = m.rightMultiply1x3Vector(p[1]);

         m = new CSG.Matrix4x4.rotationZ((i+1)/fn*360);
         p[2] = new CSG.Vector3D(o.sides[j].vertex1.pos.x,0,o.sides[j].vertex1.pos.y);
         p[2] = m.rightMultiply1x3Vector(p[2]);

         p[3] = new CSG.Vector3D(o.sides[j].vertex0.pos.x,0,o.sides[j].vertex0.pos.y);
         p[3] = m.rightMultiply1x3Vector(p[3]);

         var p1 = new CSG.Polygon([
            new CSG.Vertex(p[0]),
            new CSG.Vertex(p[1]),
            new CSG.Vertex(p[2]),
            new CSG.Vertex(p[3]),      // we make a square polygon (instead of 2 triangles)
         ]);
         //var p2 = new CSG.Polygon([
         //   new CSG.Vertex(p[0]),
         //   new CSG.Vertex(p[2]),
         //   new CSG.Vertex(p[3]),
         //]);
         ps.push(p1);
         //ps.push(p2);
         //echo("i="+i,i/fn*360,"j="+j);
      }
   }
   return CSG.fromPolygons(ps);
}

function rectangular_extrude(pa,p) {
   var w = 1, h = 1, fn = 8, closed = false, round = true;
   if(p) {
      if(p.w) w = p.w;
      if(p.h) h = p.h;
      if(p.fn) fn = p.fn;
      if(p.closed!==undefined) closed = p.closed;
      if(p.round!==undefined) round = p.round;
   }
   return new CSG.Path2D(pa,closed).rectangularExtrude(w,h,fn,round);
}
