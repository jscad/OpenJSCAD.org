const poly3 = require('../poly3')

const volume = function (shape3) {
  let result = shape3.toTriangles().map(triPoly => poly3.getSignedVolume(triPoly))
  console.log('volume', result)
  return result
}

module.exports = volume
