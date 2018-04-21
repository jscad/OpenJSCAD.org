// title      : Celtic Knot Ring
// author     : Joost Nieuwenhuijse
// license    : MIT License
// description: a Celtic knot ring
// file       : celtic-knot-ring.jscad
// tags       : Catmull Spline

// -*- mode: javascript; -*-


function getParameterDefinitions() {
  return [
    {
      name: 'hisorhers', 
      type: 'choice',
      caption: 'For Daniel or Zette:',
      values: [0, 1],
      captions: ["Dan", "Suzette"], 
      initial: 0
    }
   ];
}


var his = true;


var debugcount = 10;
function debugprint () {
    if (debugcount-- > 0) {
    try {
        console.log(arguments);
    } catch (err) {
        //
    }
    }
}


// interpolate between v2 and v3, at time u
function catmullRom(v1, v2, v3, v4, u) {
    var c1x,c2x,c3x,c4x, resX;
    var c1y,c2y,c3y,c4y, resY;
    var c1z,c2z,c3z,c4z, resZ;

    // Coefficients for Matrix M
    // these should all be const, but MSIE doens't handle that
    var M11 = 0.0;
    var M12 = 1.0;
    var M13 = 0.0;
    var M14 = 0.0;
    var M21 =-0.5;
    var M22 = 0.0;
    var M23 = 0.5;
    var M24 = 0.0;
    var M31 = 1.0;
    var M32 =-2.5;
    var M33 = 2.0;
    var M34 =-0.5;
    var M41 =-0.5;
    var M42 = 1.5;
    var M43 =-1.5;
    var M44 = 0.5;
    
    c1x =            M12*v2.x;
    c2x = M21*v1.x            + M23*v3.x;
    c3x = M31*v1.x + M32*v2.x + M33*v3.x + M34*v4.x;
    c4x = M41*v1.x + M42*v2.x + M43*v3.x + M44*v4.x;
    
    c1y =            M12*v2.y;
    c2y = M21*v1.y            + M23*v3.y;
    c3y = M31*v1.y + M32*v2.y + M33*v3.y + M34*v4.y;
    c4y = M41*v1.y + M42*v2.y + M43*v3.y + M44*v4.y;
    
    c1z =            M12*v2.z;
    c2z = M21*v1.z            + M23*v3.z;
    c3z = M31*v1.z + M32*v2.z + M33*v3.z + M34*v4.z;
    c4z = M41*v1.z + M42*v2.z + M43*v3.z + M44*v4.z;
    
    resX = (((c4x*u + c3x)*u +c2x)*u + c1x);
    resY = (((c4y*u + c3y)*u +c2y)*u + c1y);
    resZ = (((c4z*u + c3z)*u +c2z)*u + c1z);
    
    return new CSG.Vector3D(resX, resY, resZ);
}

var tiny = 0.0000001;

function catmullRomWithTangent(v1, v2, v3, v4, u) {
    var res1, res2, tangent;
    if ((u+tiny) <= 1) {
    res1 = catmullRom(v1, v2, v3, v4, u) ;
    res2 = catmullRom(v1, v2, v3, v4, u+tiny) ;
    tangent = res2.minus(res1).unit();
    return [res1, tangent];
    } else {
    res1 = catmullRom(v1, v2, v3, v4, u-tiny) ;
    res2 = catmullRom(v1, v2, v3, v4, u) ;
    tangent = res2.minus(res1).unit();
    return [res2, tangent];
    }
}



// create a CSG by dragging a CAG along a Catmull-Rom spline
// where the 'top' of the CAG is 'up' and 'sideways' of
// the CAG are perpendicular to 'up' and the spline tangent


function splineExtrude(vCP, numInterps, up, 
               cag, transform) {
    var polygons = [];
    var splinePointsAndTangents = [];
    // corners is an array of arrays

    // corners [j] corresponds to the array of all points on the
    // spline with the offset of cag.sides[j].vertex0
    
    // corners[j][i] is the i'th interpolated point on the master
    // spline, plus the offset of cag.sides[j].vertex0

    var corners = [];
    var nSides = cag.sides.length;

    for (i=0; i< nSides; i++) {
    corners.push([]);
    }

    if (typeof(transform) != 'function') {
    transform = function(e) { return e; };
    }
    
    // fencepost - do the zeroth point of the zeroth segment
    splinePointsAndTangents.push(catmullRomWithTangent(vCP[0],vCP[0+1],
                               vCP[0+2],vCP[0+3],0));
    for (var j = 0; j <= vCP.length-4; j++) {
    // don't do the zeroth point, because it's the same as the
    // last point of the previous segment
    for (var i = 1; i <= numInterps; i++) {
        var u = i/numInterps;
        splinePointsAndTangents.push(catmullRomWithTangent(vCP[j],vCP[j+1],
                                   vCP[j+2],vCP[j+3],u));
    }
    }
    

    for (var m=0; m < splinePointsAndTangents.length; m++) {
    var sideways = up.cross(splinePointsAndTangents[m][1]);
    for (var n = 0; n < nSides; n++) {
        corners[n].push(transform(splinePointsAndTangents[m][0]
                      .plus(sideways.times(cag.sides[n].vertex0.pos.x))
                      .plus(up.times(cag.sides[n].vertex0.pos.y))));
        
        // vertex1 should be the same as vertex0 of the next side,
        // so I don't need to handle it here
    }
    }
    var shared = CSG.Polygon.defaultShared;
    
    var start = 0;
    var end = corners[0].length-1;
    var nCorners = corners[0].length;

    

    //start cap
    var startCap = [];
    for (var p =nSides-1; p>=0; p--) {
    startCap.push(corners[p][start]);
    }
    polygons.push(CSG.Polygon.createFromPoints(startCap, shared));

//    polygons.push(CSG.Polygon.createFromPoints([corners4[start],corners3[start],
//                        corners2[start],corners1[start]],
//                           shared));
    for (var q = start; q < end; q++) { 

    // This is done as triangles, (rather than rectangles) because
    // at points on the spline with high curvature, the inside
    // corners can become twisted, which messes up the
    // renderer. What I don't know is what happens when such a
    // file is converted to STL and sent to a 3D printer.  

    // In the words of Shapeways, it makes the printer cry.

    for (var r = 0; r < nSides; r++) {

        polygons.push(CSG.Polygon.createFromPoints([corners[r][q],  corners[(r+1)%nSides][q],
                                                corners[r][q+1]],
                                shared));
        polygons.push(CSG.Polygon.createFromPoints([              corners[(r+1)%nSides][q],
                                corners[(r+1)%nSides][q+1],corners[r][q+1]],
                               shared));
    }
    }
    var endCap = [];
    for (var s =0; s< nSides; s++) {
    endCap.push(corners[s][end]);
    }
    polygons.push(CSG.Polygon.createFromPoints(endCap, shared));

    return CSG.fromPolygons(polygons);
}


var controlPoints = 
    [
    [0,     0,  1, 1],   //over across the middle
    [10,  10, -1, 0],  //under the first cross
    [20,  20,  1, 1],   //over the second cross
//  [30,  24,  0, 0],   //curving into the corner
    [39,  27.25,  0, 1],   // the sharp corner
//  [32,  12,  0, 0],
    [30,  10, -1, 0],
//  [28,  8,   0, 0],  
    [20,  3.75,   0, 0],  // bottom of loop under the corner
    [10,  10,  1, 1],
    [4,   20,  0, 0], // grand curve near the sharp corner (under the long arc)
////    [6,   26,  0, 0],
//  [8,   28,  0, 0],
    [10,  30, -1, 0],
    [24,  34,  0, 0],
//  [30,  35,  0, 0], // top of the long arc
    [40,  34,  0, 0],
    [50,  30,  1, 1], // about where the long arc crosses over
//  [58,  22,  0, 0], 
    [60,  20, -1, 0],
    [70,  10,  1, 1],
    [75,  5,  0, 0],
    [80,  0,  -1, 0]
//  [79.9, .1, -1, 0]   // under the middle (2 cycles right)
//  [79.95, .05, -1, 0]   // under the middle (2 cycles right)
];

var numberOfPatterns = 11;
var circumference = 40 * numberOfPatterns;
var radius = circumference / 2 / Math.PI;
var targetCircumference = his?54.3:56.3;


function main (params) {
    his = (params.hisorhers != 1);
    targetCircumference = his?54.3:56.3;

    var up = new CSG.Vector3D(0,0,1);
    var flipCP = controlPoints.slice();
    flipCP.reverse();
    flipCP = flipCP.map(function(elt) { return ([elt[0]*-1, elt[1]*-1, 
                         elt[2],    elt[3]]); });
    // delete the repeated 0,0 point;
    controlPoints.shift();
    controlPoints = flipCP.concat(controlPoints);
    if (!his) {
    controlPoints = controlPoints.map(function(elt) { 
        return ([elt[0], elt[1]*-1, 
             elt[2]*-1,    elt[3]]); });
    }
    var splines = [];
    var lastPoint ;
    var tripleCP = [];
    // one extra cycle before and after
    for (var i=-1; i<numberOfPatterns+1; i++) {
//    for (var i=-1; i<4+1; i++) {
    tripleCP = tripleCP.concat(controlPoints.map(
        function(elt) { return ([elt[0]+(i*160), elt[1], 
                     elt[2], elt[3]]); }));
    // delete final point so it's not duplicated
    lastPoint = tripleCP.pop();
    }
    // put final point back after the last spline
    tripleCP.push(lastPoint);

    // delete all but last two points of the extra cycle 
    // ie. the start/end point and the extra control point
    for (var t=0; t < controlPoints.length-2; t++) {
    tripleCP.pop();
    tripleCP.shift();
    }

    debugprint(tripleCP);
    var vCP = tripleCP.map(function(e) {
    return new CSG.Vector3D(e[0],e[1],e[2]); 
    });

    var shape1 = CAG.fromPoints([[-4,0], 
                 [-4,5.0], [-1.5,8.5],  
                 [1.55,8.5], [4, 5.0], 
                 [4,0]]);

    // var shape1 = CAG.fromPoints([[-2.75,0], [0,2.75], [2.75,0]]);
    splines.push(splineExtrude(vCP, 11, up, shape1, transformVec3DtoRingSpace));
//        splines.push(splineExtrude(vCP, 11, up, shape1));
    var csg = new CSG();
    for (var u=0; u < splines.length; u++) {
    csg = csg.union(splines[u]);
    }

    csg = csg.transform(CSG.Matrix4x4.rotationX(90));
    csg = csg.scale(targetCircumference/circumference);    
    return csg;

// 7.5 ring size is 17.7 mm diameter 55.7mm circumference
// my guess as to my own ring size is 54mm

// augh! the pass-under bits are 1 pre-scaled unit narrower 
// (after scaling, about 1/8 mm, so .4 mm in extra circumference.
}

function transformVec3DtoRingSpace (vec) {
    var m = new CSG.Matrix4x4();

    m = m.multiply(CSG.Matrix4x4.translation([-vec.x, 0, radius]));
    m = m.multiply(CSG.Matrix4x4.rotationY(360*(vec.x)/circumference));
    var res = vec.transform(m);
    return res;
}

// Question: polygons are supposed to be coplanar vertices, but after
// being transformed into ring space, are 4 coplanar vertices still
// always coplanar?  I'm pretty sure the answer is 'No'.  Does this matter?
// I think yes.  So I can generate triangles instead, easily enough.
// Excpet the end caps... which for my model are not actually rotated, 
// because they are at the origin or exactly 11 loops away.



