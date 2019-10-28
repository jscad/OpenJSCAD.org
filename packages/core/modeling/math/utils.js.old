const { spatialResolution } = require('../constants')

// Quantize values for use in spatial coordinates, and so on.
const quantizeForSpace = (value) => (Math.round(value * spatialResolution) / spatialResolution)

// degrees = radians * 180 / PI
const radToDeg = radians => radians * 57.29577951308232

// radians = degrees * PI / 180
const degToRad = degrees => degrees * 0.017453292519943295

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

module.exports = { radToDeg, degToRad, clamp, quantizeForSpace }
