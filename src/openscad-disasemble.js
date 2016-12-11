// openscad.js, a few functions to simplify coding OpenSCAD-like
//
// Copyright (c) 2013-2016 by Rene K. Mueller <spiritdude@gmail.com>
//
// License: MIT License
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
// 2016/10/01: 0.5.2: fixed difference() and intersection() functions for CAG by fischman
// 2016/06/27: 0.5.1: incrementing version number for release
// 2016/05/01: 0.5.0: added options to Processor and View classes, allow more flexibility in HTML by Z3 Dev
// 2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev
// 2015/05/20: 0.2.4: renumbering to 0.024 -> 0.2.4
// 2015/02/15: 0.023: change license from GPL to MIT license, for sake of simpleness, pull request for mirror() fix (github issue #65) included
// 2015/01/07: 0.022: cylinder() supports d, d1 & d2 to be OpenSCAD-like (github issue #61)
// 2013/04/26: 0.021: sphere() geodesic option added
// 2013/04/25: 0.020: center(v,obj) added, uses new .center(v)
// 2013/04/22: 0.019: vector_char() and vector_text() added, vector font rendering
// 2013/04/11: 0.018: added alpha support to AMF export
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



// wrapper functions for OpenJsCAD & OpenJSCAD.org







// -------------------------------------------------------------------------------------------------

if(typeof module !== 'undefined') {    // we are used as module in nodejs require()
   var CSG = require(global.lib+'./js/lib/csg.js').CSG;
   //console.log("lib="+global.lib);

  module.exports = { 
    // -- list all functions we export
    version: version,
    parseSTL: parseSTL,
    parseOBJ: parseOBJ,
    parseGCode: parseGCode,
    color:color, group:group, union:union, 
    difference:difference, 
    intersection:intersection,
    simplexFont: simplexFont,
    vector_text: vector_text, 
    vector_char: vector_char,
    hsv2rgb: hsv2rgb, rgb2hsv: rgb2hsv,
    hsl2rgb: hsl2rgb, rgb2hsl: rgb2hsl,
    html2rgb: html2rgb, rgb2html: rgb2html,
    pow: pow, sign: sign,
    sqrt: sqrt, round:round, log:log, echo:echo,
    lookup: lookup, rands: rands, atan: atan,
    atan2: atan2, ceil:ceil, floor:floor,
    abs:abs, min:min, max:max, tan:tan,
    acos:acos, cos:cos, asin:asin, sin:sin,
    triangle:triangle, polygon:polygon, circle:circle,
    square:square, 
    rectangular_extrude:rectangular_extrude,
    rotate_extrude: rotate_extrude,
    linear_extrude:linear_extrude,
    chain_hull:chain_hull,
    hull:hull, minkowski:minkowski,
    multmatrix:multmatrix,
    expand:expand, contract:contract, mirror:mirror,
    rotate:rotate, scale:scale, center:center,
    translate:translate, polyhedron:polyhedron,
    torus:torus, cylinder:cylinder, 
    geodesicSphere: geodesicSphere, sphere: sphere,
    cube:cube 
  };
}


