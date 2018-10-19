const vert3 = require('../vert3')
const poly3 = require('../poly3')

const toPoly3 = function (side, z0, z1) {
  // console.log(this.vertex0.pos)
  const vertices = [
    vert3.fromVector2(side.vertex0.pos, z0),
    vert3.fromVector2(side.vertex1.pos, z0),
    vert3.fromVector2(side.vertex1.pos, z1),
    vert3.fromVector2(side.vertex0.pos, z1)
  ]
  return poly3.fromData(vertices)
}

module.exports = toPoly3
