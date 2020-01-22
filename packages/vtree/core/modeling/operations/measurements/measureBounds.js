const { toArray } = require('./arrays')

const cacheWithInvalidation = require('./cacheWithInvalidation')
const cachedGenerator = require('./geometry-generator-cached')

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
