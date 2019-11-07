const create = require('./create')
const geom2 = require('../geometry/geom2')

const fromPoints = points => {
  const geometry = geom2.fromPoints(points)
  const newShape = create()
  newShape.geometry = geometry
  return newShape
}

module.exports = fromPoints
