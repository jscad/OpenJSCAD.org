// const { cylinder } = require('@jscad/modeling').primitives
// const { expand } = require('@jscad/modeling').transforms
// const { colorize, colorNameToRgb } = require('@jscad/modeling').colors

const { cylinder } = require('@jscad/modeling').primitives
const { rotate } = require('@jscad/modeling').transforms
const { subtract } = require('@jscad/modeling').booleans

// MAGIIIIC ?
// no, it is require.extensions ! + jscad deserializers
const sculpture = require('./3d_sculpture-VernonBussler.stl')

const main = () => {
  return subtract(
    sculpture,
    rotate([0, 90, 0], cylinder({ d: 10, h: 40 }))
  )
}

module.exports = { main }
