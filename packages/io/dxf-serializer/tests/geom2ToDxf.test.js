const test = require('ava')

const { geometries, primitives } = require('@jscad/modeling')

const { serialize } = require('../index.js')
const { dxfHeaders, dxfClasses, dxfTables, dxfBlocks, dxfObjects } = require('../autocad_AC2017')

test('2D GEOMETRY to DXF LWPOLYLINE', (t) => {
  const cag1 = geometries.geom2.create()
  t.is(cag1.sides.length, 0)

  const obs1 = serialize({}, cag1)
  const exp1 = [empty]
  t.deepEqual(obs1, exp1)

  const cag2 = primitives.rectangle()
  t.is(cag2.sides.length, 4)

  const obs2 = serialize({}, cag2)
  const exp2 = [lwpolyline0]
  t.deepEqual(obs2, exp2)

  const obs3 = serialize({ geom2To: 'lwpolyline' }, cag1, cag2)
  const exp3 = [lwpolyline1]
  t.deepEqual(obs3, exp3)

  const obs4 = serialize({}, cag2, cag2)
  const exp4 = [lwpolylineByTwo]
  t.deepEqual(obs4, exp4)
})

test('2D GEOMETRY to DXF POLYLINE', (t) => {
  const cag1 = geometries.geom2.create()
  t.is(cag1.sides.length, 0)

  const obs1 = serialize({ geom2To: 'polyline' }, cag1)
  const exp1 = [empty]
  t.deepEqual(obs1, exp1)

  const cag2 = primitives.rectangle()
  t.is(cag2.sides.length, 4)

  const obs2 = serialize({ geom2To: 'polyline' }, cag2)
  const exp2 = [polyline1]
  t.deepEqual(obs2, exp2)
})

const empty = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`

const lwpolyline0 = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
LWPOLYLINE
  5
CAD00001
  100
AcDbEntity
  3
CAD00001
  8
0
  67
0
  62
256
  100
AcDbPolyline
  90
5
  70
1
  10
-1
  20
-1
  10
1
  20
-1
  10
1
  20
1
  10
-1
  20
1
  10
-1
  20
-1
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`

const lwpolyline1 = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
LWPOLYLINE
  5
CAD00001
  100
AcDbEntity
  3
CAD00001
  8
0
  67
0
  62
256
  100
AcDbPolyline
  90
5
  70
1
  10
-1
  20
-1
  10
1
  20
-1
  10
1
  20
1
  10
-1
  20
1
  10
-1
  20
-1
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`

const lwpolylineByTwo = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
LWPOLYLINE
  5
CAD00001
  100
AcDbEntity
  3
CAD00001
  8
0
  67
0
  62
256
  100
AcDbPolyline
  90
5
  70
1
  10
-1
  20
-1
  10
1
  20
-1
  10
1
  20
1
  10
-1
  20
1
  10
-1
  20
-1
  0
LWPOLYLINE
  5
CAD00002
  100
AcDbEntity
  3
CAD00002
  8
0
  67
0
  62
256
  100
AcDbPolyline
  90
5
  70
1
  10
-1
  20
-1
  10
1
  20
-1
  10
1
  20
1
  10
-1
  20
1
  10
-1
  20
-1
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`

const polyline1 = `999
Created by JSCAD
${dxfHeaders({})}
${dxfClasses({})}
${dxfTables({})}
${dxfBlocks({})}
  0
SECTION
  2
ENTITIES
  0
POLYLINE
  5
CAD00001
  100
AcDbEntity
  3
CAD00001
  8
0
  62
256
  100
AcDb2dPolyline
  0
VERTEX
  5
CAD00002
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
-1
 20
-1
  0
VERTEX
  5
CAD00003
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
1
 20
-1
  0
VERTEX
  5
CAD00004
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
1
 20
1
  0
VERTEX
  5
CAD00005
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
-1
 20
1
  0
VERTEX
  5
CAD00006
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
-1
 20
-1
  0
SEQEND
  5
CAD00007
  100
AcDbEntity
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`
