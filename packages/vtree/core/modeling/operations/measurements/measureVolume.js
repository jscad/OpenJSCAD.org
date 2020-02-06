const { toArray } = require('@jscad/array-utils')

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
  const measureVolume = (...solids) => {
    solids = toArray(solids)
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator(solids, cache)

    const volume = operands.reduce((acc, csg) => {
      let tmpArea = csg.toTriangles().reduce(function (accSub, triPoly) {
        return accSub + triPoly.getTetraFeatures(['volume'])[0]
      }, 0)
      return acc + tmpArea
    }, 0)

    specials.push({ cache, result: volume })
    console.log('volume', volume)

    return volume
  }
  return measureVolume
}

module.exports = makeMeasureVolume
