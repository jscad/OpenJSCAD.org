const fs = require('fs')
const path = require('path')
const test = require('ava')
const { CSG, CAG } = require('@jscad/csg')

const { nearlyEqual } = require( '../../../test/helpers/nearlyEqual' )

const { deserialize } = require( '../index' )

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF 3D Polyline Entities translated to JSCAD Scripts', t => {

// DXF 3D POLYLINE with mesh, translates to script with CSG.fromPolygons
  let dxf3 = `0
SECTION
2
ENTITIES
0
POLYLINE
66
1
10
0
20
0
30
0
70
16
71
6
72
3
0
VERTEX
10
-144
20
-684
30
240
70
64
0
VERTEX
10
-160
20
-720
30
0
70
64
0
VERTEX
10
-160
20
-720
30
0
70
64
0
VERTEX
10
-444
20
-684
30
240
70
64
0
VERTEX
10
-480
20
-720
30
0
70
64
0
VERTEX
10
-480
20
-720
30
0
70
64
0
VERTEX
10
-444
20
-432
30
240
70
64
0
VERTEX
10
-480
20
-432
30
0
70
64
0
VERTEX
10
-480
20
-720
30
0
70
64
0
VERTEX
10
-144
20
-432
30
240
70
64
0
VERTEX
10
-160
20
-432
30
0
70
64
0
VERTEX
10
-160
20
-720
30
0
70
64
0
VERTEX
10
-144
20
-432
30
240
70
64
0
VERTEX
10
-144
20
-432
30
240
70
64
0
VERTEX
10
-144
20
-684
30
240
70
64
0
VERTEX
10
-444
20
-432
30
240
70
64
0
VERTEX
10
-444
20
-432
30
240
70
64
0
VERTEX
10
-444
20
-684
30
240
70
64
0
SEQEND
0
ENDSEC`
  let src3 = deserialize(dxf3,'dxf3-test',{output: 'jscad'})
  let ss3 = src3.split("\n")
  t.is(ss3.length,34)
  t.true(src3.indexOf('fromPolygons') > 0)

// DXF 3D POLYLINE with faces, translates to script with CSG

})

test('ASCII DXF 3D FACE Entities translated to JSCAD Scripts', t => {
  let dxf1 = `0
SECTION
2
ENTITIES
0
3DFACE
8
1
62
1
10
-0.5
20
-0.5
30
-0.5
11
-0.5
21
0.5
31
-0.5
12
0.5
22
0.5
32
-0.5
13
0.5
23
-0.5
33
-0.5
0
3DFACE
8
1
62
1
10
-0.5
20
-0.5
30
-0.5
11
0.5
21
-0.5
31
-0.5
12
0
22
-0.5
32
0.5
13
0
23
-0.5
33
0.5
0
ENDSEC`
// expect a script which calls CSG.fromPolygons
  let src1 = deserialize(dxf1,'dxf1-test',{output: 'jscad'})
  let ss1 = src1.split("\n")
  t.is(ss1.length,30)
  t.true(src1.indexOf('createPolygon(') > 0)
  t.true(src1.indexOf('fromPolygons(') > 0)

})

