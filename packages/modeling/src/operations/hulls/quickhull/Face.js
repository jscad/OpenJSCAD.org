const add = require('../../../maths/vec3/add')
const copy = require('../../../maths/vec3/copy')
const cross = require('../../../maths/vec3/cross')
const dot = require('../../../maths/vec3/dot')
const length = require('../../../maths/vec3/length')
const normalize = require('../../../maths/vec3/normalize')
const scale = require('../../../maths/vec3/scale')
const subtract = require('../../../maths/vec3/subtract')

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const HalfEdge = require('./HalfEdge')

const VISIBLE = 0
const NON_CONVEX = 1
const DELETED = 2

class Face {
  constructor () {
    this.normal = []
    this.centroid = []
    // signed distance from face to the origin
    this.offset = 0
    // pointer to the a vertex in a double linked list this face can see
    this.outside = null
    this.mark = VISIBLE
    this.edge = null
    this.nVertices = 0
  }

  getEdge (i) {
    if (typeof i !== 'number') {
      throw Error('requires a number')
    }
    let it = this.edge
    while (i > 0) {
      it = it.next
      i -= 1
    }
    while (i < 0) {
      it = it.prev
      i += 1
    }
    return it
  }

  computeNormal () {
    const e0 = this.edge
    const e1 = e0.next
    let e2 = e1.next
    const v2 = subtract([], e1.head().point, e0.head().point)
    const t = []
    const v1 = []

    this.nVertices = 2
    this.normal = [0, 0, 0]
    while (e2 !== e0) {
      copy(v1, v2)
      subtract(v2, e2.head().point, e0.head().point)
      add(this.normal, this.normal, cross(t, v1, v2))
      e2 = e2.next
      this.nVertices += 1
    }
    this.area = length(this.normal)
    // normalize the vector, since we've already calculated the area
    // it's cheaper to scale the vector using this quantity instead of
    // doing the same operation again
    this.normal = scale(this.normal, this.normal, 1 / this.area)
  }

  computeNormalMinArea (minArea) {
    this.computeNormal()
    if (this.area < minArea) {
      // compute the normal without the longest edge
      let maxEdge
      let maxSquaredLength = 0
      let edge = this.edge

      // find the longest edge (in length) in the chain of edges
      do {
        const lengthSquared = edge.lengthSquared()
        if (lengthSquared > maxSquaredLength) {
          maxEdge = edge
          maxSquaredLength = lengthSquared
        }
        edge = edge.next
      } while (edge !== this.edge)

      const p1 = maxEdge.tail().point
      const p2 = maxEdge.head().point
      const maxVector = subtract([], p2, p1)
      const maxLength = Math.sqrt(maxSquaredLength)
      // maxVector is normalized after this operation
      scale(maxVector, maxVector, 1 / maxLength)
      // compute the projection of maxVector over this face normal
      const maxProjection = dot(this.normal, maxVector)
      // subtract the quantity maxEdge adds on the normal
      scale(maxVector, maxVector, -maxProjection)
      add(this.normal, this.normal, maxVector)
      // renormalize `this.normal`
      normalize(this.normal, this.normal)
    }
  }

  computeCentroid () {
    this.centroid = [0, 0, 0]
    let edge = this.edge
    do {
      add(this.centroid, this.centroid, edge.head().point)
      edge = edge.next
    } while (edge !== this.edge)
    scale(this.centroid, this.centroid, 1 / this.nVertices)
  }

  computeNormalAndCentroid (minArea) {
    if (typeof minArea !== 'undefined') {
      this.computeNormalMinArea(minArea)
    } else {
      this.computeNormal()
    }
    this.computeCentroid()
    this.offset = dot(this.normal, this.centroid)
  }

  distanceToPlane (point) {
    return dot(this.normal, point) - this.offset
  }

  /**
   * @private
   *
   * Connects two edges assuming that prev.head().point === next.tail().point
   *
   * @param {HalfEdge} prev
   * @param {HalfEdge} next
   */
  connectHalfEdges (prev, next) {
    let discardedFace
    if (prev.opposite.face === next.opposite.face) {
      // `prev` is remove a redundant edge
      const oppositeFace = next.opposite.face
      let oppositeEdge
      if (prev === this.edge) {
        this.edge = next
      }
      if (oppositeFace.nVertices === 3) {
        // case:
        // remove the face on the right
        //
        //       /|\
        //      / | \ the face on the right
        //     /  |  \ --> opposite edge
        //    / a |   \
        //   *----*----*
        //  /     b  |  \
        //           ▾
        //      redundant edge
        //
        // Note: the opposite edge is actually in the face to the right
        // of the face to be destroyed
        oppositeEdge = next.opposite.prev.opposite
        oppositeFace.mark = DELETED
        discardedFace = oppositeFace
      } else {
        // case:
        //          t
        //        *----
        //       /| <- right face's redundant edge
        //      / | opposite edge
        //     /  |  ▴   /
        //    / a |  |  /
        //   *----*----*
        //  /     b  |  \
        //           ▾
        //      redundant edge
        oppositeEdge = next.opposite.next
        // make sure that the link `oppositeFace.edge` points correctly even
        // after the right face redundant edge is removed
        if (oppositeFace.edge === oppositeEdge.prev) {
          oppositeFace.edge = oppositeEdge
        }

        //       /|   /
        //      / | t/opposite edge
        //     /  | / ▴  /
        //    / a |/  | /
        //   *----*----*
        //  /     b     \
        oppositeEdge.prev = oppositeEdge.prev.prev
        oppositeEdge.prev.next = oppositeEdge
      }
      //       /|
      //      / |
      //     /  |
      //    / a |
      //   *----*----*
      //  /     b  ▴  \
      //           |
      //     redundant edge
      next.prev = prev.prev
      next.prev.next = next

      //       / \  \
      //      /   \->\
      //     /     \<-\ opposite edge
      //    / a     \  \
      //   *----*----*
      //  /     b  ^  \
      next.setOpposite(oppositeEdge)

      oppositeFace.computeNormalAndCentroid()
    } else {
      // trivial case
      //        *
      //       /|\
      //      / | \
      //     /  |--> next
      //    / a |   \
      //   *----*----*
      //    \ b |   /
      //     \  |--> prev
      //      \ | /
      //       \|/
      //        *
      prev.next = next
      next.prev = prev
    }
    return discardedFace
  }

  mergeAdjacentFaces (adjacentEdge, discardedFaces) {
    const oppositeEdge = adjacentEdge.opposite
    const oppositeFace = oppositeEdge.face

    discardedFaces.push(oppositeFace)
    oppositeFace.mark = DELETED

    // find the chain of edges whose opposite face is `oppositeFace`
    //
    //                ===>
    //      \         face         /
    //       * ---- * ---- * ---- *
    //      /     opposite face    \
    //                <===
    //
    let adjacentEdgePrev = adjacentEdge.prev
    let adjacentEdgeNext = adjacentEdge.next
    let oppositeEdgePrev = oppositeEdge.prev
    let oppositeEdgeNext = oppositeEdge.next

    // left edge
    while (adjacentEdgePrev.opposite.face === oppositeFace) {
      adjacentEdgePrev = adjacentEdgePrev.prev
      oppositeEdgeNext = oppositeEdgeNext.next
    }
    // right edge
    while (adjacentEdgeNext.opposite.face === oppositeFace) {
      adjacentEdgeNext = adjacentEdgeNext.next
      oppositeEdgePrev = oppositeEdgePrev.prev
    }
    // adjacentEdgePrev  \         face         / adjacentEdgeNext
    //                    * ---- * ---- * ---- *
    // oppositeEdgeNext  /     opposite face    \ oppositeEdgePrev

    // fix the face reference of all the opposite edges that are not part of
    // the edges whose opposite face is not `face` i.e. all the edges that
    // `face` and `oppositeFace` do not have in common
    let edge
    for (edge = oppositeEdgeNext; edge !== oppositeEdgePrev.next; edge = edge.next) {
      edge.face = this
    }

    // make sure that `face.edge` is not one of the edges to be destroyed
    // Note: it's important for it to be a `next` edge since `prev` edges
    // might be destroyed on `connectHalfEdges`
    this.edge = adjacentEdgeNext

    // connect the extremes
    // Note: it might be possible that after connecting the edges a triangular
    // face might be redundant
    let discardedFace
    discardedFace = this.connectHalfEdges(oppositeEdgePrev, adjacentEdgeNext)
    if (discardedFace) {
      discardedFaces.push(discardedFace)
    }
    discardedFace = this.connectHalfEdges(adjacentEdgePrev, oppositeEdgeNext)
    if (discardedFace) {
      discardedFaces.push(discardedFace)
    }

    this.computeNormalAndCentroid()
    // TODO: additional consistency checks
    return discardedFaces
  }

  collectIndices () {
    const indices = []
    let edge = this.edge
    do {
      indices.push(edge.head().index)
      edge = edge.next
    } while (edge !== this.edge)
    return indices
  }

  static createTriangle (v0, v1, v2, minArea = 0) {
    const face = new Face()
    const e0 = new HalfEdge(v0, face)
    const e1 = new HalfEdge(v1, face)
    const e2 = new HalfEdge(v2, face)

    // join edges
    e0.next = e2.prev = e1
    e1.next = e0.prev = e2
    e2.next = e1.prev = e0

    // main half edge reference
    face.edge = e0
    face.computeNormalAndCentroid(minArea)
    return face
  }
}

module.exports = {
  VISIBLE,
  NON_CONVEX,
  DELETED,
  Face
}
