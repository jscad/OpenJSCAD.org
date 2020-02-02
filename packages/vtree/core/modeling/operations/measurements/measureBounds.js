const cacheWithInvalidation = require('./cacheWithInvalidation')
const cachedGenerator = require('./geometry-generator-cached')

/**
 * Unlike most 'virtual' functions measurement of bounds pre-computes the needed geometric data
 * needed: so it forces pre-evaluation of the given geometry, before the normal vtree evaluation
 *
 * @see http://
 * @param {Object} specials - hash of 'specials'
 * @returns {Function} the actual function made for measuring bounds
 **/
const makeMeasureBounds = specials => {
  const measureBounds = (solid) => {
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator([solid], cache)
    const bounds = operands[0].getBounds()
    specials.push({ cache, result: bounds })
    console.log('bounds', bounds)
    return bounds
  }
  return measureBounds
}

module.exports = makeMeasureBounds
