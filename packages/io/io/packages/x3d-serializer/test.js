const test = require('ava')
const {CSG} = require('@jscad/csg')
const serializer = require('./index.js')

test('serialize csg to x3d', function (t) {
  const input = new CSG.cube()
  const expected = [ '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE X3D PUBLIC "ISO//Web3D//DTD X3D 3.1//EN" "http://www.web3d.org/specifications/x3d-3.1.dtd"><X3D profile="Interchange" version="3.1" xsd:noNamespaceSchemaLocation="http://www.web3d.org/specifications/x3d-3.1.xsd" xmlns:xsd="http://www.w3.org/2001/XMLSchema-instance"><Scene><Shape><Appearance><Material diffuseColor="0 0 1" ambientIntensity="1.0"/></Appearance><IndexedFaceSet solid="true" coordIndex="0 1 2 3 -1 4 5 6 7 -1 0 4 7 1 -1 3 2 6 5 -1 0 3 5 4 -1 1 7 6 2 -1"><Coordinate DEF="coords_mesh" point="-1 -1 -1 -1 -1 1 -1 1 1 -1 1 -1 1 -1 -1 1 1 -1 1 1 1 1 -1 1"/></IndexedFaceSet></Shape></Scene></X3D>' ]
  const observed = serializer.serialize(input, {binary: true})

  t.deepEqual(observed, expected)
})
