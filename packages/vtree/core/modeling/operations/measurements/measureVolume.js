const { toArray } = require('./arrays')

const cacheWithInvalidation = require('./cacheWithInvalidation')
const cachedGenerator = require('./geometry-generator-cached')

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
