module.exports = angleDegrees

const angleRadians = require('./angleRadians')

function angleDegrees (vector) {
  // y=sin, x=cos
  const radians = angleRadians(vector)
  return 180 * radians / Math.PI
}
