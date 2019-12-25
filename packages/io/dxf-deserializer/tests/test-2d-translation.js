const test = require('ava')

const { deserialize } = require('../index')

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF 2D Entities translated to JSCAD Scripts', t => {
// DXF empty source, translate to main and helper functions and layer0
  let dxf1 = ''
  let src1 = deserialize(dxf1, 'dxf1 test', { output: 'jscad' })
  let ss1 = src1.split('\n')
  t.is(ss1.length, 13)
  t.true(src1.indexOf('main()') > 0)
  t.true(src1.indexOf('createPolygon(') > 0)

  // DXF CIRCLE, translates to script with a 'circle' function
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
  let src2 = deserialize(dxf2, 'dxf2 test', { output: 'jscad' })
  let ss2 = src2.split('\n')
  t.is(ss2.length, 17)
  t.true(src2.indexOf('main()') > 0)
  t.true(src2.indexOf('circle(') > 0)

  // DXF LINE, translates to script with a 'line' created from points
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
  let src3 = deserialize(dxf3, 'dxf3-test', { output: 'jscad' })
  let ss3 = src3.split('\n')
  t.is(ss3.length, 17)
  t.true(src3.indexOf('main()') > 0)
  t.true(src3.indexOf('line(') > 0)

  // DXF ARC, translates to script with 'arc' function call
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
  let src4 = deserialize(dxf4, 'dxf4-test', { output: 'jscad' })
  let ss4 = src4.split('\n')
  t.is(ss4.length, 17)
  t.true(src4.indexOf('main()') > 0)
  t.true(src4.indexOf('arc(') > 0)

  // DXF LWPOLYLINE without bulges, translates to script with a path created from points
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
  let src5 = deserialize(dxf5, 'dxf5-test', { output: 'jscad' })
  let ss5 = src5.split('\n')
  t.is(ss5.length, 23)
  t.true(src5.indexOf('main()') > 0)
  t.true(src5.indexOf('path2.create(') > 0)
  t.true(src5.indexOf('path2.appendPoints(') > 0)
  t.true(src5.indexOf('path2.close(') > 0)

  // DXF LWPOLYLINE with bulges, translates to script with a path created from points
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
  let src6 = deserialize(dxf6, 'dxf6-test', { output: 'jscad' })
  let ss6 = src6.split('\n')
  t.is(ss6.length, 23)
  t.true(src5.indexOf('main()') > 0)
  t.true(src6.indexOf('path2.create(') > 0)
  t.true(src6.indexOf('path2.appendPoints(') > 0)
  t.true(src6.indexOf('path2.appendArc(') > 0)
  t.true(src6.indexOf('path2.close(') > 0)
  t.true(src6.indexOf('fromPoints(') > 0)

  // DXF ELLIPSE, translates to script with a 'ellipse' function
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
  let src7 = deserialize(dxf7, 'dxf7-test', { output: 'jscad' })
  let ss7 = src7.split('\n')
  t.is(ss7.length, 19)
  t.true(src5.indexOf('main()') > 0)
  t.true(src7.indexOf('ellipse(') > 0)
})

test('ASCII DXF Polylines translated to JSCAD Scripts', t => {
// DXF 2D POLYLINE without bulges, translates to script with a path created from points
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
  let src1 = deserialize(dxf1, 'dxf1-test', { output: 'jscad' })
  let ss1 = src1.split('\n')
  t.is(ss1.length, 20)
  t.true(src1.indexOf('path2.create(') > 0)
  t.true(src1.indexOf('appendPoints(') > 0)

  // DXF 2D POLYLINE with bulges, translates to script with a path created from points and arcs
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
  let src2 = deserialize(dxf2, 'dxf2-test', { output: 'jscad' })
  let ss2 = src2.split('\n')
  t.is(ss2.length, 21)
  t.true(src2.indexOf('path2.create(') > 0)
  t.true(src2.indexOf('appendPoints(') > 0)
  t.true(src2.indexOf('appendArc(') > 0)

  // DXF with two labels (ASCII and KANJI) with one entity (CIRCLE), translates to script with two layers
  let dxf3 = `0
TABLES
0
TABLE
0
LAYER
2
ASCII
70
1
0
ENDTAB
0
TABLE
0
LAYER
2
漢字
70
1
0
ENDTAB
0
ENDSEC
0
SECTION
2
ENTITIES
0
CIRCLE
  8
漢字
 10
7.5
 20
17.5
 30
0.0
 40
2.5
0
SEQEND
0
ENDSEC`
  let src3 = deserialize(dxf3, 'dxf3-test', { output: 'jscad' })
  let ss3 = src3.split('\n')
  t.is(ss3.length, 20)
  t.true(src3.indexOf('function layer0(') > 0)
  t.true(src3.indexOf('function layer1(') > 0)
  t.true(src3.indexOf('circle(') > 0)
})
