const { flatten } = require('@jscad/array-utils')
const measureVolume = require('@jscad/modeling').measurements.measureVolume

const cacheWithInvalidation = require('../../../cacheWithInvalidation')
const cachedGenerator = require('../../../generators/geometry-generator-cached-csg')

/**
 * Unlike most 'virtual' functions measurement of volumes pre-computes the needed geometric data
 * needed: so it forces pre-evaluation of the given geometry, before the normal vtree evaluation
 *
 * @see http://
 * @param {Object} specials - hash of 'specials'
 * @returns {Function} the actual function made for measuring volumes
 **/
const makeMeasureVolume = specials => {
  const _measureVolume = (...objects) => {
    objects = flatten(objects)
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator(objects, cache)

    const volume = measureVolume(operands)
    specials.push({ cache, result: volume })
    return volume
  }
  return _measureVolume
}

module.exports = makeMeasureVolume
