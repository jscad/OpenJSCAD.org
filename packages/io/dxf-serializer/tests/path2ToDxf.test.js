const test = require('ava')

const { geometries, primitives } = require('@jscad/modeling')

const { serialize } = require('../index.js')
const { dxfHeaders, dxfClasses, dxfTables, dxfBlocks, dxfObjects } = require('../autocad_AC2017')

test('2D Path to DXF LWPOLYLINE', (t) => {
  const path1 = geometries.path2.create()

  const obs1 = serialize({}, path1)
  const exp1 = [empty]
  t.deepEqual(obs1, exp1)

  const path2 = primitives.arc({ center: [5, 5], endAngle: 45, segments: 16 })

  const obs2 = serialize({}, path2)
  const exp2 = [lwpolyline0]
  t.deepEqual(obs2, exp2)

  // TODO
  // const path3 = geometries.path2.fromPoints({}, [[10, -20]])
  // path3 = path3.appendBezier([[10, -10], [25, -10], [25, -20]], { resolution: 8 })
  // t.is(path3.points.length, 6)

  // const obs3 = serialize({}, [path2, path3])
  // const exp3 = [lwpolyline1]
  // t.deepEqual(obs3, exp3)

  // TODO test multiple paths
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
4
  70
0
  10
6
  20
5
  10
5.943009745777588
  20
5.33276511140516
  10
5.778534761263023
  20
5.627601486219662
  10
5.525321988817728
  20
5.850903524534119
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
6
  70
0
  10
6
  20
5
  10
5.987688340595138
  20
5.156434465040231
  10
5.951056516295154
  20
5.3090169943749475
  10
5.891006524188368
  20
5.453990499739547
  10
5.8090169943749475
  20
5.587785252292473
  10
5.707106781186548
  20
5.707106781186548
  0
LWPOLYLINE
  5
CAD00003
  100
AcDbEntity
  3
CAD00003
  8
0
  67
0
  62
256
  100
AcDbPolyline
  90
6
  70
0
  10
10
  20
-20
  10
11.893004115226338
  20
-14.814814814814813
  10
16.25514403292181
  20
-12.592592592592593
  10
20.35131839658589
  20
-13.00411522633745
  10
23.647309861301636
  20
-15.473251028806589
  10
25
  20
-20
  0
ENDSEC
${dxfObjects({})}
  0
EOF
`
