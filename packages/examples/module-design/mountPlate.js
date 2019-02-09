const {cube} = require('@jscad/csg/api').primitives3d

const mountPlate = (length) => {
  return cube({size: [length, 1, 1]})
}

module.exports = mountPlate
