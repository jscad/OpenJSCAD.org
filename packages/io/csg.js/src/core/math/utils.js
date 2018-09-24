// degrees = radians * 180 / PI
const radToDeg = radians => radians * 57.29577951308232
// radians = degrees * PI / 180
const degToRad = degrees => degrees * 0.017453292519943295

module.exports = {radToDeg, degToRad}
