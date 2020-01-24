const { sphere } = require('@jscad/modeling').primitives

const sphereShape = (radius) => {
  return sphere({ radius })
}

module.exports = sphereShape
