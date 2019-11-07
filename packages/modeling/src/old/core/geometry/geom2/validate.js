const { areaEPS } = require('../../constants')
const measureArea = require('../../shape2/measureArea')
const isSelfIntersecting = require('./validateIsSelfIntersecting')

// check if we are a valid shape2 (for debugging)
// NOTE(bebbi) uneven side count doesn't work because rounding with EPS isn't taken into account
const isCAGValid = function (shape) {
  let errors = []
  if (isSelfIntersecting(shape)) {
    errors.push('Self intersects')
  }
  let pointcount = {}
  shape.sides.map(function (side) {
    function mappoint (p) {
      let tag = p[0] + ' ' + p[1]
      if (!(tag in pointcount)) pointcount[tag] = 0
      pointcount[tag]++
    }
    mappoint(side[0])
    mappoint(side[1])
  })
  for (let tag in pointcount) {
    let count = pointcount[tag]
    if (count & 1) {
      errors.push('Uneven number of sides (' + count + ') for point ' + tag)
    }
  }
  let area = measureArea()
  if (area < areaEPS) {
    errors.push('Area is ' + area)
  }
  if (errors.length > 0) {
    let ertxt = ''
    errors.map(function (err) {
      ertxt += err + '\n'
    })
    throw new Error(ertxt)
  }
}

module.exports = isCAGValid
