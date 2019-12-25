/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

class Vertex {
  constructor (point, index) {
    this.point = point
    // index in the input array
    this.index = index
    // vertex is a double linked list node
    this.next = null
    this.prev = null
    // the face that is able to see this point
    this.face = null
  }
}

module.exports = Vertex
