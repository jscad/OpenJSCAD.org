// openscad.js, a few functions to simplify coding OpenSCAD-like
//    written by Rene K. Mueller <spiritdude@gmail.com>, License: GPLv2
//
// Version: 0.011
//
// Description:
// Helping to convert OpenSCAD .scad files to OpenJSCad .jscad files with 
// little editing, can be used at
//     http://joostn.github.com/OpenJsCad/processfile.html
//
// and has been integrated at
//     http://openjscad.org/
//
// History:
// 2013/03/18: 0.011: import of STL (binary / ASCII), polyhedron() implemented, better blend between browser & nodejs
// 2013/03/15: 0.010: circle(), square(), polygon() (partially) and linear_extrude() implemented
// 2013/03/13: 0.009: adding include() for web-gui
// 2013/03/12: 0.008: covering most mathematical function of OpenSCAD in JS as well
// 2013/03/11: 0.007: most function transforming CSG now take array as well, more functions for OpenSCAD-alike behaviour
// 2013/03/10: 0.006: colored intersection() & difference(), added mirror(), cylinder supports start/end coordinates too
// 2013/03/04: 0.005: intersect() -> intersection(), sin, cos, asin, acos included, more examples 
// 2013/03/02: 0.004: better install, examples/, etc refinements (working on 2d primitives)
// 2013/03/01: 0.003: example.jscad vs example.scad, openscad.js/.jscad split up, and openjscad cli in nodejs implemented
// 2013/02/28: 0.002: center:false default
// 2013/02/27: 0.001: first version, center: true|false support
//
// original .scad file:
// union() {
//       //cube(size=[30,30,0.1],center=true);
//       translate([3,0,0]) cube();
//       difference() {
//          rotate([0,-45,0]) cube(size=[8,7,3],center=true);
//          sphere(r=3,$fn=20,center=true);
//       }
//       translate([10,5,5]) scale([0.5,1,2]) sphere(r=5,$fn=50);
//       translate([-15,0,0]) cylinder(r1=2,r2=0,h=10,$fn=20);
//      
//    for(i=[0:19]) {
//       rotate([0,i/20*360,0]) translate([i,0,0]) rotate([0,i/20*90,i/20*90,0]) cube(size=[1,1.2,.5],center=true);
//    }
// }

// function main() {  // -- the same in .jscad :-)
//    var cubes = new Array();
//    for(i=0; i<20; i++) {
//       cubes[i] = rotate([0,i/20*360,0], translate([i,0,0], rotate([0,i/20*90,i/20*90,0], cube({size:[1,1.2,.5],center:true}))));
//    }
//    return union(
//       //cube({size:[30,30,0.1],center:true}),
//       translate([3,0,0],cube()),
//       difference(
//          rotate([0,-45,0], cube({size:[8,7,3],center:true})),
//          sphere({r:3,fn:20,center:true})
//       ),
//       translate([10,5,5], scale([0.5,1,2], sphere({r:5,fn:50}))),
//       translate([-15,0,0], cylinder({r1:2,r2:0,h:10,fn:20})),
//       cubes
//       //translate([0,5,0], linear_extrude({height:10, center: true, twist: 100, slices: 50}, translate([2,0,0], circle(1))))
//    );
// }

// wrapper functions for OpenJsCAD & OpenJSCAD.org

// -- 3D operations (OpenSCAD like notion)

function union() { 
   var o,i=0,a=arguments; 
   if(a[0].length) a = a[0]; 
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]); 
   } 
   return o; 
}

function difference() { 
   var o,i=0,a=arguments; 
   if(a[0].length) a = a[0]; 
   for(o=a[i++]; i<a.length; i++) { 
      o = o.subtract(a[i].setColor(1,1,0));     // -- color the cuts
   } 
   return o; 
}

function intersection() { 
   var o,i=0,a=arguments; 
   if(a[0].length) a = a[0]; 
   for(o=a[i++]; i<a.length; i++) { 
      o = o.intersect(a[i].setColor(1,1,0));    // -- color the cuts
   } 
   return o; 
}

// -- 3D primitives (OpenSCAD like notion)

function cube(p) { 
   var s = 1, v, off = 0;
   if(p&&p.length) v = p;		
   if(p&&p.size&&p.size.length) v = p.size;
   if(p&&p.size&&!p.size.length) s = p.size;
   if(p&&!p.size&&!p.length&&p.center===undefined) s = p;
   off = s/2;
   if(p&&p.center==true) off = 0;
   var o = CSG.cube({radius:s/2});
   if(off) o = o.translate([off,off,off]);
   if(v&&v.length) o = o.scale(v);
   return o;
}

function sphere(p) {
   var r = 1;
   var fn = 32;
   //var zoff = 0; // sphere() in openscad has no center:true|false
   if(p&&p.r) r = p.r;
   if(p&&p.fn) fn = p.fn;
   if(p&&!p.r&&!p.fn) r = p;
   //zoff = r;
   //if(p&&p.center==true) zoff = 0;
   var o = CSG.sphere({radius:r,resolution:fn});
   //if(zoff) o = o.translate([0,0,zoff]);
   return o;
}

function cylinder(p) {
   var r1 = 1, r2 = 1, h = 1, fn = 32; var a = arguments;
   var zoff = 0;
   if(p&&p.r) {
      r1 = p.r; r2 = p.r; if(p.h) h = p.h;
   }
   if(p&&(p.r1||p.r2)) {
      r1 = p.r1; r2 = p.r2; if(p.h) h = p.h;
   } 
   if(a&&a[0].length) {
      a = a[0]; r1 = a[0]; r2 = a[1]; h = a[2]; if(a.length==4) fn = a[3];
   }
   if(p&&p.fn) fn = p.fn;
   if(p&&p.center==true) zoff = -h/2;
   var o;
   if(p&&(p.start&&p.end)) {
      o = CSG.cylinder({start:p.start,end:p.end,radiusStart:r1,radiusEnd:r2,resolution:fn});
   } else {
      o = CSG.cylinder({start:[0,0,0],end:[0,0,h],radiusStart:r1,radiusEnd:r2,resolution:fn});
      if(zoff) o = o.translate([0,0,zoff]);
   }
   return o;
}

function polyhedron(p) { 
   //console.log("polyhedron() not yet implemented"); 
   var pgs = [];
   for(var i=0; i<p.triangles.length; i++) {
      var pp = []; //new Array();
      pp[0] = p.points[p.triangles[i][0]];
      pp[1] = p.points[p.triangles[i][1]];
      pp[2] = p.points[p.triangles[i][2]];
      // --- we reverse order to examples of OpenSCAD work
      pgs.push(new CSG.Polygon([
         new CSG.Vertex(new CSG.Vector3D(pp[2][0],pp[2][1],pp[2][2])),
         new CSG.Vertex(new CSG.Vector3D(pp[1][0],pp[1][1],pp[1][2])),
         new CSG.Vertex(new CSG.Vector3D(pp[0][0],pp[0][1],pp[0][2]))
      ]));
   }
   var r = CSG.fromPolygons(pgs);
   //r.properties.polyhedron = new CSG.Properties();
   //r.properties.polyhedron.center = new CSG.Vector3D(center);
   //r.properties.sphere.facepoint = center.plus(xvector);
   return r;   
}
   
// -- 3D transformations (OpenSCAD like notion)

function translate() {      // v, obj or array
   var a = arguments, v = a[0], o, i = 1;
   if(a[1].length) { a = a[1]; i = 0; }
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   return o.translate(v); 
}

function scale() {         // v, obj or array
   var a = arguments, v = a[0], o, i = 1;
   if(a[1].length) { a = a[1]; i = 0; }
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   return o.scale(v); 
}

function rotate() { 
   var o,i,v, r = 1, a = arguments;
   if(!a[0].length) {        // rotate(r,[x,y,z],o)
      r = a[0];
      v = a[1];
      i = 2;
      if(a[2].length) { a = a[2]; i = 0; }
   } else {                   // rotate([x,y,z],o)
      v = a[0];
      i = 1;
      if(a[1].length) { a = a[1]; i = 0 }
   }
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   if(r!=1) {
      return o.rotateX(v[0]*r).rotateY(v[1]*r).rotateZ(v[2]*r);
   } else {
      return o.rotateX(v[0]).rotateY(v[1]).rotateZ(v[2]);
   }
}

function mirror(v,o) { 
   var a = arguments, v,o,i = 1;
   if(arguments.length==3) {  // mirror(r,[x,y,z],o)
      r = a[0];
      v = a[1];
      i = 2;
      if(a[2].length) { a = a[2]; i = 0; }
      
   } else {                   // rotate([x,y,z],o)
      v = a[0];
      i = 1;
      if(a[1].length) { a = a[1]; i = 0; }
   }
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   if(r!=1) {
      return o.mirrorX(v[0]*r).mirrorY(v[1]*r).mirrorZ(v[2]*r);
   } else {
      return o.mirrorX(v[0]).mirrorY(v[1]).mirrorZ(v[2]); 
   }
}

function expand(r,n,o) {
   return o.expand(r,n);
}
function contract(r,n,o) {
   return o.contract(r,n);
}

function multmatrix() {
   console.log("multmatrix() not yet implemented"); 
}

function color() {
   var o,i,a=arguments,c = a[0]; 
   if(a[1].length) { a = a[1], i = 0 } else { i = 1; }
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   return o.setColor(c[0],c[1],c[2]);
}

function minkowski() {
   console.log("minkowski() not yet implemented"); 
}

function hull() {
   console.log("hull() not yet implemented"); 
}

// -- 2D to 3D primitives (OpenSCAD like notion)

function linear_extrude(p,s) {
   //console.log("linear_extrude() not yet implemented");
   //return;
   var h = 1, off = 0, convexity = 10, twist = 0, slices = 10;
   if(p.height) h = p.height;
   //if(p.convexity) convexity = p.convexity;      // abandoned
   if(p.twist) twist = p.twist;
   if(p.slices) slices = p.slices;
   var o = s.extrude({offset:[0,0,h], twistangle:twist, twiststeps:slices});
   if(p.center==true) {
      var off, b = new Array;
      b = o.getBounds();      // b[0] = min, b[1] = max
      off = b[1].plus(b[0]);
      off = off.times(-0.5);
      o = o.translate(off);
   }
   return o;
}

function rotate_extrude(p,o) {
   console.log("rotate_extrude() not yet implemented");
   return o;
}

// -- 2D primitives (OpenSCAD like notion)

function square() {
   var v = [1,1], off; var a = arguments, p = a[0];
   if(p&&!p.size) v = [p,p];
   if(p.length) v = a, p = a[1];
   if(p&&p.size) v = p.size;

   off = [v[0]/2,v[1]/2];
   if(p&&p.center==true) off = [0,0];

   var o = CAG.rectangle({center:off,radius:[v[0]/2,v[1]/2]});

   return o;
}

function circle() {
   var r = 1, off, fn = 32; var a = arguments, p = a[0];
   if(p&&p.r) r = p.r;
   if(p&&p.fn) fn = p.fn;
   if(p&&!p.r) r = p;
   off = [r,r];
   if(p&&p.center==true) { off = [0,0]; } 
   var o = CAG.circle({center:off,radius:r,resolution:fn});
   return o;
}

function polygon(p) {  // array of po(ints) and pa(ths)
   var points = new Array();
   if(p.paths&&p.paths.length&&p.paths[0].length) {          // pa(th): [[0,1,2],[2,3,1]] (two paths)
      for(var j=0; j<p.paths.length; j++) {
         for(var i=0; i<p.paths[j].length; i++) {
            points[i] = p.points[p.paths[j][i]];
         }
      }
   } else if(p.paths&&p.paths.length) {                 // pa(th): [0,1,2,3,4] (single path)
      for(var i=0; i<p.paths.length; i++) {
         points[i] = p.points[p.paths[i]];
      }
   } else {                               // pa(th) = po(ints)
      if(p.length) {
         points = p;
      } else {
         points = p.points;
      }
   }
   return CAG.fromPoints(points);
}

function triangle() {         // -- new addition
   var a = arguments;
   if(a[0]&&a[0].length) a = a[0];
   var o = CAG.fromPoints(a);
   return o;
}

// -- Math functions (360 deg based vs 2pi)

function sin(a) {
   return Math.sin(a/360*Math.PI*2);
}
function cos(a) {
   return Math.cos(a/360*Math.PI*2);
}
function asin(a) {
   return Math.asin(a)/(Math.PI*2)*360;
}
function acos(a) {
   return Math.acos(a)/(Math.PI*2)*360;
}
function tan(a) {
   return Math.tan(a/360*Math.PI*2);
}
function atan(a) {
   return Math.atan(a)/(Math.PI*2)*360;
}
function atan2(a,b) {
   return Math.atan2(a,b)/(Math.PI*2)*360;
}
function ceil(a) {
   return Math.ceil(a);
}
function floor(a) {
   return Math.floor(a);
}
function abs(a) {
   return Math.abs(a);
}
function min(a,b) {
   return a<b?a:b;
}
function max(a,b) {
   return a>b?a:b;
}
function rands(min,max,vn,seed) {
   // -- seed is ignored for now, FIX IT (requires reimplementation of random())
   //    see http://stackoverflow.com/questions/424292/how-to-create-my-own-javascript-random-number-generator-that-i-can-also-set-the
   var v = new Array(vn);
   for(var i=0; i<vn; i++) {
      v[i] = Math.random()*(max-min)+min;
   }
}
function log(a) {
   return Math.log(a);
}
function lookup(ix,v) {
   var r = 0;
   for(var i=0; i<v.length; i++) {
      var a0 = v[i];
      if(a0[0]>=ix) {
         i--;
         a0 = v[i];
         var a1 = v[i+1];
         var m = 0;
         if(a0[0]!=a1[0]) {
            m = abs((ix-a0[0])/(a1[0]-a0[0]));
         }
         //echo(">>",i,ix,a0[0],a1[0],";",m,a0[1],a1[1]);
         if(m>0) {
            r = a0[1]*(1-m)+a1[1]*m;
         } else {
            r = a0[1];
         }
         return r;
      } 
   }
   return r;
}
function pow(a,b) {
   return Math.pow(a,b);
}
function sign(a) {
   return a<0?-1:(a>1?1:0);
}
function sqrt(a) {
   return Math.sqrt(a);
}
function round(a) {
   return floor(a+0.5)
}

function echo() {
   var s = "", a = arguments;
   for(var i=0; i<a.length; i++) {
      if(i) s += ", ";
      s += a[i];
   }
   if(typeof OpenJsCad !=='undefined') {
      OpenJsCad.log(s);
   } else {
      console.log(s);
   }
}

function status(s) {
   if(typeof document !== 'undefined') {
      document.getElementById('statusspan').innerHTML = s;
   } else {
      echo(s);
   }
}

// --------------------------------------------------------------------------------------------

// STL function from http://jsfiddle.net/Riham/yzvGD/35/ 
// CC BY-SA by Riham
// changes by Rene K. Mueller <spiritdude@gmail.com>
// 2013/03/18: renamed functions, creating .jscad source direct via polyhedron()

function parseSTL(stl,fn) {
   var isAscii = true;

   for (var i = 0; i < stl.length; i++) {
      if (stl[i].charCodeAt(0) == 0) {
         isAscii = false;
         break;
      }
   }
   var o;
   if(!isAscii) {
      o = parseBinarySTL(stl,fn);
   } else {
      o = parseAsciiSTL(stl,fn);
   }
   return o;
}

function parseBinarySTL(stl,fn) {
    // -- This makes more sense if you read http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL
    var vertices = [];
    var triangles = [];
    var normals = [];
    var vertexIndex = 0;
    var converted = 0;
    var br = new BinaryReader(stl);
    
    br.seek(80); //Skip header
    //for(var i=0; i<80; i++) 
    //   br.readInt8();
      
    var totalTriangles = br.readUInt32(); //Read # triangles

    for (var tr = 0; tr < totalTriangles; tr++) {
        //if(tr%100==0) status('stl importer: converted '+converted+' out of '+totalTriangles+' triangles');
        /*
             REAL32[3] . Normal vector
             REAL32[3] . Vertex 1
             REAL32[3] . Vertex 2
             REAL32[3] . Vertex 3
                UINT16 . Attribute byte count */

        // -- Parse normal
        var no = []; no.push(br.readFloat()); no.push(br.readFloat()); no.push(br.readFloat());

        // -- Parse every 3 subsequent floats as a vertex
        var v1 = []; v1.push(br.readFloat()); v1.push(br.readFloat()); v1.push(br.readFloat());
        var v2 = []; v2.push(br.readFloat()); v2.push(br.readFloat()); v2.push(br.readFloat());
        var v3 = []; v3.push(br.readFloat()); v3.push(br.readFloat()); v3.push(br.readFloat());
   
        // -- every 3 vertices create a triangle.
        var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++);

        br.readUInt16();

        // -- Add 3 vertices for every triangle
        // -- TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
        {  // checking cw vs ccw: 
           // E1 = B - A
           // E2 = C - A
           // test = dot( Normal, cross( E1, E2 ) )
           // test > 0: cw, test < 0 : ccw
           var w1 = new CSG.Vector3D(v1);
           var w2 = new CSG.Vector3D(v2);
           var w3 = new CSG.Vector3D(v3);
           var e1 = w2.minus(w1);
           var e2 = w3.minus(w1);
           var t = new CSG.Vector3D(no).dot(e1.cross(e2));
           if(t>0) {    // 1,2,3 -> 3,2,1 
              var tmp = v3;
              v3 = v1;
              v1 = tmp;
           }
        }
        vertices.push(v1);
        vertices.push(v2);
        vertices.push(v3);
        triangles.push(triangle);
        normals.push(no);
        converted++;
    }
    var src = "// OpenJSCAD.org: stl importer (binary) '"+fn+"'\n\n";
    src += "// objects: 1\n// object #1: triangles: "+totalTriangles+"\n";
    src += "function main() { return "; 
    src += vt2jscad(vertices,triangles,normals);
    src += "; }";
    return src;
}

function parseAsciiSTL(stl,fn) {
    var src = "// OpenJSCAD.org: stl importer (ascii) '"+fn+"'\n\n";
    var n = 0;
    var converted = 0;
     
    src += "function main() { return union(\n"; 
    // -- Find all models
    var objects = stl.split('endsolid');
    src += "// objects: "+(objects.length-1)+"\n";
    
    for (o = 1; o < objects.length; o++) {
        // -- Translation: a non-greedy regex for facet {...} endloop pattern 
        var patt = /\bfacet[\s\S]*?endloop/mgi;
        var vertices = [];
        var triangles = [];
        var normals = [];
        var vertexIndex = 0;

        match = stl.match(patt);
        if (match == null) continue;
        src += "// object #"+(o)+": triangles: "+match.length+"\n";
        for (var i = 0; i < match.length; i++) {
            //if(converted%100==0) status('stl to jscad: converted '+converted+' out of '+match.length+ ' facets');
            // -- 1 normal with 3 numbers, 3 different vertex objects each with 3 numbers:
            //var vpatt = /\bfacet\s+normal\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*outer\s+loop\s+vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s*vertex\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/mgi;
                                         // (-?\d+\.?\d*) -1.21223
                                         // (-?\d+\.?\d*[Ee]?[-+]?\d*)
            var vpatt = /\bfacet\s+normal\s+(\S+)\s+(\S+)\s+(\S+)\s+outer\s+loop\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s+vertex\s+(\S+)\s+(\S+)\s+(\S+)\s*/mgi;
            var v = vpatt.exec(match[i]);
            if (v == null) continue;
            if (v.length != 13) {
                echo("Failed to parse " + match[i]);
                break;
            }
            var skip = 0;
            for(var k=0; k<v.length; k++) {
               if(v[k]=='NaN') {
                  echo("bad normal or triangle vertice #"+converted+" "+k+": '"+v[k]+"', skipped");
                  skip++;
               }
            }
            if(skip) {
               continue;
            }
            if(0&&skip) {
               var j = 1+3;
               var v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]));
               var v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]));
               var v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]));
               echo("recalculate norm",v1,v2,v3);
               var w1 = new CSG.Vector3D(v1);
               var w2 = new CSG.Vector3D(v2);
               var w3 = new CSG.Vector3D(v3);
               var u = w1.minus(w3);
               var v = w1.minus(w2);
               var norm = u.cross(v).unit();
               j = 1;
               v[j++] = norm._x;
               v[j++] = norm._y;
               v[j++] = norm._z;
               skip = false;
            }
            var j = 1;
            var no = []; no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++])); no.push(parseFloat(v[j++]));
            var v1 = []; v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++])); v1.push(parseFloat(v[j++]));
            var v2 = []; v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++])); v2.push(parseFloat(v[j++]));
            var v3 = []; v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++])); v3.push(parseFloat(v[j++]));
            var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++);

            // -- Add 3 vertices for every triangle
            //    TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
            if(skip==0) {  // checking cw vs ccw
               // E1 = B - A
               // E2 = C - A
               // test = dot( Normal, cross( E1, E2 ) )
               // test > 0: cw, test < 0: ccw
               var w1 = new CSG.Vector3D(v1);
               var w2 = new CSG.Vector3D(v2);
               var w3 = new CSG.Vector3D(v3);
               var e1 = w2.minus(w1);
               var e2 = w3.minus(w1);
               var t = new CSG.Vector3D(no).dot(e1.cross(e2));
               if(t>0) {      // 1,2,3 -> 3,2,1
                  var tmp = v3;
                  v3 = v1;
                  v1 = tmp;
               }
            }
            vertices.push(v1);
            vertices.push(v2);
            vertices.push(v3);
            normals.push(no);
            triangles.push(triangle);
            converted++;
        }
        if(n++) src += ",";
        src += vt2jscad(vertices,triangles,normals);
    }
    src += "); }\n";
    return src;
}

function vt2jscad(v,t,n) {
   var src = '', j;
   src += "polyhedron({ points: [";
   for(var i=0,j=0; i<v.length; i++) {
      if(j++) src += ",  ";
      src += "\t["+v[i]+"]\n"; //.join(", ");
   }
   src += "], triangles: [";
   for(var i=0,j=0; i<t.length; i++) {
      if(j++) src += ",  ";
      src += "\t["+t[i]+"]\n"; //.join(', ');
   }
   src += "] })\n";
   return src;
   //return polyhedron({points:vertices, triangles: triangles});
}

// BinaryReader
// Refactored by Vjeux <vjeuxx@gmail.com>
// http://blog.vjeux.com/2010/javascript/javascript-binary-reader.html

// Original
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/binary-parser [rev. #1]

BinaryReader = function (data) {
   this._buffer = data;
   this._pos = 0;
};

BinaryReader.prototype = {

   /* Public */

   readInt8:   function (){ return this._decodeInt(8, true); },
   readUInt8:  function (){ return this._decodeInt(8, false); },
   readInt16:  function (){ return this._decodeInt(16, true); },
   readUInt16: function (){ return this._decodeInt(16, false); },
   readInt32:  function (){ return this._decodeInt(32, true); },
   readUInt32: function (){ return this._decodeInt(32, false); },

   readFloat:  function (){ return this._decodeFloat(23, 8); },
   readDouble: function (){ return this._decodeFloat(52, 11); },

   readChar:   function () { return this.readString(1); },
   readString: function (length) {
      this._checkSize(length * 8);
      var result = this._buffer.substr(this._pos, length);
      this._pos += length;
      return result;
   },

   seek: function (pos) {
      this._pos = pos;
      this._checkSize(0);
   },

   getPosition: function () {
      return this._pos;
   },

   getSize: function () {
      return this._buffer.length;
   },


   /* Private */

   _decodeFloat: function(precisionBits, exponentBits){
      var length = precisionBits + exponentBits + 1;
      var size = length >> 3;
      this._checkSize(length);

      var bias = Math.pow(2, exponentBits - 1) - 1;
      var signal = this._readBits(precisionBits + exponentBits, 1, size);
      var exponent = this._readBits(precisionBits, exponentBits, size);
      var significand = 0;
      var divisor = 2;
      var curByte = 0; //length + (-precisionBits >> 3) - 1;
      do {
         var byteValue = this._readByte(++curByte, size);
         var startBit = precisionBits % 8 || 8;
         var mask = 1 << startBit;
         while (mask >>= 1) {
            if (byteValue & mask) {
               significand += 1 / divisor;
            }
            divisor *= 2;
         }
      } while (precisionBits -= startBit);

      this._pos += size;

      return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
         : (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
         : Math.pow(2, exponent - bias) * (1 + significand) : 0);
   },

   _decodeInt: function(bits, signed){
      var x = this._readBits(0, bits, bits / 8), max = Math.pow(2, bits);
      var result = signed && x >= max / 2 ? x - max : x;

      this._pos += bits / 8;
      return result;
   },

   //shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
   _shl: function (a, b){
      for (++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
      return a;
   },

   _readByte: function (i, size) {
      return this._buffer.charCodeAt(this._pos + size - i - 1) & 0xff;
   },

   _readBits: function (start, length, size) {
      var offsetLeft = (start + length) % 8;
      var offsetRight = start % 8;
      var curByte = size - (start >> 3) - 1;
      var lastByte = size + (-(start + length) >> 3);
      var diff = curByte - lastByte;

      var sum = (this._readByte(curByte, size) >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1);

      if (diff && offsetLeft) {
         sum += (this._readByte(lastByte++, size) & ((1 << offsetLeft) - 1)) << (diff-- << 3) - offsetRight; 
      }

      while (diff) {
         sum += this._shl(this._readByte(lastByte++, size), (diff-- << 3) - offsetRight);
      }

      return sum;
   },

   _checkSize: function (neededBits) {
      if (!(this._pos + Math.ceil(neededBits / 8) < this._buffer.length)) {
         //throw new Error("Index out of bound");
      }
   }
};

// -------------------------------------------------------------------------------------------------

function include(fn) {          // doesn't work yet ... as we run in a blob and XHR aren't permitted
   var xhr = new XMLHttpRequest();
   //OpenJsCad.log(">>>"+previousFilename);
   xhr.open("GET", fn, true);
   xhr.onload = function() {
      return eval(this.responseText);
   };
   xhr.error = function() {
      echo("ERROR: could not include(\""+fn+"\")");
   }
   xhr.send();
}

if(typeof module !== 'undefined') {    // we are used as module in nodejs require()
   var CSG = require(global.lib+'./csg.js').CSG;
   //console.log("lib="+global.lib);
   module.exports = { 
      // -- list all functions we export
      parseSTL: function(stl,fn) { return parseSTL(stl,fn); } 
   };
}

