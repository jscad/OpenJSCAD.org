const measureBounds = require('@jscad/modeling').measurements.measureBounds

const cacheWithInvalidation = require('../../../cacheWithInvalidation')
const cachedGenerator = require('../../../generators/geometry-generator-cached-csg')

/**
 * Unlike most 'virtual' functions measurement of bounds pre-computes the needed geometric data
 * needed: so it forces pre-evaluation of the given geometry, before the normal vtree evaluation
 *
 * @see http://
 * @param {Object} specials - hash of 'specials'
 * @returns {Function} the actual function made for measuring bounds
 **/
const makeMeasureBounds = specials => {
  const _measureBounds = (solids) => {
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator([solids], cache)
    const bounds = measureBounds(operands)
    specials.push({ cache, result: bounds })
    return bounds
  }
  return _measureBounds
}

module.exports = makeMeasureBounds
