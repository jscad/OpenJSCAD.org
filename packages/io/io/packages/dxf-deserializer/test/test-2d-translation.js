const fs = require('fs')
const path = require('path')
const test = require('ava')
const { CSG, CAG } = require('@jscad/csg')

const { nearlyEqual } = require( '../../../test/helpers/nearlyEqual' )

const { deserialize } = require( '../index' )

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF 2D Entities translated to JSCAD Scripts', t => {
// DXF empty source, translate to main and helper functions
  let dxf1 = ''
  let src1 = deserialize(dxf1,'dxf1 test',{output: 'jscad'})
  let ss1 = src1.split("\n")
  t.is(ss1.length,22)
  t.true(src1.indexOf('main()') > 0)
  t.true(src1.indexOf('createVertex(') > 0)
  t.true(src1.indexOf('createPlane(') > 0)
  t.true(src1.indexOf('createPolygon(') > 0)

// DXF CIRCLE, translates to script with CAG.circle
  let dxf2 = `0
SECTION
2
ENTITIES
0
CIRCLE
  8
0
 10
7.5
 20
17.5
 30
0.0
 40
2.5
  0
ENDSEC`
  let src2 = deserialize(dxf2,'dxf2 test',{output: 'jscad'})
  let ss2 = src2.split("\n")
  t.is(ss2.length,26)
  t.true(src2.indexOf('CAG.circle(') > 0)

// DXF LINE, translates to script with CSG.Line2D.fromPoints
  let dxf3 = `0
SECTION
2
ENTITIES
0
LINE
 10
32.375
 20
3.694299999999998
 30
0.0
 11
34.0
 21
3.694299999999998
 31
0.0
0
ENDSEC`
  let src3 = deserialize(dxf3,'dxf3-test',{output: 'jscad'})
  let ss3 = src3.split("\n")
  t.is(ss3.length,26)
  t.true(src3.indexOf('CSG.Line2D.fromPoints(') > 0)

// DXF ARC, translates to script with 'CSG.Path2D.arc'
  let dxf4 = `0
SECTION
2
ENTITIES
  0
ARC
  5
DD
100
AcDbEntity
  8
0
100
AcDbCircle
 10
8.75
 20
16.25
 30
0.0
 40
1.767766952966368
100
AcDbArc
 50
45.0
 51
225.0
0
ENDSEC`
  let src4 = deserialize(dxf4,'dxf4-test',{output: 'jscad'})
  let ss4 = src4.split("\n")
  t.is(ss4.length,26)
  t.true(src4.indexOf('CSG.Path2D.arc(') > 0)

// DXF LWPOLYLINE without bulges, translates to script with CSG.Path2D, appendPoint, and CAG.fromPoints
  let dxf5 = `0
SECTION
2
ENTITIES
  0
LWPOLYLINE
 90
        4
 70
     1
 43
0.02
 10
1.5
 20
1.25
 10
32.25
 20
1.25
 10
32.25
 20
21.75
 10
1.5
 20
21.75
0
ENDSEC`
  let src5 = deserialize(dxf5,'dxf5-test',{output: 'jscad'})
  let ss5 = src5.split("\n")
  t.is(ss5.length,29)
  t.true(src5.indexOf('CSG.Path2D(') > 0)
  t.true(src5.indexOf('appendPoint(') > 0)
  t.true(src5.indexOf('close(') > 0)
  t.true(src5.indexOf('CAG.fromPoints(') > 0)

// DXF LWPOLYLINE with bulges, translates to script with CSG.Path2D and appendArc, and CAG.fromPoints
  let dxf6 = `0
SECTION
2
ENTITIES
  0
LWPOLYLINE
 90
        4
 70
     1
 43
0.02
 10
1.5
 20
1.25
 42
5.00
 10
32.25
 20
1.25
 42
5.00
 10
32.25
 20
21.75
 42
5.00
 10
1.5
 20
21.75
 42
5.00
0
ENDSEC`
  let src6 = deserialize(dxf6,'dxf6-test',{output: 'jscad'})
  let ss6 = src6.split("\n")
  t.is(ss6.length,29)
  t.true(src6.indexOf('CSG.Path2D(') > 0)
  t.true(src6.indexOf('appendPoint(') > 0)
  t.true(src6.indexOf('appendArc(') > 0)
  t.true(src6.indexOf('close(') > 0)
  t.true(src6.indexOf('CAG.fromPoints(') > 0)

// DXF ELLIPSE, translates to script with CAG.ellipse
  let dxf7 = `0
SECTION
2
ENTITIES
  0
ELLIPSE
  8
0
 10
7.5
 20
17.5
 30
0.0
 11
-2.5
 21
0.0
 31
0.0
210
0.0
220
0.0
230
1.0
 40
0.4
 41
0.0
 42
6.283185307179586
0
ENDSEC`
  let src7 = deserialize(dxf7,'dxf7-test',{output: 'jscad'})
  let ss7 = src7.split("\n")
  t.is(ss7.length,26)
  t.true(src7.indexOf('CAG.ellipse(') > 0)

})

test('ASCII DXF Polylines translated to JSCAD Scripts', t => {
// DXF 2D POLYLINE without bulges, translates to script with CSG.Path2D
  let dxf1 = `0
SECTION
2
ENTITIES
  0
POLYLINE
  5
28
  8
0
 66
     1
 10
0.0
 20
0.0
 30
0.0
 40
0.02
 41
0.02
  0
VERTEX
  5
ED
  8
0
 10
0.0
 20
2.0
 30
0.0
  0
VERTEX
  5
ED
  8
0
 10
2.0
 20
4.0
 30
0.0
0
SEQEND
0
ENDSEC`
  let src1 = deserialize(dxf1,'dxf1-test',{output: 'jscad'})
  let ss1 = src1.split("\n")
  t.is(ss1.length,27)
  t.true(src1.indexOf('CSG.Path2D(') > 0)
  t.true(src1.indexOf('appendPoint(') > 0)

// DXF 2D POLYLINE with bulges, translates to script with CSG.Path2D, appendArc
  let dxf2 = `0
SECTION
2
ENTITIES
0
POLYLINE
8
0
66
1
40
0.00617
41
0.00617
70
1
0
VERTEX
8
0
10
-0.0030849869
20
0
42
1
0
VERTEX
8
0
10
0.0030849869
20
0
42
1
0
SEQEND
0
ENDSEC`
  let src2 = deserialize(dxf2,'dxf2-test',{output: 'jscad'})
  let ss2 = src2.split("\n")
  t.is(ss2.length,27)
  t.true(src2.indexOf('CSG.Path2D(') > 0)
  t.true(src2.indexOf('appendPoint(') > 0)
  t.true(src2.indexOf('appendArc(') > 0)

})

