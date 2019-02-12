const fromValues = require('./fromValues');
const { quantizeForSpace } = require('../utils')

const canonicalize = (vector) => fromValues(quantizeForSpace(vector[0]),
                                            quantizeForSpace(vector[1]),
                                            quantizeForSpace(vector[2]))

module.exports = canonicalize
