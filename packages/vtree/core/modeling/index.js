const modeling = require('@jscad/modeling') // FIXME: not ideal

module.exports = {
  color: require('./color'),
  connectors: modeling.connectors,
  geometry: modeling.geometry,
  math: modeling.math,
  primitives: require('./primitives'),
  text: require('./text'),
  utils: modeling.utils,

  booleans: require('./operations/booleans'),
  expansions: require('./operations/expansions'),
  extrusions: require('./operations/extrusions'),
  hulls: require('./operations/hulls'),
  measurements: require('./operations/measurements'),
  transforms: require('./operations/transforms')
}
