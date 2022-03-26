const test = require('ava')

const { colors, geometries, primitives } = require('@jscad/modeling')

const serializer = require('../src/index.js')

test('serialize (empty)', (t) => {
  const emptyShape = geometries.geom3.create()
  const buffer = serializer.serialize({ metadata: false, compress: false }, emptyShape)
  t.deepEqual(buffer, expected1)
})

test('serialize (single)', (t) => {
  const cube1 = primitives.cube()
  const buffer = serializer.serialize({ metadata: false, compress: false }, cube1)
  t.deepEqual(buffer, expected2)
})

test('serialize (single, color)', (t) => {
  let cube1 = primitives.cube()
  cube1 = colors.colorize([1.0, 0.0, 0.5, 0.8], cube1)
  const buffer = serializer.serialize({ metadata: false, compress: false, unit: 'inch' }, cube1)
  t.deepEqual(buffer, expected3)
})

test('serialize (multiple, color)', (t) => {
  let cube1 = primitives.cuboid({ size: [4, 5, 6], center: [5, 5, 5] })
  cube1 = colors.colorize([0.0, 0.0, 1.0, 0.8], cube1)
  cube1.name = "CUBE A"
  const cube2 = primitives.cube()
  cube2.name = "CUBE B"
  const buffer = serializer.serialize({ metadata: false, compress: false, defaultcolor: [1, 0, 0, 1] }, cube1, cube2)
  t.deepEqual(buffer, expected4)
})

test('serialize (multiple, compress)', (t) => {
  const cube1 = colors.colorize([1.0, 0.0, 0.5, 0.8], primitives.cube())
  cube1.name = "CUBE A"
  const cube2 = primitives.cuboid({ size: [4, 5, 6], center: [5, 5, 5] })
  cube2.name = "CUBE B"

  const results = serializer.serialize({ compress: true }, cube1, cube2)
  t.is(results.length, 1)
  const len = results[0].byteLength
  t.true(len > 1600)
})

const expected1 = [
  `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="und">
  <metadata name="Application">JSCAD</metadata>
  <resources>
    <basematerials id="0">
      <base name="mat0" displaycolor="#FFA000FF"/>
    </basematerials>
  </resources>
  <build>
    <item objectid="1"/>
  </build>
</model>
`
]

const expected2 = [
  `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="und">
  <metadata name="Application">JSCAD</metadata>
  <resources>
    <basematerials id="0">
      <base name="mat0" displaycolor="#FFA000FF"/>
    </basematerials>
    <object id="1" type="model" pid="0" pindex="0" name="Part 0">
      <mesh>
        <vertices>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="1" z="1"/>
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2"/>
          <triangle v1="3" v2="4" v3="5"/>
          <triangle v1="6" v2="7" v3="8"/>
          <triangle v1="9" v2="10" v3="11"/>
          <triangle v1="12" v2="13" v3="14"/>
          <triangle v1="15" v2="16" v3="17"/>
          <triangle v1="18" v2="19" v3="20"/>
          <triangle v1="21" v2="22" v3="23"/>
          <triangle v1="24" v2="25" v3="26"/>
          <triangle v1="27" v2="28" v3="29"/>
          <triangle v1="30" v2="31" v3="32"/>
          <triangle v1="33" v2="34" v3="35"/>
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1"/>
  </build>
</model>
`
]

const expected3 = [
  `<?xml version="1.0" encoding="UTF-8"?>
<model unit="inch" xml:lang="und">
  <metadata name="Application">JSCAD</metadata>
  <resources>
    <basematerials id="0">
      <base name="mat0" displaycolor="#FF007FCC"/>
    </basematerials>
    <object id="1" type="model" pid="0" pindex="0" name="Part 0">
      <mesh>
        <vertices>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="1" z="1"/>
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2"/>
          <triangle v1="3" v2="4" v3="5"/>
          <triangle v1="6" v2="7" v3="8"/>
          <triangle v1="9" v2="10" v3="11"/>
          <triangle v1="12" v2="13" v3="14"/>
          <triangle v1="15" v2="16" v3="17"/>
          <triangle v1="18" v2="19" v3="20"/>
          <triangle v1="21" v2="22" v3="23"/>
          <triangle v1="24" v2="25" v3="26"/>
          <triangle v1="27" v2="28" v3="29"/>
          <triangle v1="30" v2="31" v3="32"/>
          <triangle v1="33" v2="34" v3="35"/>
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1"/>
  </build>
</model>
`
]

const expected4 = [`<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="und">
  <metadata name="Application">JSCAD</metadata>
  <resources>
    <basematerials id="0">
      <base name="mat0" displaycolor="#0000FFCC"/>
      <base name="mat1" displaycolor="#FF0000FF"/>
    </basematerials>
    <object id="1" type="model" pid="0" pindex="0" name="CUBE A">
      <mesh>
        <vertices>
          <vertex x="3" y="2.5" z="2"/>
          <vertex x="3" y="2.5" z="8"/>
          <vertex x="3" y="7.5" z="8"/>
          <vertex x="3" y="2.5" z="2"/>
          <vertex x="3" y="7.5" z="8"/>
          <vertex x="3" y="7.5" z="2"/>
          <vertex x="7" y="2.5" z="2"/>
          <vertex x="7" y="7.5" z="2"/>
          <vertex x="7" y="7.5" z="8"/>
          <vertex x="7" y="2.5" z="2"/>
          <vertex x="7" y="7.5" z="8"/>
          <vertex x="7" y="2.5" z="8"/>
          <vertex x="3" y="2.5" z="2"/>
          <vertex x="7" y="2.5" z="2"/>
          <vertex x="7" y="2.5" z="8"/>
          <vertex x="3" y="2.5" z="2"/>
          <vertex x="7" y="2.5" z="8"/>
          <vertex x="3" y="2.5" z="8"/>
          <vertex x="3" y="7.5" z="2"/>
          <vertex x="3" y="7.5" z="8"/>
          <vertex x="7" y="7.5" z="8"/>
          <vertex x="3" y="7.5" z="2"/>
          <vertex x="7" y="7.5" z="8"/>
          <vertex x="7" y="7.5" z="2"/>
          <vertex x="3" y="2.5" z="2"/>
          <vertex x="3" y="7.5" z="2"/>
          <vertex x="7" y="7.5" z="2"/>
          <vertex x="3" y="2.5" z="2"/>
          <vertex x="7" y="7.5" z="2"/>
          <vertex x="7" y="2.5" z="2"/>
          <vertex x="3" y="2.5" z="8"/>
          <vertex x="7" y="2.5" z="8"/>
          <vertex x="7" y="7.5" z="8"/>
          <vertex x="3" y="2.5" z="8"/>
          <vertex x="7" y="7.5" z="8"/>
          <vertex x="3" y="7.5" z="8"/>
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2"/>
          <triangle v1="3" v2="4" v3="5"/>
          <triangle v1="6" v2="7" v3="8"/>
          <triangle v1="9" v2="10" v3="11"/>
          <triangle v1="12" v2="13" v3="14"/>
          <triangle v1="15" v2="16" v3="17"/>
          <triangle v1="18" v2="19" v3="20"/>
          <triangle v1="21" v2="22" v3="23"/>
          <triangle v1="24" v2="25" v3="26"/>
          <triangle v1="27" v2="28" v3="29"/>
          <triangle v1="30" v2="31" v3="32"/>
          <triangle v1="33" v2="34" v3="35"/>
        </triangles>
      </mesh>
    </object>
    <object id="2" type="model" pid="0" pindex="1" name="CUBE B">
      <mesh>
        <vertices>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="-1" y="1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="-1" y="1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="-1" y="-1" z="-1"/>
          <vertex x="1" y="1" z="-1"/>
          <vertex x="1" y="-1" z="-1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="1" y="-1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="-1" z="1"/>
          <vertex x="1" y="1" z="1"/>
          <vertex x="-1" y="1" z="1"/>
        </vertices>
        <triangles>
          <triangle v1="0" v2="1" v3="2"/>
          <triangle v1="3" v2="4" v3="5"/>
          <triangle v1="6" v2="7" v3="8"/>
          <triangle v1="9" v2="10" v3="11"/>
          <triangle v1="12" v2="13" v3="14"/>
          <triangle v1="15" v2="16" v3="17"/>
          <triangle v1="18" v2="19" v3="20"/>
          <triangle v1="21" v2="22" v3="23"/>
          <triangle v1="24" v2="25" v3="26"/>
          <triangle v1="27" v2="28" v3="29"/>
          <triangle v1="30" v2="31" v3="32"/>
          <triangle v1="33" v2="34" v3="35"/>
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1"/>
    <item objectid="2"/>
  </build>
</model>
`
]
