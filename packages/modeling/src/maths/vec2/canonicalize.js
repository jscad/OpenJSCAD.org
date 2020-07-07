const fromValues = require('./fromValues')
const quantizeForSpace = require('../utils/quantizeForSpace')

const canonicalize = (vector) => fromValues(quantizeForSpace(vector[0]),
  quantizeForSpace(vector[1]))

module.exports = canonicalize
