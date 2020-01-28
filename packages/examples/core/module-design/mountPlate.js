const { cuboid } = require('@jscad/modeling').primitives

const mountPlate = (length) => {
  return cuboid({ size: [length, 10, 1] })
}

module.exports = mountPlate
