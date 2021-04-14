const test = require('ava')

const { colors, geometries, primitives, transforms } = require('@jscad/modeling')

const serializer = require('../index.js')

test('serialize 3D geometry to X3D', (t) => {
  const geom1 = geometries.geom3.create()

  const observed1 = serializer.serialize({}, geom1)
  t.deepEqual(observed1, [expected1])

  const geom2 = primitives.cube()

  const observed2 = serializer.serialize({}, geom2)
  t.deepEqual(observed2, [expected2])

  const geom3 = colors.colorize([0.5, 1, 0.5, 1.0], transforms.center({ relativeTo: [5, 5, 5] }, primitives.cube()))

  const observed3 = serializer.serialize({}, geom2, geom3)
  t.deepEqual(observed3, [expected3])
})

const expected1 = `<?xml version="1.0" encoding="UTF-8"?>
<X3D profile="Interchange" version="3.3" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.3.xsd">
  <head>
    <meta name="creator" content="Created by JSCAD"/>
  </head>
  <Scene/>
</X3D>
`

const expected2 = `<?xml version="1.0" encoding="UTF-8"?>
<X3D profile="Interchange" version="3.3" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.3.xsd">
  <head>
    <meta name="creator" content="Created by JSCAD"/>
  </head>
  <Scene>
    <Shape>
      <IndexedTriangleSet ccw="true" colorPerVertex="false" solid="false" index="0 1 2 0 2 3 4 5 6 4 6 7 0 4 7 0 7 1 3 2 6 3 6 5 0 3 5 0 5 4 1 7 6 1 6 2">
        <Coordinate point="-1 -1 -1 -1 -1 1 -1 1 1 -1 1 -1 1 -1 -1 1 1 -1 1 1 1 1 -1 1"/>
        <Color color="0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1"/>
      </IndexedTriangleSet>
    </Shape>
  </Scene>
</X3D>
`

const expected3 = `<?xml version="1.0" encoding="UTF-8"?>
<X3D profile="Interchange" version="3.3" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.3.xsd">
  <head>
    <meta name="creator" content="Created by JSCAD"/>
  </head>
  <Scene>
    <Shape>
      <IndexedTriangleSet ccw="true" colorPerVertex="false" solid="false" index="0 1 2 0 2 3 4 5 6 4 6 7 0 4 7 0 7 1 3 2 6 3 6 5 0 3 5 0 5 4 1 7 6 1 6 2">
        <Coordinate point="-1 -1 -1 -1 -1 1 -1 1 1 -1 1 -1 1 -1 -1 1 1 -1 1 1 1 1 -1 1"/>
        <Color color="0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1"/>
      </IndexedTriangleSet>
    </Shape>
    <Shape>
      <IndexedTriangleSet ccw="true" colorPerVertex="false" solid="false" index="0 1 2 0 2 3 4 5 6 4 6 7 0 4 7 0 7 1 3 2 6 3 6 5 0 3 5 0 5 4 1 7 6 1 6 2">
        <Coordinate point="4 4 4 4 4 6 4 6 6 4 6 4 6 4 4 6 6 4 6 6 6 6 4 6"/>
        <Color color="0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5 0.5 1 0.5"/>
      </IndexedTriangleSet>
    </Shape>
  </Scene>
</X3D>
`
