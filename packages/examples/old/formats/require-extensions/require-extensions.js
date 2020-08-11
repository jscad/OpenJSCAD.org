const { cylinder } = require('@jscad/core').primitives3d
const { rotate } = require('@jscad/csg/api').transformations
const { difference } = require('@jscad/csg/api').booleanOps

// MAGIIIIC ?
// no, it is require.extensions ! + jscad deserializers
const sculpture = require('./3d_sculpture-VernonBussler.stl')

const main = () => {
  return difference(
    sculpture,
    rotate([0, 90, 0], cylinder({ d: 10, h: 40 }))
  )
}

module.exports = { main }
