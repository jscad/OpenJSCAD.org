const { cube } = require('@jscad/modeling').primitives

const mountPlate = (length) => {
  return cube({ size: [length, 1, 1] })
}

module.exports = mountPlate
