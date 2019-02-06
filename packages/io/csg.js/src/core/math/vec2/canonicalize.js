const { spatialResolution } = require('../../constants')
const fromValues = require('./fromValues');

const quantize = (value) => (Math.round(value * spatialResolution) / spatialResolution)

const canonicalize = (vector) => fromValues(quantize(vector[0]), quantize(vector[1]))

module.exports = canonicalize
