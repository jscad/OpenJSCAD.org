/*
JSCAD Geometry to STL Format Serialization

## License

Copyright (c) 2018-2019 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     none
2) geom3 conversion to:
     STL mesh
3) path2 conversion to:
     none
*/

const { geometry } = require('@jscad/csg')

const { serializeBinary } = require('./CSGToStlb')
const { serializeText } = require('./CSGToStla')

const mimeType = 'application/sla'

const serialize = (options, ...objects) => {
  const defaults = {
    binary: true,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  // TBD flatten the objects

  // convert only 3D geometries
  objects = objects.filter((object) => geometry.geom3.isA(object))

  if (objects.length === 0) throw new Error('the given objects cannot be converted')

  return options.binary ? serializeBinary(objects, options) : serializeText(objects, options)
}

module.exports = {
  mimeType,
  serialize
}
