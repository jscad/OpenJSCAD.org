const measureArea2d = require('../../core/geometry/shape2/measureArea')
const measureArea3d = require('../../core/geometry/shape3/measureArea')

const {isShape2} = require('../../core/utils/typeChecks')

const area = input => {
  return isShape2(input) ? measureArea2d(input) : measureArea3d(input)
}

module.exports = area
