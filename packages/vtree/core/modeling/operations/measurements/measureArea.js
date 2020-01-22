const { toArray } = require('./arrays')

const cacheWithInvalidation = require('./cacheWithInvalidation')
const cachedGenerator = require('./geometry-generator-cached')

const makeMeasureArea = specials => {
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