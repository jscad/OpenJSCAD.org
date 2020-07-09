const { spatialResolution } = require('../constants')

// Quantize values for use in spatial coordinates, and so on.
const quantizeForSpace = (value) => (Math.round(value * spatialResolution) / spatialResolution)

module.exports = quantizeForSpace
