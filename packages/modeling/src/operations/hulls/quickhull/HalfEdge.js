const distance = require('../../../math/vec3/distance')
const squaredDistance = require('../../../math/vec3/squaredDistance')

class HalfEdge {
  constructor (vertex, face) {
    this.vertex = vertex
    this.face = face
    this.next = null
    this.prev = null
    this.opposite = null
  }

  head () {
    return this.vertex
  }

  tail () {
    return this.prev
      ? this.prev.vertex
      : null
  }

  length () {
    if (this.tail()) {
      return distance(
        this.tail().point,
        this.head().point
      )
    }
    return -1
  }

  lengthSquared () {
    if (this.tail()) {
      return squaredDistance(
        this.tail().point,
        this.head().point
      )
    }
    return -1
  }

  setOpposite (edge) {
    this.opposite = edge
    edge.opposite = this
  }
}

module.exports = HalfEdge
