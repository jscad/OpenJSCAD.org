const poly3 = require('../poly3')
const toTriangles = require('./toTriangles')

const measureVolume = geometry => {
  let result = toTriangles(geometry).map(triPoly => poly3.getSignedVolume(triPoly))
  console.log('volume', result)
  return result
}

module.exports = measureVolume
