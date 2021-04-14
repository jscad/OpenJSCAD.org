const modeling = require('@jscad/modeling') // FIXME: not ideal

// TODO: we likely need to wrap the api in a function, to handle special cases like measurements in the future
// const makeModelingApi = ()

const specials = []
require('./operations/measurements/measureArea')(specials)
require('./operations/measurements/measureVolume')(specials)
require('./operations/measurements/measureBounds')(specials)

module.exports = {
  colors: require('./color'),
  connectors: modeling.connectors,
  geometry: modeling.geometry,
  maths: modeling.maths,
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
