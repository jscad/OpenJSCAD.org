const test = require('ava')
const {CSG} = require('@jscad/csg')
const serializer = require('./index.js')

test('serialize CSG objects to X3D', function (t) {
  const csg1 = new CSG()

  const observed1 = serializer.serialize({}, csg1)
  t.deepEqual(observed1, [expected1])

  const csg2 = new CSG.cube()

  const observed2 = serializer.serialize({}, csg2)
  t.deepEqual(observed2, [expected2])

  const csg3 = new CSG.cube({center: [5, 5, 5]}).setColor([0.5, 1, 0.5])

  const observed3 = serializer.serialize({}, [csg2, csg3])
  t.deepEqual(observed3, [expected3])
})

const expected1 = `<?xml version="1.0" encoding="UTF-8"?>
<X3D profile="Interchange" version="3.3" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.3.xsd">
  <head>
    <meta name="creator" content="Created using JSCAD"/>
  </head>
  <Scene/>
</X3D>
`

const expected2 = `<?xml version="1.0" encoding="UTF-8"?>
<X3D profile="Interchange" version="3.3" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.3.xsd">
  <head>
    <meta name="creator" content="Created using JSCAD"/>
  </head>
  <Scene>
    <Shape>
      <IndexedTriangleSet ccw="true" colorPerVertex="false" solid="false" index="0 1 2 0 3 1 4 5 6 4 7 5 0 6 3 0 4 6 2 5 7 2 1 5 0 7 4 0 2 7 3 5 1 3 6 5">
        <Coordinate point="-1 -1 -1 -1 1 1 -1 1 -1 -1 -1 1 1 -1 -1 1 1 1 1 -1 1 1 1 -1"/>
        <Color color="0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1"/>
      </IndexedTriangleSet>
    </Shape>
  </Scene>
</X3D>
`

const expected3 = `<?xml version="1.0" encoding="UTF-8"?>
<X3D profile="Interchange" version="3.3" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.3.xsd">
  <head>
    <meta name="creator" content="Created using JSCAD"/>
  </head>
  <Scene>
    <Shape>
      <IndexedTriangleSet ccw="true" colorPerVertex="false" solid="false" index="0 1 2 0 3 1 4 5 6 4 7 5 0 6 3 0 4 6 2 5 7 2 1 5 0 7 4 0 2 7 3 5 1 3 6 5">
        <Coordinate point="-1 -1 -1 -1 1 1 -1 1 -1 -1 -1 1 1 -1 -1 1 1 1 1 -1 1 1 1 -1"/>
        <Color color="0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1"/>
      </IndexedTriangleSet>
    </Shape>
    <Shape>
      <IndexedTriangleSet ccw=\"true\" colorPerVertex=\"false\" solid=\"false\" index=\"0 1 2 0 3 1 4 5 6 4 7 5 0 6 3 0 4 6 2 5 7 2 1 5 0 7 4 0 2 7 3 5 1 3 6 5\">
        <Coordinate point=\"4 4 4 4 6 6 4 6 4 4 4 6 6 4 4 6 6 6 6 4 6 6 6 4\"/>
        <Color color=\"0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5\"/>
      </IndexedTriangleSet>
    </Shape>
  </Scene>
</X3D>
`
