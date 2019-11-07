const measureBounds2d = require('../../core/geometry/shape2/measureBounds')
const measureBounds3d = require('../../core/geometry/shape3/measureBounds')

const {isShape2} = require('../../core/utils/typeChecks')

const bounds = input => {
  return isShape2(input) ? measureBounds2d(input) : measureBounds3d(input)
}

module.exports = bounds
