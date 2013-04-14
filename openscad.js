// openscad.js, a few functions to simplify coding OpenSCAD-like
//    written by Rene K. Mueller <spiritdude@gmail.com>, License: GPLv2
//
// Version: 0.018
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
// 2013/04/11: 0.018: added alpha supported to AMF export
// 2013/04/09: 0.017: added color()
// 2013/04/08: 0.016: added hull() which takes multiple 2d polygons (CAG)
// 2013/04/08: 0.015: individual center: [true,false,true] possible for cube(), sphere() and cylinder()
// 2013/04/05: 0.014: parseAMF(), experimental parseOBJ() and parseGCode()
// 2013/04/04: 0.013: cube({round: true}), cylinder({round: true}) added
// 2013/03/28: 0.012: rectangular_extrude() along 2d path, rotate_extrude() and torus() added
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

function JStoMeta(src) {
   var l = src.split(/\n/);
   var n = 0;
   var m = [];
   for(var i=0; ; i++) {
      if(l[i].match(/^\/\/\s*(\S[^:]+):\s*(\S.*)/)) {
         var k = RegExp.$1;
         var v = RegExp.$2;
         m[k] = v;
         n++;
      } else {
         if(i>5&&n==0)
            break;
         else if(n>0)
            break;
      }
   }
   return m;
}

function MetaToJS(m) {
   var s = "";
   for(var k in m) {
      s += "// "+k+": "+m[k]+"\n";
   }
   return s;
}

// wrapper functions for OpenJsCAD & OpenJSCAD.org

// color table from http://www.w3.org/TR/css3-color/

function color() {
   var map = {
   "black" : [ 0/255,0/255,0/255 ],
   "silver": [ 192/255,192/255,192/255 ],
   "gray"  : [ 128/255,128/255,128/255 ],
   "white" : [ 255/255,255/255,255/255 ],
   "maroon": [ 128/255,0/255,0/255 ],
   "red"   : [ 255/255,0/255,0/255 ],
   "purple": [ 128/255,0/255,128/255 ],
   "fuchsia": [ 255/255,0/255,255/255 ],
   "green" : [ 0/255,128/255,0/255 ],
   "lime"  : [ 0/255,255/255,0/255 ],
   "olive" : [ 128/255,128/255,0/255 ],
   "yellow": [ 255/255,255/255,0/255 ],
   "navy"  : [ 0/255,0/255,128/255 ],
   "blue"  : [ 0/255,0/255,255/255 ],
   "teal"  : [ 0/255,128/255,128/255 ],
   "aqua"  : [ 0/255,255/255,255/255 ],
   "aliceblue"   : [ 240/255,248/255,255/255 ],
   "antiquewhite"   : [ 250/255,235/255,215/255 ],
   "aqua"  : [ 0/255,255/255,255/255 ],
   "aquamarine"  : [ 127/255,255/255,212/255 ],
   "azure" : [ 240/255,255/255,255/255 ],
   "beige" : [ 245/255,245/255,220/255 ],
   "bisque"   : [ 255/255,228/255,196/255 ],
   "black" : [ 0/255,0/255,0/255 ],
   "blanchedalmond" : [ 255/255,235/255,205/255 ],
   "blue"  : [ 0/255,0/255,255/255 ],
   "blueviolet"  : [ 138/255,43/255,226/255 ],
   "brown" : [ 165/255,42/255,42/255 ],
   "burlywood"   : [ 222/255,184/255,135/255 ],
   "cadetblue"   : [ 95/255,158/255,160/255 ],
   "chartreuse"  : [ 127/255,255/255,0/255 ],
   "chocolate"   : [ 210/255,105/255,30/255 ],
   "coral" : [ 255/255,127/255,80/255 ],
   "cornflowerblue" : [ 100/255,149/255,237/255 ],
   "cornsilk" : [ 255/255,248/255,220/255 ],
   "crimson"  : [ 220/255,20/255,60/255 ],
   "cyan"  : [ 0/255,255/255,255/255 ],
   "darkblue" : [ 0/255,0/255,139/255 ],
   "darkcyan" : [ 0/255,139/255,139/255 ],
   "darkgoldenrod"  : [ 184/255,134/255,11/255 ],
   "darkgray" : [ 169/255,169/255,169/255 ],
   "darkgreen"   : [ 0/255,100/255,0/255 ],
   "darkgrey" : [ 169/255,169/255,169/255 ],
   "darkkhaki"   : [ 189/255,183/255,107/255 ],
   "darkmagenta" : [ 139/255,0/255,139/255 ],
   "darkolivegreen" : [ 85/255,107/255,47/255 ],
   "darkorange"  : [ 255/255,140/255,0/255 ],
   "darkorchid"  : [ 153/255,50/255,204/255 ],
   "darkred"  : [ 139/255,0/255,0/255 ],
   "darksalmon"  : [ 233/255,150/255,122/255 ],
   "darkseagreen"   : [ 143/255,188/255,143/255 ],
   "darkslateblue"  : [ 72/255,61/255,139/255 ],
   "darkslategray"  : [ 47/255,79/255,79/255 ],
   "darkslategrey"  : [ 47/255,79/255,79/255 ],
   "darkturquoise"  : [ 0/255,206/255,209/255 ],
   "darkviolet"  : [ 148/255,0/255,211/255 ],
   "deeppink" : [ 255/255,20/255,147/255 ],
   "deepskyblue" : [ 0/255,191/255,255/255 ],
   "dimgray"  : [ 105/255,105/255,105/255 ],
   "dimgrey"  : [ 105/255,105/255,105/255 ],
   "dodgerblue"  : [ 30/255,144/255,255/255 ],
   "firebrick"   : [ 178/255,34/255,34/255 ],
   "floralwhite" : [ 255/255,250/255,240/255 ],
   "forestgreen" : [ 34/255,139/255,34/255 ],
   "fuchsia"  : [ 255/255,0/255,255/255 ],
   "gainsboro"   : [ 220/255,220/255,220/255 ],
   "ghostwhite"  : [ 248/255,248/255,255/255 ],
   "gold"  : [ 255/255,215/255,0/255 ],
   "goldenrod"   : [ 218/255,165/255,32/255 ],
   "gray"  : [ 128/255,128/255,128/255 ],
   "green" : [ 0/255,128/255,0/255 ],
   "greenyellow" : [ 173/255,255/255,47/255 ],
   "grey"  : [ 128/255,128/255,128/255 ],
   "honeydew" : [ 240/255,255/255,240/255 ],
   "hotpink"  : [ 255/255,105/255,180/255 ],
   "indianred"   : [ 205/255,92/255,92/255 ],
   "indigo"   : [ 75/255,0/255,130/255 ],
   "ivory" : [ 255/255,255/255,240/255 ],
   "khaki" : [ 240/255,230/255,140/255 ],
   "lavender" : [ 230/255,230/255,250/255 ],
   "lavenderblush"  : [ 255/255,240/255,245/255 ],
   "lawngreen"   : [ 124/255,252/255,0/255 ],
   "lemonchiffon"   : [ 255/255,250/255,205/255 ],
   "lightblue"   : [ 173/255,216/255,230/255 ],
   "lightcoral"  : [ 240/255,128/255,128/255 ],
   "lightcyan"   : [ 224/255,255/255,255/255 ],
   "lightgoldenrodyellow" : [ 250/255,250/255,210/255 ],
   "lightgray"   : [ 211/255,211/255,211/255 ],
   "lightgreen"  : [ 144/255,238/255,144/255 ],
   "lightgrey"   : [ 211/255,211/255,211/255 ],
   "lightpink"   : [ 255/255,182/255,193/255 ],
   "lightsalmon" : [ 255/255,160/255,122/255 ],
   "lightseagreen"  : [ 32/255,178/255,170/255 ],
   "lightskyblue"   : [ 135/255,206/255,250/255 ],
   "lightslategray" : [ 119/255,136/255,153/255 ],
   "lightslategrey" : [ 119/255,136/255,153/255 ],
   "lightsteelblue" : [ 176/255,196/255,222/255 ],
   "lightyellow" : [ 255/255,255/255,224/255 ],
   "lime"  : [ 0/255,255/255,0/255 ],
   "limegreen"   : [ 50/255,205/255,50/255 ],
   "linen" : [ 250/255,240/255,230/255 ],
   "magenta"  : [ 255/255,0/255,255/255 ],
   "maroon"   : [ 128/255,0/255,0/255 ],
   "mediumaquamarine"  : [ 102/255,205/255,170/255 ],
   "mediumblue"  : [ 0/255,0/255,205/255 ],
   "mediumorchid"   : [ 186/255,85/255,211/255 ],
   "mediumpurple"   : [ 147/255,112/255,219/255 ],
   "mediumseagreen" : [ 60/255,179/255,113/255 ],
   "mediumslateblue"   : [ 123/255,104/255,238/255 ],
   "mediumspringgreen" : [ 0/255,250/255,154/255 ],
   "mediumturquoise"   : [ 72/255,209/255,204/255 ],
   "mediumvioletred"   : [ 199/255,21/255,133/255 ],
   "midnightblue"   : [ 25/255,25/255,112/255 ],
   "mintcream"   : [ 245/255,255/255,250/255 ],
   "mistyrose"   : [ 255/255,228/255,225/255 ],
   "moccasin" : [ 255/255,228/255,181/255 ],
   "navajowhite" : [ 255/255,222/255,173/255 ],
   "navy"  : [ 0/255,0/255,128/255 ],
   "oldlace"  : [ 253/255,245/255,230/255 ],
   "olive" : [ 128/255,128/255,0/255 ],
   "olivedrab"   : [ 107/255,142/255,35/255 ],
   "orange"   : [ 255/255,165/255,0/255 ],
   "orangered"   : [ 255/255,69/255,0/255 ],
   "orchid"   : [ 218/255,112/255,214/255 ],
   "palegoldenrod"  : [ 238/255,232/255,170/255 ],
   "palegreen"   : [ 152/255,251/255,152/255 ],
   "paleturquoise"  : [ 175/255,238/255,238/255 ],
   "palevioletred"  : [ 219/255,112/255,147/255 ],
   "papayawhip"  : [ 255/255,239/255,213/255 ],
   "peachpuff"   : [ 255/255,218/255,185/255 ],
   "peru"  : [ 205/255,133/255,63/255 ],
   "pink"  : [ 255/255,192/255,203/255 ],
   "plum"  : [ 221/255,160/255,221/255 ],
   "powderblue"  : [ 176/255,224/255,230/255 ],
   "purple"   : [ 128/255,0/255,128/255 ],
   "red"   : [ 255/255,0/255,0/255 ],
   "rosybrown"   : [ 188/255,143/255,143/255 ],
   "royalblue"   : [ 65/255,105/255,225/255 ],
   "saddlebrown" : [ 139/255,69/255,19/255 ],
   "salmon"   : [ 250/255,128/255,114/255 ],
   "sandybrown"  : [ 244/255,164/255,96/255 ],
   "seagreen" : [ 46/255,139/255,87/255 ],
   "seashell" : [ 255/255,245/255,238/255 ],
   "sienna"   : [ 160/255,82/255,45/255 ],
   "silver"   : [ 192/255,192/255,192/255 ],
   "skyblue"  : [ 135/255,206/255,235/255 ],
   "slateblue"   : [ 106/255,90/255,205/255 ],
   "slategray"   : [ 112/255,128/255,144/255 ],
   "slategrey"   : [ 112/255,128/255,144/255 ],
   "snow"  : [ 255/255,250/255,250/255 ],
   "springgreen" : [ 0/255,255/255,127/255 ],
   "steelblue"   : [ 70/255,130/255,180/255 ],
   "tan"   : [ 210/255,180/255,140/255 ],
   "teal"  : [ 0/255,128/255,128/255 ],
   "thistle"  : [ 216/255,191/255,216/255 ],
   "tomato"   : [ 255/255,99/255,71/255 ],
   "turquoise"   : [ 64/255,224/255,208/255 ],
   "violet"   : [ 238/255,130/255,238/255 ],
   "wheat" : [ 245/255,222/255,179/255 ],
   "white" : [ 255/255,255/255,255/255 ],
   "whitesmoke"  : [ 245/255,245/255,245/255 ],
   "yellow"   : [ 255/255,255/255,0/255 ],
   "yellowgreen" : [ 154/255,205/255,50/255 ] };

   var o, i = 1, a = arguments, c = a[0], alpha;

   if(a[0].length<4 && (a[i]*1-0)==a[i]) { alpha = a[i++]; }  // first argument rgb (no a), and next one is numeric?
   if(a[i].length) { a = a[i], i = 0; }                       // next arg an array, make it our main array to walk through
   if(typeof c == 'string')
      c = map[c.toLowerCase()];
   if(alpha!==undefined) 
      c = c.concat(alpha);
   for(o=a[i++]; i<a.length; i++) { 
      o = o.union(a[i]);
   } 
   return o.setColor(c);
}

// -- 3D operations (OpenSCAD like notion)

function group() {                              // experimental
   var o,i=0,a=arguments; 
   if(a[0].length) a = a[0]; 
   
   if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
      o = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
   } else {
      o = a[i++];                               
   }
   for(; i<a.length; i++) { 
      var obj = a[i];
      if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
         obj = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid:
      }
      o = o.unionForNonIntersecting(obj); 
   } 
   return o; 
}

function union() { 
   var o,i=0,a=arguments; 
   if(a[0].length) a = a[0]; 
   
   if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
      o = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid, note: do not a[i] = a[i].extrude()
   } else {
      o = a[i++];                               
   }
   for(; i<a.length; i++) { 
      var obj = a[i];
      if((typeof(a[i]) == "object") && (a[i] instanceof CAG)) {
         obj = a[i].extrude({offset: [0,0,0.1]});    // -- convert a 2D shape to a thin solid:
      }
      o = o.union(obj); 
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
   var s = 1, v = null, off = [0,0,0], round = false, r = 0, fn = 8;
   if(p&&p.length) v = p;		
   if(p&&p.size&&p.size.length) v = p.size;        // { size: [1,2,3] }
   if(p&&p.size&&!p.size.length) s = p.size;       // { size: 1 }
   if(p&&!p.size&&!p.length&&p.center===undefined&&!p.round&&!p.radius) s = p;      // (2)
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

function sphere(p) {
   var r = 1;
   var fn = 32;
   var off = [0,0,0];      
   //var zoff = 0; // sphere() in openscad has no center:true|false
   if(p&&p.r) r = p.r;
   if(p&&p.fn) fn = p.fn;
   if(p&&!p.r&&!p.fn) r = p;
   off = [0,0,0];       // center: false (default)

   var o = CSG.sphere({radius:r,resolution:fn});
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

function cylinder(p) {
   var r1 = 1, r2 = 1, h = 1, fn = 32, round = false; var a = arguments;
   var off = [0,0,0];
   if(p&&p.r) {
      r1 = p.r; r2 = p.r; 
   }
   if(p&&p.h) {
      h = p.h;
   }
   if(p&&(p.r1||p.r2)) {
      r1 = p.r1; r2 = p.r2; if(p.h) h = p.h;
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

function torus(p) {
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

function polyhedron(p) { 
   //console.log("polyhedron() not yet implemented"); 
   var pgs = [];
   var ref = p.triangles||p.polygons;
   
   for(var i=0; i<ref.length; i++) {
      var pp = []; 
      for(var j=0; j<ref[i].length; j++) {
         pp[j] = p.points[ref[i][j]];
      }

      var v = [];
      for(j=ref[i].length-1; j>=0; j--) {       // --- we reverse order for examples of OpenSCAD work
      //for(var j=0; j<ref[i].length-1; j++) {
         v.push(new CSG.Vertex(new CSG.Vector3D(pp[j][0],pp[j][1],pp[j][2])));
      }
      pgs.push(new CSG.Polygon(v));
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
      if(a[1].length) { a = a[1]; i = 0; }
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
   var a = arguments, v,o,i = 1, r = 0;
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
      return o.mirroredX(v[0]*r).mirroredY(v[1]*r).mirroredZ(v[2]*r);
   } else {
      return o.mirroredX(v[0]).mirroredY(v[1]).mirroredZ(v[2]); 
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

function minkowski() {
   console.log("minkowski() not yet implemented"); 
}

function hull() {
   var pts = [];

   var a = arguments;                     
   if(a[0].length) a = a[0];
   for(var i=0; i<a.length; i++) {              // extract all points of the CAG in the argument list
      var cag = a[i];
      if(!(cag instanceof CAG)) {
         echo("ERROR: hull() accepts only 2D forms / CAG");
         return;
      }
      for(var j=0; j<cag.sides.length; j++) {
         pts.push({ x:cag.sides[j].vertex0.pos.x, y:cag.sides[j].vertex0.pos.y });
      }
   }
   //echo(pts.length+" points in",pts);

   // from http://www.psychedelicdevelopment.com/grahamscan/
   //
   var ConvexHullPoint = function(i, a, d) {
      this.index = i;
      this.angle = a;
      this.distance = d;
   
      this.compare = function(p) {
         if (this.angle<p.angle)
            return -1;
         else if (this.angle>p.angle)
            return 1;
         else {
            if (this.distance<p.distance)
               return -1;
            else if (this.distance>p.distance)
               return 1;
         }
         return 0;
      }
   }
   
   var ConvexHull = function() {
      this.points = null;
      this.indices = null;
   
      this.getIndices = function() {
         return this.indices;
      }
   
      this.clear = function() {
         this.indices = null;
         this.points = null;
      }
   
      this.ccw = function(p1, p2, p3) {
         return (this.points[p2].x - this.points[p1].x)*(this.points[p3].y - this.points[p1].y) - (this.points[p2].y - this.points[p1].y)*(this.points[p3].x - this.points[p1].x);
      }
   
      this.angle = function(o, a) {
         //return Math.atan((this.points[a].y-this.points[o].y) / (this.points[a].x - this.points[o].x + 1e-5));
         return Math.atan2((this.points[a].y-this.points[o].y), (this.points[a].x - this.points[o].x));
      }
       
      this.distance = function(a, b) {
         return ((this.points[b].x-this.points[a].x)*(this.points[b].x-this.points[a].x)+(this.points[b].y-this.points[a].y)*(this.points[b].y-this.points[a].y));
      }
   
      this.compute = function(_points) {
         this.indices=null;
         if (_points.length<3)
            return;
         this.points=_points;
   
         // Find the lowest point
         var min = 0;
         for(var i = 1; i < this.points.length; i++) {
            if(this.points[i].y==this.points[min].y) {
               if(this.points[i].x<this.points[min].x)
                  min = i;
            }
            else if(this.points[i].y<this.points[min].y)
               min = i;
         }
   
         // Calculate angle and distance from base
         var al = new Array();
         var ang = 0.0;
         var dist = 0.0;
         for (i = 0; i<this.points.length; i++) {
            if (i==min)
               continue;
            ang = this.angle(min, i);
            if (ang<0)
               ang += Math.PI;
            dist = this.distance(min, i);
            al.push(new ConvexHullPoint(i, ang, dist));
         }
   
         al.sort(function (a, b) { return a.compare(b); });
   
         // Create stack
         var stack = new Array(this.points.length+1);
         var j = 2;
         for(i = 0; i<this.points.length; i++) {
            if(i==min)
               continue;
            stack[j] = al[j-2].index;
            j++;
         }
         stack[0] = stack[this.points.length];
         stack[1] = min;
   
         var tmp;
         var M = 2;
         for(i = 3; i<=this.points.length; i++) {
            while(this.ccw(stack[M-1], stack[M], stack[i]) <= 0)
               M--;
            M++;
            tmp = stack[i];
            stack[i] = stack[M];
            stack[M] = tmp;
         }
   
         this.indices = new Array(M);
         for (i = 0; i<M; i++) {
            this.indices[i] = stack[i+1];
         }
      }
   }

   var hull = new ConvexHull();

   hull.compute(pts);
   var indices = hull.getIndices();

   if(indices&&indices.length>0) {
      var ch = [];
      for(var i=0; i<indices.length; i++) {
         ch.push(pts[indices[i]]);
         //echo(pts[indices[i]]);
      }
      //echo(ch.length+" points out",ch);
      return CAG.fromPoints(ch);
      //return CAG.fromPointsNoCheck(ch);
   }
}


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
   var w = 1, h = 1, fn = 8, closed = true, round = true;
   if(p) {
      if(p.w) w = p.w;
      if(p.h) h = p.h;
      if(p.fn) fn = p.fn;
      if(p.closed!==undefined) closed = p.closed;
      if(p.round!==undefined) round = p.round;
   }
   return new CSG.Path2D(pa,closed).rectangularExtrude(w,h,fn,round);
}

// -- 2D primitives (OpenSCAD like notion)

function square() {
   var v = [1,1], off; var a = arguments, p = a[0];
   if(p&&!p.size) v = [p,p];
   if(p&&p.length) v = a[0], p = a[1];
   if(p&&p.size&&p.size.length) v = p.size;

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
   return floor(a+0.5);
}

function echo() {
   var s = "", a = arguments;
   for(var i=0; i<a.length; i++) {
      if(i) s += ", ";
      s += a[i];
   }
   if(typeof OpenJsCad !== 'undefined') {
      OpenJsCad.log(s);
   } else {
      //var t = (new Date()-global.time)/1000;
      //console.log(t,s);
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

// from http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
function rgb2hsl(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hsl2rgb(h, s, l){
    if(h.length) { l = h[2], s = h[1], h = h[0]; }
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r, g, b];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSV representation
 */
function rgb2hsv(r, g, b){
    if(r.length) { b = r[2], g = r[1], r = r[0]; }
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max == 0 ? 0 : d / max;

    if(max == min){
        h = 0; // achromatic
    }else{
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, v];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsv2rgb(h, s, v){
    if(h.length) { v = h[2], s = h[1], h = h[0]; }
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch(i % 6){
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [r, g, b];
}

// --------------------------------------------------------------------------------------------

function parseAMF(amf,fn) {      // http://en.wikipedia.org/wiki/Additive_Manufacturing_File_Format
   var xml, err = '';            // http://api.jquery.com/category/traversing/
   try {
      xml = $.parseXML(amf);
   } catch(e) {
      echo("XML parsing error:",e.message.substring(0,120)+"..");
      err += "XML parsing error / invalid XML";
   }
   var v = [];    // vertices
   var f = [];    // faces
   //var c = [];    // color settings (per face)
   var nv = 0, np = 0;
   var src = '', srci = '';

   srci = "\tvar pgs = [];\n";

   var meta = [];
   var metatag = $(xml).find('metadata');    // -- extract metadata
   metatag.each(function() {
      var el = $(this);
      meta[el.attr('type')] = el.text();
   });
   
   var obj = $(xml).find('object');
   obj.each(function() {
      var el = $(this);
      var mesh = el.find('mesh');
      mesh.each(function() {
         var el = $(this);
         var c = [];
         var co = el.find('color');
         var rgbm = [];
         if(co.length) {
            rgbm = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
            if(co.find('a').length) rgbm = rgbm.concat(co.find('a').first().text());
         }
         v = []; f = []; nv = 0;        // we create each individual polygon
         
         var vertices = el.find('vertices');
         var sn = nv;
         vertices.each(function() {
            var el = $(this);
            var vertex = el.find('vertex');
            vertex.each(function() {
               var el = $(this);
               var x = el.find('x').text();
               var y = el.find('y').text();
               var z = el.find('z').text();
               v.push([x,y,z]);
               nv++;
            });
         });
         var volume = el.find('volume');
         volume.each(function() {
            var el = $(this);
            var rgbv = [], co = el.find('color');
            if(co.length) {
               rgbv = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
               if(co.find('a').length) rgbv = rgbv.concat(co.find('a').first().text());
            }
            var triangle = el.find('triangle');
            triangle.each(function() {
               var el = $(this);
               var rgbt = [], co = el.find('color');
               if(co.length) {
                  rgbt = [co.find('r').first().text(), co.find('g').first().text(), co.find('b').first().text()];
                  if(co.find('a').length) rgbt = rgbt.concat(co.find('a').first().text());
               }
               var v1 = parseInt(el.find('v1').first().text()); // -- why: v1 might occur <v1>1</v1><map><v1>0</v1></map> -> find('v1') return '1'+'0' = '10'
               var v2 = parseInt(el.find('v2').first().text());
               var v3 = parseInt(el.find('v3').first().text());
               if(rgbm.length||rgbv.length||rgbt.length) 
                  c[f.length] = rgbt.length?rgbt:(rgbv.length?rgbv:rgbm);
               f.push([v1+sn,v2+sn,v3+sn]);        // HINT: reverse order for polyhedron()

               var maps = el.find('map');
               maps.each(function() {
                  ;        // not yet
               });
            });
         });
         var textures = el.find('texture');
         textures.each(function() {
            ; // not yet
         });
         
         // v[] has the vertices
         // f[] has the faces
         for(var i=0; i<f.length; i++) {
            //srci += "\tpgs.push(new CSG.Polygon([\n\t\t";
            srci += "\tpgs.push(PP([\n\t\t";
            for(var j=0; j<f[i].length; j++) {
               if(f[i][j]<0||f[i][j]>=v.length) {
                  if(err.length=='') err += "bad index for vertice (out of range)";
                  continue;
               }
               if(j) srci += ",\n\t\t";
               //srci += "<!-- "+v+","+f+" -->";
               //srci += "<!-- "+f[i]+":"+v.length+":"+v[f[i]]+" -->";
               //srci += "new CSG.Vertex(new CSG.Vector3D("+v[f[i][j]]+"))";
               srci += "VV("+v[f[i][j]]+")";
            }
            srci += "])";
            if(c[i]) srci += ".setColor("+c[i]+")";
            srci += ");\n";
            np++;
         }
      });
   });
   var src = "";
   for(var k in meta) {
      src += "// AMF."+k+": "+meta[k]+"\n";
   }
   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" AMF Importer\n";
   src += "// date: "+(new Date())+"\n";
   src += "// source: "+fn+"\n";
   src += "\n";
   
   if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
   src += "// objects: 1\n// object #1: polygons: "+np+"\n\n";
   src += "function main() {\n"; 
   src += "\tvar PP = function(a) { return new CSG.Polygon(a); }\n"; 
   src += "\tvar VV = function(x,y,z) { return new CSG.Vertex(new CSG.Vector3D(x,y,z)); }\n";
   //src += vt2jscad(v,f,[],c);
   src += srci;
   src += "\treturn CSG.fromPolygons(pgs);\n}\n";
   return src;
}
   

function parseOBJ(obj,fn) {   // http://www.andrewnoske.com/wiki/index.php?title=OBJ_file_format
   var l = obj.split(/\n/);
   var v = [], f = [];
   
   for(var i=0; i<l.length; i++) {
      var s = l[i];
      var a = s.split(/\s+/);

      if(a[0]=='v') {
         v.push([a[1],a[2],a[3]]);
         
      } else if(a[0]=='f') {
         var fc = [];
         var skip = 0;

         for(var j=1; j<a.length; j++) {
            var c = a[j];            
            c.replace(/\/.*$/,'');     // -- if coord# is '840/840' -> 840
            c--;                       // -- starts with 1, but we start with 0
            if(c>=v.length) 
               skip++;
            if(skip==0)
               fc.push(c);
         }
         if(skip==0) 
            f.push(fc);

      } else {
         ;     // vn vt and all others disregarded
      }
   }
   var src = ""; 
   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" OBJ Importer\n";
   src += "// date: "+(new Date())+"\n";
   src += "// source: "+fn+"\n";
   src += "\n";
   //if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
   src += "// objects: 1\n// object #1: polygons: "+f.length+"\n\n";
   src += "function main() { return "; 
   src += vt2jscad(v,f);
   src += "; }";
   return src;
}

// STL function from http://jsfiddle.net/Riham/yzvGD/35/ 
// CC BY-SA by Riham
// changes by Rene K. Mueller <spiritdude@gmail.com>
//
// 2013/03/28: lot of rework and debugging included, and error handling
// 2013/03/18: renamed functions, creating .jscad source direct via polyhedron()

function parseSTL(stl,fn) {
   var isAscii = true;

   for(var i=0; i<stl.length; i++) {
      if(stl[i].charCodeAt(0) == 0) {
         isAscii = false;
         break;
      }
   }
   //echo("STL:"+fn,isAscii?"ascii":"binary");
   var src;
   if(!isAscii) {
      src = parseBinarySTL(stl,fn);
   } else {
      src = parseAsciiSTL(stl,fn);
   }
   //echo("STL converted JSCAD",src);
   return src;
}

function parseBinarySTL(stl,fn) {
    // -- This makes more sense if you read http://en.wikipedia.org/wiki/STL_(file_format)#Binary_STL
    var vertices = [];
    var triangles = [];
    var normals = [];
    var vertexIndex = 0;
    var converted = 0;
    var err = 0;
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

        var skip = 0;
        if(1) {
           for(var i=0; i<3; i++) {
              if(isNaN(v1[i])) skip++;
              if(isNaN(v2[i])) skip++;
              if(isNaN(v3[i])) skip++;
              if(isNaN(no[i])) skip++;
           }
           if(skip>0) {
              echo("bad triangle vertice coords/normal: ",skip);
           }
        }
        err += skip;
        // -- every 3 vertices create a triangle.
        var triangle = []; triangle.push(vertexIndex++); triangle.push(vertexIndex++); triangle.push(vertexIndex++);

        br.readUInt16();

        // -- Add 3 vertices for every triangle
        // -- TODO: OPTIMIZE: Check if the vertex is already in the array, if it is just reuse the index
        if(skip==0) {  // checking cw vs ccw, given all normal/vertice are valid
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
   var src = "";
   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" STL Binary Importer\n";
   src += "// date: "+(new Date())+"\n";
   src += "// source: "+fn+"\n";
   src += "\n";
   if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
   src += "// objects: 1\n// object #1: triangles: "+totalTriangles+"\n\n";
   src += "function main() { return "; 
   src += vt2jscad(vertices,triangles,normals);
   src += "; }";
   return src;
}

function parseAsciiSTL(stl,fn) {
   var src = "";
   var n = 0;
   var converted = 0;
   var o;
     
   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" STL ASCII Importer\n";
   src += "// date: "+(new Date())+"\n";
   src += "// source: "+fn+"\n";
   src += "\n";
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
        var err = 0;
        
        match = stl.match(patt);
        if (match == null) continue;
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
            err += skip;
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
               var _u = w1.minus(w3);
               var _v = w1.minus(w2);
               var norm = _u.cross(_v).unit();
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
        if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
        src += "// object #"+(o)+": triangles: "+match.length+"\n";
        src += vt2jscad(vertices,triangles,normals);
    }
    src += "); }\n";
    return src;
}

function vt2jscad(v,t,n,c) {     // vertices, triangles, normals and colors
   var src = '';
   src += "polyhedron({ points: [\n\t";
   for(var i=0,j=0; i<v.length; i++) {
      if(j++) src += ",\n\t";
      src += "["+v[i]+"]"; //.join(", ");
   }
   src += "],\n\tpolygons: [\n\t";
   for(var i=0,j=0; i<t.length; i++) {
      if(j++) src += ",\n\t";
      src += "["+t[i]+"]"; //.join(', ');
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

function parseGCode(gcode,fn) {   // http://reprap.org/wiki/G-code 
                                  // just as experiment ... 
   var l = gcode.split(/[\n]/);   // for now just GCODE ASCII 
   var srci = '';
   var d = 0, pos = [], lpos = [], le = 0, ld = 0, p = [];
   var origin = [-100,-100];
   var layers = 0;
   var lh = 0.35, lz = 0;
   
   for(var i=0; i<l.length; i++) {
      var val = '', k, e = 0;
      if(l[i].match(/^\s*;/))
         continue;
      var c = l[i].split(/\s+/);
      for(var j=0; j<c.length; j++) {
         if(c[j].match(/G(\d+)/)) {
            var n = parseInt(RegExp.$1);
            if(n==1) d++;
            if(n==90) pos.type = 'abs';
            if(n==91) pos.type = 'rel';
            
         } else if(c[j].match(/M(\d+)/)) {
            var n = parseInt(RegExp.$1);
            if(n==104||n==109)
               k = 'temp'; 
   
         } else if(c[j].match(/S([\d\.]+)/)) {
            var v = parseInt(RegExp.$1);
            if(k!==undefined) 
               val[k] = v;
            
         } else if(c[j].match(/([XYZE])([\-\d\.]+)/)) {
            var a = RegExp.$1, v = parseFloat(RegExp.$2);
            if(pos.type=='abs') {
               if(d) pos[a] = v;
            } else {
               if(d) pos[a] += v;
            }
            //console.log(d,a,pos.E,lpos.E);
            if(d&&a=='E'&&lpos.E===undefined) 
               lpos.E = pos.E;
            if(d&&a=='E'&&(pos.E-lpos.E)>0) {
               //console.log(pos.E,lpos.E);
               e++;
            }
         }
      }
      if(d&&pos.X&&pos.Y) {
         if(e) {
            if(!le&&lpos.X&&lpos.Y) {
               //console.log(lpos.X,lpos.Y);
               p.push("["+(lpos.X+origin[0])+","+(lpos.Y+origin[1])+"]");
            }
            p.push("["+(pos.X+origin[0])+","+(pos.Y+origin[1])+"]");
         } 
         if(!e&&le&&p.length>1) {
            if(srci.length) srci += ",\n\t\t";
            if(pos.Z!=lz) { 
               lh = pos.Z-lz;
               layers++;
            }
            srci += "EX(["+p.join(', ')+"],{w: "+lh*1.1+", h:"+lh*1.02+", fn:1, closed: false}).translate([0,0,"+pos['Z']+"])";
            p = [];
            lz = pos.Z;
            //if(layers>2) 
            //   break;
         } 
         le = e;
         lpos.X = pos.X;
         lpos.Y = pos.Y;
         lpos.Z = pos.Z;
         lpos.E = pos.E;
      }
      ld = d;
   }
   
   var src = "";
   src += "// producer: OpenJSCAD "+me.toUpperCase()+" "+version+" GCode Importer\n";
   src += "// date: "+(new Date())+"\n";
   src += "// source: "+fn+"\n";
   src += "\n";
   //if(err) src += "// WARNING: import errors: "+err+" (some triangles might be misaligned or missing)\n";
   src += "// layers: "+layers+"\n";
   src += "function main() {\n\tvar EX = function(p,opt) { return rectangular_extrude(p,opt); }\n\treturn ["; 
   src += srci;
   src += "\n\t];\n}\n";
   return src;
}


// -------------------------------------------------------------------------------------------------

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
   
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2010.09.06 - 0.7-beta1
  - features: vsprintf, support for named placeholders
  - enhancements: format cache, reduced global namespace pollution

2010.05.22 - 0.6:
 - reverted to 0.4 and fixed the bug regarding the sign of the number 0
 Note:
 Thanks to Raphael Pigulla <raph (at] n3rd [dot) org> (http://www.n3rd.org/)
 who warned me about a bug in 0.5, I discovered that the last update was
 a regress. I appologize for that.

2010.05.09 - 0.5:
 - bug fix: 0 is now preceeded with a + sign
 - bug fix: the sign was not at the right position on padded results (Kamal Abdali)
 - switched from GPL to BSD license

2007.10.21 - 0.4:
 - unit test and patch (David Baird)

2007.09.17 - 0.3:
 - bug fix: no longer throws exception on empty paramenters (Hans Pufal)

2007.09.11 - 0.2:
 - feature: added argument swapping

2007.04.03 - 0.1:
 - initial release
**/

sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = parseInt(arg, 10); break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();

vsprintf = function(fmt, argv) {
	argv.unshift(fmt);
	return sprintf.apply(null, argv);
};

// -------------------------------------------------------------------------------------------------

if(typeof module !== 'undefined') {    // we are used as module in nodejs require()
   var CSG = require(global.lib+'./csg.js').CSG;
   //console.log("lib="+global.lib);
   module.exports = { 
      // -- list all functions we export
      parseSTL: function(stl,fn) { return parseSTL(stl,fn); },
      parseAMF: function(amf,fn) { return parseAMF(amf,fn); } 
   };
   me = 'cli';
}


