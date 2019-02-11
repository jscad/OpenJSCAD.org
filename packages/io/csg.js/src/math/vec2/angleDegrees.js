const angleRadians = require('./angleRadians')

const { radToDeg } = require('../utils')

const angleDegrees = vector => {
  return radToDeg(angleRadians(vector))
}

module.exports = angleDegrees
