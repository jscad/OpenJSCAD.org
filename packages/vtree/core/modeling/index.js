const modeling = require('@jscad/modeling') // FIXME: not ideal

// we likely need to wrap the api in a function, to handle special cases like measurements in the future
// const makeModelingApi = ()

let specials = []
const measureArea = require('./operations/measurements/measureArea')(specials)
const measureVolume = require('./operations/measurements/measureVolume')(specials)
const measureBounds = require('./operations/measurements/measureBounds')(specials)

module.exports = {
  color: require('./color'),
  connectors: modeling.connectors,
  geometry: modeling.geometry,
  math: modeling.math,
  primitives: require('./primitives'),
  // text: require('./text'),
  utils: modeling.utils,

  booleans: require('./operations/booleans'),
  expansions: require('./operations/expansions'),
  extrusions: require('./operations/extrusions'),
  hulls: require('./operations/hulls'),
  measurements: require('./operations/measurements'),
  transforms: require('./operations/transforms'),

  // specials
  specials
}
