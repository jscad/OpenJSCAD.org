const { toArray } = require('./arrays')

const extrudeRectangular = (solids, params) => {
  console.log('extrudeRectangular')
  solids = toArray(solids)
  return { children: solids, type: 'extrudeRectangular', params }
}

module.exports = extrudeRectangular
