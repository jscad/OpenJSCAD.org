const poly3 = require('../poly3')
const toTriangles = require('./toTriangles')

const measureArea = geometry => {
  let result = toTriangles(geometry).map(triPoly => poly3.measureArea(triPoly))
  console.log('area', result)
  return result
}

module.exports = measureArea
