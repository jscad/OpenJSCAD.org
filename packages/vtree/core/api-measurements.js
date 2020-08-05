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
      const tmpArea = csg.toTriangles().reduce(function (accSub, triPoly) {
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

const makeMeasureVolume = specials => {
  const measureVolume = (...solids) => {
    solids = toArray(solids)
    // we create a premptive cache
    const cache = cacheWithInvalidation()
    const operands = cachedGenerator(solids, cache)

    const volume = operands.reduce((acc, csg) => {
      const tmpArea = csg.toTriangles().reduce(function (accSub, triPoly) {
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

module.exports = { makeMeasureArea, makeMeasureVolume, makeMeasureBounds }
