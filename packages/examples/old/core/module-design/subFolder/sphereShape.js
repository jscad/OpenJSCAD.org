const { sphere } = require('@jscad/modeling').primitives
const color = require('@jscad/modeling').color.color

const sphereShape = (radius) => {
  return color([1, 0, 0, 1], sphere({ radius }))
}

module.exports = sphereShape
