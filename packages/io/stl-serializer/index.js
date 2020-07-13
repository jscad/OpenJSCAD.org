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

const { geometries, utils } = require('@jscad/modeling')

const { serializeBinary } = require('./CSGToStlb')
const { serializeText } = require('./CSGToStla')

const mimeType = 'application/sla'

const serialize = (options, ...objects) => {
  const defaults = {
    binary: true,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = utils.flatten(objects)

  // convert only 3D geometries
  const objects3d = objects.filter((object) => geometries.geom3.isA(object))

  if (objects3d.length === 0) throw new Error('only 3D geometries can be serialized to STL')
  if (objects.length !== objects3d.length) console.warn('some objects could not be serialized to STL')

  return options.binary ? serializeBinary(objects3d, options) : serializeText(objects3d, options)
}

module.exports = {
  mimeType,
  serialize
}
