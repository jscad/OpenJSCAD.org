const { flatten } = require('@jscad/array-utils')

const extrudeRectangular = (solids, params) => {
  console.log('extrudeRectangular')
  objects = flatten(objects)
  return { children: objects, type: 'extrudeRectangular', params }
}

module.exports = extrudeRectangular
