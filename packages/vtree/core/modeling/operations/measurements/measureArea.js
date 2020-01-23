const { toArray } = require('./arrays')

const cacheWithInvalidation = require('./cacheWithInvalidation')
const cachedGenerator = require('./geometry-generator-cached')

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
  const measureArea = (...solids) => {
    // console.log('measure area in overlay api', solids)
    // console.log(arguments[1])
    solids = toArray(solids)
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator(solids, cache)

    const area = operands.reduce((acc, csg) => {
      let tmpArea = csg.toTriangles().reduce(function (accSub, triPoly) {
        return accSub + triPoly.getTetraFeatures(['area'])[0]
      }, 0)
      return acc + tmpArea
    }, 0)

    specials.push({ cache, result: area })
    console.log('area', area)

    return area
  }
  return measureArea
}

module.exports = makeMeasureArea