// -- 3D primitives (OpenSCAD like notion)
import { CSG, CAG } from '../csg'
import { circle } from './primitives2d'
import { rotate_extrude } from './extrusion'

export function cube(p) {
   var s = 1, v = null, off = [0,0,0], round = false, r = 0, fn = 8;
   if(p&&p.length) v = p;
   if(p&&p.size&&p.size.length) v = p.size;        // { size: [1,2,3] }
   if(p&&p.size&&!p.size.length) s = p.size;       // { size: 1 }
   //if(p&&!p.size&&!p.length&&p.center===undefined&&!p.round&&!p.radius) s = p;      // (2)
   if(p&&(typeof p!='object')) s = p;      // (2)
   if(p&&p.round==true) { round = true, r = v&&v.length?(v[0]+v[1]+v[2])/30:s/10}
   if(p&&p.radius) { round = true, r = p.radius; }
   if(p&&p.fn) fn = p.fn;              // applies in case of round: true

   var x = s, y = s, z = s;
   if(v&&v.length) {
      x = v[0], y = v[1], z = v[2];
   }
   off = [x/2,y/2,z/2];       // center: false default
   var o = round?
      CSG.roundedCube({radius:[x/2,y/2,z/2], roundradius:r, resolution: fn}):
      CSG.cube({radius:[x/2,y/2,z/2]});
   if(p&&p.center&&p.center.length) {
      off = [p.center[0]?0:x/2, p.center[1]?0:y/2,p.center[2]?0:z/2];
   } else if(p&&p.center==true) {
      off = [0,0,0];
   } else if(p&&p.center==false) {
      off = [x/2,y/2,z/2];
   }
   if(off[0]||off[1]||off[2]) o = o.translate(off);
   //if(v&&v.length) o = o.scale(v);      // we don't scale afterwards, we already created box with the correct size
   return o;
}

export function sphere(p) {
   var r = 1;
   var fn = 32;
   var off = [0,0,0];
   var type = 'normal';

   //var zoff = 0; // sphere() in openscad has no center:true|false
   if(p&&p.r) r = p.r;
   if(p&&p.fn) fn = p.fn;
   if(p&&p.type) type = p.type;
   //if(p&&!p.r&&!p.fn&&!p.type) r = p;
   if(p&&(typeof p!='object')) r = p;
   off = [0,0,0];       // center: false (default)

   var o;
   if(type=='geodesic')
      o = geodesicSphere(p);
   else
      o = CSG.sphere({radius:r,resolution:fn});

   if(p&&p.center&&p.center.length) {         // preparing individual x,y,z center
      off = [p.center[0]?0:r,p.center[1]?0:r,p.center[2]?0:r];
   } else if(p&&p.center==true) {
      off = [0,0,0];
   } else if(p&&p.center==false) {
      off = [r,r,r];
   }
   if(off[0]||off[1]||off[2]) o = o.translate(off);
   return o;
}

export function geodesicSphere(p) {
   var r = 1, fn = 5;

   var ci = [              // hard-coded data of icosahedron (20 faces, all triangles)
      [0.850651,0.000000,-0.525731],
      [0.850651,-0.000000,0.525731],
      [-0.850651,-0.000000,0.525731],
      [-0.850651,0.000000,-0.525731],
      [0.000000,-0.525731,0.850651],
      [0.000000,0.525731,0.850651],
      [0.000000,0.525731,-0.850651],
      [0.000000,-0.525731,-0.850651],
      [-0.525731,-0.850651,-0.000000],
      [0.525731,-0.850651,-0.000000],
      [0.525731,0.850651,0.000000],
      [-0.525731,0.850651,0.000000]];

   var ti = [ [0,9,1], [1,10,0], [6,7,0], [10,6,0], [7,9,0], [5,1,4], [4,1,9], [5,10,1], [2,8,3], [3,11,2], [2,5,4],
      [4,8,2], [2,11,5], [3,7,6], [6,11,3], [8,7,3], [9,8,4], [11,10,5], [10,11,6], [8,9,7]];

   var geodesicSubDivide = function(p,fn,off) {
      var p1 = p[0], p2 = p[1], p3 = p[2];
      var n = off;
      var c = [];
      var f = [];

      //           p3
      //           /\
      //          /__\     fn = 3
      //      i  /\  /\
      //        /__\/__\       total triangles = 9 (fn*fn)
      //       /\  /\  /\
      //     0/__\/__\/__\
      //    p1 0   j      p2

      for(var i=0; i<fn; i++) {
         for(var j=0; j<fn-i; j++) {
            var t0 = i/fn;
            var t1 = (i+1)/fn;
            var s0 = j/(fn-i);
            var s1 = (j+1)/(fn-i);
            var s2 = fn-i-1?j/(fn-i-1):1;
            var q = [];

            q[0] = mix3(mix3(p1,p2,s0),p3,t0);
            q[1] = mix3(mix3(p1,p2,s1),p3,t0);
            q[2] = mix3(mix3(p1,p2,s2),p3,t1);

            // -- normalize
            for(var k=0; k<3; k++) {
               var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
               for(var l=0; l<3; l++) {
                  q[k][l] /= r;
               }
            }
            c.push(q[0],q[1],q[2]);
            f.push([n,n+1,n+2]); n += 3;

            if(j<fn-i-1) {
               var s3 = fn-i-1?(j+1)/(fn-i-1):1;
               q[0] = mix3(mix3(p1,p2,s1),p3,t0);
               q[1] = mix3(mix3(p1,p2,s3),p3,t1);
               q[2] = mix3(mix3(p1,p2,s2),p3,t1);

               // -- normalize
               for(var k=0; k<3; k++) {
                  var r = Math.sqrt(q[k][0]*q[k][0]+q[k][1]*q[k][1]+q[k][2]*q[k][2]);
                  for(var l=0; l<3; l++) {
                     q[k][l] /= r;
                  }
               }
               c.push(q[0],q[1],q[2]);
               f.push([n,n+1,n+2]); n += 3;
            }
         }
      }
      return { points: c, triangles: f, off: n };
   }

   var mix3 = function(a,b,f) {
      var _f = 1-f;
      var c = [];
      for(var i=0; i<3; i++) {
         c[i] = a[i]*_f+b[i]*f;
      }
      return c;
   }

   if(p) {
      if(p.fn) fn = Math.floor(p.fn/6);
      if(p.r) r = p.r;
   }

   if(fn<=0) fn = 1;

   var q = [];
   var c = [], f = [];
   var off = 0;

   for(var i=0; i<ti.length; i++) {
      var g = geodesicSubDivide([ ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]] ],fn,off);
      c = c.concat(g.points);
      f = f.concat(g.triangles);
      off = g.off;
   }
   return polyhedron({points: c, triangles: f}).scale(r);
}

export function cylinder(p) {
   var r1 = 1, r2 = 1, h = 1, fn = 32, round = false; var a = arguments;
   var off = [0,0,0];
   if(p&&p.d) {
      r1 = r2 = p.d/2;
   }
   if(p&&p.r) {
      r1 = p.r; r2 = p.r;
   }
   if(p&&p.h) {
      h = p.h;
   }
   if(p&&(p.r1||p.r2)) {
      r1 = p.r1; r2 = p.r2; if(p.h) h = p.h;
   }
   if(p&&(p.d1||p.d2)) {
      r1 = p.d1/2; r2 = p.d2/2;
   }

   if(a&&a[0]&&a[0].length) {
      a = a[0]; r1 = a[0]; r2 = a[1]; h = a[2]; if(a.length==4) fn = a[3];
   }
   if(p&&p.fn) fn = p.fn;
   //if(p&&p.center==true) zoff = -h/2;
   if(p&&p.round==true) round = true;
   var o;
   if(p&&(p.start&&p.end)) {
      o = round?
         CSG.roundedCylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn}):
         CSG.cylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn});
   } else {
      o = round?
         CSG.roundedCylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn}):
         CSG.cylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn});
      var r = r1>r2?r1:r2;
      if(p&&p.center&&p.center.length) {         // preparing individual x,y,z center
         off = [p.center[0]?0:r,p.center[1]?0:r,p.center[2]?-h/2:0];
      } else if(p&&p.center==true) {
         off = [0,0,-h/2];
      } else if(p&&p.center==false) {
         off = [0,0,0];
      }
      if(off[0]||off[1]||off[2]) o = o.translate(off);
   }
   return o;
}

export function torus(p) {
   var ri = 1, ro = 4, fni = 16, fno = 32, roti = 0;
   if(p) {
      if(p.ri) ri = p.ri;
      if(p.fni) fni = p.fni;
      if(p.roti) roti = p.roti;
      if(p.ro) ro = p.ro;
      if(p.fno) fno = p.fno;
   }
   if(fni<3) fni = 3;
   if(fno<3) fno = 3;
   var c = circle({r:ri,fn:fni,center:true});
   if(roti) c = c.rotateZ(roti);
   return rotate_extrude({fn:fno},c.translate([ro,0,0]));
}

export function polyhedron(p) {
   var pgs = [];
   var ref = p.triangles||p.polygons;
   var colors = p.colors||null;

   for(var i=0; i<ref.length; i++) {
      var pp = [];
      for(var j=0; j<ref[i].length; j++) {
         pp[j] = p.points[ref[i][j]];
      }

      var v = [];
      for(j=ref[i].length-1; j>=0; j--) {       // --- we reverse order for examples of OpenSCAD work
         v.push(new CSG.Vertex(new CSG.Vector3D(pp[j][0],pp[j][1],pp[j][2])));
      }
      var s = CSG.Polygon.defaultShared;
      if (colors && colors[i]) {
         s = CSG.Polygon.Shared.fromColor(colors[i]);
      }
      pgs.push(new CSG.Polygon(v,s));
   }
   var r = CSG.fromPolygons(pgs);
   return r;
}
