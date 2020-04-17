const { flatten } = require('@jscad/array-utils')
const measureArea = require('@jscad/modeling').measurements.measureArea

const cacheWithInvalidation = require('../../../cacheWithInvalidation')
const cachedGenerator = require('../../../generators/geometry-generator-cached-csg')

/**
 * Unlike most 'virtual' functions measurement of areas pre-computes the needed geometric data
 * needed: so it forces pre-evaluation of the given geometry, before the normal vtree evaluation
 *
 * @see http://
 * @param {Object} specials - hash of 'specials'
 * @returns {Function} the actual function made for measuring areas
 **/
const makeMeasureArea = specials => {
  /**
 * Measure the area of the given geometry.
 *
 * @see http://paulbourke.net/geometry/polygonmesh/
 * @param {geom2} geometry - 2D geometry to measure
 * @returns {Number} area of the geometry
 **/
  const _measureArea = (...objects) => {
    objects = flatten(objects)
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator(objects, cache)

    const area = measureArea(operands)
    specials.push({ cache, result: area })

    return area
  }
  return _measureArea
}

module.exports = makeMeasureArea
