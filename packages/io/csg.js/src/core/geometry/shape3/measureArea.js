const poly3 = require('../poly3')
const area = function (shape3) {
  let result = shape3.toTriangles().map(triPoly => poly3.measureArea())
  console.log('area', result)
  return result
}

module.exports = area
