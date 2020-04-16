const { flatten } = require('@jscad/array-utils')

const extrudeRectangular = (params, ...objects) => {
  objects = flatten(objects)
  return { children: objects, type: 'extrudeRectangular', params }
}

module.exports = extrudeRectangular
