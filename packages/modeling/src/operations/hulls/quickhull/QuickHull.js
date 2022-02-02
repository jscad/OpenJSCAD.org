const dot = require('../../../maths/vec3/dot')

const pointLineDistance = require('./point-line-distance')
const getPlaneNormal = require('./get-plane-normal')

const VertexList = require('./VertexList')
const Vertex = require('./Vertex')
const { Face, VISIBLE, NON_CONVEX, DELETED } = require('./Face')

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

// merge types
// non convex with respect to the large face
const MERGE_NON_CONVEX_WRT_LARGER_FACE = 1
const MERGE_NON_CONVEX = 2

class QuickHull {
  constructor (points) {
    if (!Array.isArray(points)) {
      throw TypeError('input is not a valid array')
    }
    if (points.length < 4) {
      throw Error('cannot build a simplex out of <4 points')
    }

    this.tolerance = -1

    // buffers
    this.nFaces = 0
    this.nPoints = points.length

    this.faces = []
    this.newFaces = []
    // helpers
    //
    // let `a`, `b` be `Face` instances
    // let `v` be points wrapped as instance of `Vertex`
    //
    //     [v, v, ..., v, v, v, ...]
    //      ^             ^
    //      |             |
    //  a.outside     b.outside
    //
    this.claimed = new VertexList()
    this.unclaimed = new VertexList()

    // vertices of the hull(internal representation of points)
    this.vertices = []
    for (let i = 0; i < points.length; i += 1) {
      this.vertices.push(new Vertex(points[i], i))
    }
    this.discardedFaces = []
    this.vertexPointIndices = []
  }

  addVertexToFace (vertex, face) {
    vertex.face = face
    if (!face.outside) {
      this.claimed.add(vertex)
    } else {
      this.claimed.insertBefore(face.outside, vertex)
    }
    face.outside = vertex
  }

  /**
   * Removes `vertex` for the `claimed` list of vertices, it also makes sure
   * that the link from `face` to the first vertex it sees in `claimed` is
   * linked correctly after the removal
   *
   * @param {Vertex} vertex
   * @param {Face} face
   */
  removeVertexFromFace (vertex, face) {
    if (vertex === face.outside) {
      // fix face.outside link
      if (vertex.next && vertex.next.face === face) {
        // face has at least 2 outside vertices, move the `outside` reference
        face.outside = vertex.next
      } else {
        // vertex was the only outside vertex that face had
        face.outside = null
      }
    }
    this.claimed.remove(vertex)
  }

  /**
   * Removes all the visible vertices that `face` is able to see which are
   * stored in the `claimed` vertext list
   *
   * @param {Face} face
   * @return {Vertex|undefined} If face had visible vertices returns
   * `face.outside`, otherwise undefined
   */
  removeAllVerticesFromFace (face) {
    if (face.outside) {
      // pointer to the last vertex of this face
      // [..., outside, ..., end, outside, ...]
      //          |           |      |
      //          a           a      b
      let end = face.outside
      while (end.next && end.next.face === face) {
        end = end.next
      }
      this.claimed.removeChain(face.outside, end)
      //                            b
      //                       [ outside, ...]
      //                            |  removes this link
      //     [ outside, ..., end ] -┘
      //          |           |
      //          a           a
      end.next = null
      return face.outside
    }
  }

  /**
   * Removes all the visible vertices that `face` is able to see, additionally
   * checking the following:
   *
   * If `absorbingFace` doesn't exist then all the removed vertices will be
   * added to the `unclaimed` vertex list
   *
   * If `absorbingFace` exists then this method will assign all the vertices of
   * `face` that can see `absorbingFace`, if a vertex cannot see `absorbingFace`
   * it's added to the `unclaimed` vertex list
   *
   * @param {Face} face
   * @param {Face} [absorbingFace]
   */
  deleteFaceVertices (face, absorbingFace) {
    const faceVertices = this.removeAllVerticesFromFace(face)
    if (faceVertices) {
      if (!absorbingFace) {
        // mark the vertices to be reassigned to some other face
        this.unclaimed.addAll(faceVertices)
      } else {
        // if there's an absorbing face try to assign as many vertices
        // as possible to it

        // the reference `vertex.next` might be destroyed on
        // `this.addVertexToFace` (see VertexList#add), nextVertex is a
        // reference to it
        let nextVertex
        for (let vertex = faceVertices; vertex; vertex = nextVertex) {
          nextVertex = vertex.next
          const distance = absorbingFace.distanceToPlane(vertex.point)

          // check if `vertex` is able to see `absorbingFace`
          if (distance > this.tolerance) {
            this.addVertexToFace(vertex, absorbingFace)
          } else {
            this.unclaimed.add(vertex)
          }
        }
      }
    }
  }

  /**
   * Reassigns as many vertices as possible from the unclaimed list to the new
   * faces
   *
   * @param {Faces[]} newFaces
   */
  resolveUnclaimedPoints (newFaces) {
    // cache next vertex so that if `vertex.next` is destroyed it's still
    // recoverable
    let vertexNext = this.unclaimed.first()
    for (let vertex = vertexNext; vertex; vertex = vertexNext) {
      vertexNext = vertex.next
      let maxDistance = this.tolerance
      let maxFace
      for (let i = 0; i < newFaces.length; i += 1) {
        const face = newFaces[i]
        if (face.mark === VISIBLE) {
          const dist = face.distanceToPlane(vertex.point)
          if (dist > maxDistance) {
            maxDistance = dist
            maxFace = face
          }
          if (maxDistance > 1000 * this.tolerance) {
            break
          }
        }
      }

      if (maxFace) {
        this.addVertexToFace(vertex, maxFace)
      }
    }
  }

  /**
   * Computes the extremes of a tetrahedron which will be the initial hull
   *
   * @return {number[]} The min/max vertices in the x,y,z directions
   */
  computeExtremes () {
    const min = []
    const max = []

    // min vertex on the x,y,z directions
    const minVertices = []
    // max vertex on the x,y,z directions
    const maxVertices = []

    let i, j

    // initially assume that the first vertex is the min/max
    for (i = 0; i < 3; i += 1) {
      minVertices[i] = maxVertices[i] = this.vertices[0]
    }
    // copy the coordinates of the first vertex to min/max
    for (i = 0; i < 3; i += 1) {
      min[i] = max[i] = this.vertices[0].point[i]
    }

    // compute the min/max vertex on all 6 directions
    for (i = 1; i < this.vertices.length; i += 1) {
      const vertex = this.vertices[i]
      const point = vertex.point
      // update the min coordinates
      for (j = 0; j < 3; j += 1) {
        if (point[j] < min[j]) {
          min[j] = point[j]
          minVertices[j] = vertex
        }
      }
      // update the max coordinates
      for (j = 0; j < 3; j += 1) {
        if (point[j] > max[j]) {
          max[j] = point[j]
          maxVertices[j] = vertex
        }
      }
    }

    // compute epsilon
    this.tolerance = 3 * Number.EPSILON * (
      Math.max(Math.abs(min[0]), Math.abs(max[0])) +
      Math.max(Math.abs(min[1]), Math.abs(max[1])) +
      Math.max(Math.abs(min[2]), Math.abs(max[2]))
    )
    return [minVertices, maxVertices]
  }

  /**
   * Compues the initial tetrahedron assigning to its faces all the points that
   * are candidates to form part of the hull
   */
  createInitialSimplex () {
    const vertices = this.vertices
    const [min, max] = this.computeExtremes()
    let v2, v3
    let i, j

    // Find the two vertices with the greatest 1d separation
    // (max.x - min.x)
    // (max.y - min.y)
    // (max.z - min.z)
    let maxDistance = 0
    let indexMax = 0
    for (i = 0; i < 3; i += 1) {
      const distance = max[i].point[i] - min[i].point[i]
      if (distance > maxDistance) {
        maxDistance = distance
        indexMax = i
      }
    }
    const v0 = min[indexMax]
    const v1 = max[indexMax]

    // the next vertex is the one farthest to the line formed by `v0` and `v1`
    maxDistance = 0
    for (i = 0; i < this.vertices.length; i += 1) {
      const vertex = this.vertices[i]
      if (vertex !== v0 && vertex !== v1) {
        const distance = pointLineDistance(
          vertex.point, v0.point, v1.point
        )
        if (distance > maxDistance) {
          maxDistance = distance
          v2 = vertex
        }
      }
    }

    // the next vertes is the one farthest to the plane `v0`, `v1`, `v2`
    // normalize((v2 - v1) x (v0 - v1))
    const normal = getPlaneNormal([], v0.point, v1.point, v2.point)
    // distance from the origin to the plane
    const distPO = dot(v0.point, normal)
    maxDistance = -1
    for (i = 0; i < this.vertices.length; i += 1) {
      const vertex = this.vertices[i]
      if (vertex !== v0 && vertex !== v1 && vertex !== v2) {
        const distance = Math.abs(dot(normal, vertex.point) - distPO)
        if (distance > maxDistance) {
          maxDistance = distance
          v3 = vertex
        }
      }
    }

    // initial simplex
    // Taken from http://everything2.com/title/How+to+paint+a+tetrahedron
    //
    //                              v2
    //                             ,|,
    //                           ,7``\'VA,
    //                         ,7`   |, `'VA,
    //                       ,7`     `\    `'VA,
    //                     ,7`        |,      `'VA,
    //                   ,7`          `\         `'VA,
    //                 ,7`             |,           `'VA,
    //               ,7`               `\       ,..ooOOTK` v3
    //             ,7`                  |,.ooOOT''`    AV
    //           ,7`            ,..ooOOT`\`           /7
    //         ,7`      ,..ooOOT''`      |,          AV
    //        ,T,..ooOOT''`              `\         /7
    //     v0 `'TTs.,                     |,       AV
    //            `'TTs.,                 `\      /7
    //                 `'TTs.,             |,    AV
    //                      `'TTs.,        `\   /7
    //                           `'TTs.,    |, AV
    //                                `'TTs.,\/7
    //                                     `'T`
    //                                       v1
    //
    const faces = []
    if (dot(v3.point, normal) - distPO < 0) {
      // the face is not able to see the point so `planeNormal`
      // is pointing outside the tetrahedron
      faces.push(
        Face.createTriangle(v0, v1, v2),
        Face.createTriangle(v3, v1, v0),
        Face.createTriangle(v3, v2, v1),
        Face.createTriangle(v3, v0, v2)
      )

      // set the opposite edge
      for (i = 0; i < 3; i += 1) {
        const j = (i + 1) % 3
        // join face[i] i > 0, with the first face
        faces[i + 1].getEdge(2).setOpposite(faces[0].getEdge(j))
        // join face[i] with face[i + 1], 1 <= i <= 3
        faces[i + 1].getEdge(1).setOpposite(faces[j + 1].getEdge(0))
      }
    } else {
      // the face is able to see the point so `planeNormal`
      // is pointing inside the tetrahedron
      faces.push(
        Face.createTriangle(v0, v2, v1),
        Face.createTriangle(v3, v0, v1),
        Face.createTriangle(v3, v1, v2),
        Face.createTriangle(v3, v2, v0)
      )

      // set the opposite edge
      for (i = 0; i < 3; i += 1) {
        const j = (i + 1) % 3
        // join face[i] i > 0, with the first face
        faces[i + 1].getEdge(2).setOpposite(faces[0].getEdge((3 - i) % 3))
        // join face[i] with face[i + 1]
        faces[i + 1].getEdge(0).setOpposite(faces[j + 1].getEdge(1))
      }
    }

    // the initial hull is the tetrahedron
    for (i = 0; i < 4; i += 1) {
      this.faces.push(faces[i])
    }

    // initial assignment of vertices to the faces of the tetrahedron
    for (i = 0; i < vertices.length; i += 1) {
      const vertex = vertices[i]
      if (vertex !== v0 && vertex !== v1 && vertex !== v2 && vertex !== v3) {
        maxDistance = this.tolerance
        let maxFace
        for (j = 0; j < 4; j += 1) {
          const distance = faces[j].distanceToPlane(vertex.point)
          if (distance > maxDistance) {
            maxDistance = distance
            maxFace = faces[j]
          }
        }

        if (maxFace) {
          this.addVertexToFace(vertex, maxFace)
        }
      }
    }
  }

  reindexFaceAndVertices () {
    // remove inactive faces
    const activeFaces = []
    for (let i = 0; i < this.faces.length; i += 1) {
      const face = this.faces[i]
      if (face.mark === VISIBLE) {
        activeFaces.push(face)
      }
    }
    this.faces = activeFaces
  }

  collectFaces (skipTriangulation) {
    const faceIndices = []
    for (let i = 0; i < this.faces.length; i += 1) {
      if (this.faces[i].mark !== VISIBLE) {
        throw Error('attempt to include a destroyed face in the hull')
      }
      const indices = this.faces[i].collectIndices()
      if (skipTriangulation) {
        faceIndices.push(indices)
      } else {
        for (let j = 0; j < indices.length - 2; j += 1) {
          faceIndices.push(
            [indices[0], indices[j + 1], indices[j + 2]]
          )
        }
      }
    }
    return faceIndices
  }

  /**
   * Finds the next vertex to make faces with the current hull
   *
   * - let `face` be the first face existing in the `claimed` vertex list
   *  - if `face` doesn't exist then return since there're no vertices left
   *  - otherwise for each `vertex` that face sees find the one furthest away
   *  from `face`
   *
   * @return {Vertex|undefined} Returns undefined when there're no more
   * visible vertices
   */
  nextVertexToAdd () {
    if (!this.claimed.isEmpty()) {
      let eyeVertex, vertex
      let maxDistance = 0
      const eyeFace = this.claimed.first().face
      for (vertex = eyeFace.outside; vertex && vertex.face === eyeFace; vertex = vertex.next) {
        const distance = eyeFace.distanceToPlane(vertex.point)
        if (distance > maxDistance) {
          maxDistance = distance
          eyeVertex = vertex
        }
      }
      return eyeVertex
    }
  }

  /**
   * Computes a chain of half edges in ccw order called the `horizon`, for an
   * edge to be part of the horizon it must join a face that can see
   * `eyePoint` and a face that cannot see `eyePoint`
   *
   * @param {number[]} eyePoint - The coordinates of a point
   * @param {HalfEdge} crossEdge - The edge used to jump to the current `face`
   * @param {Face} face - The current face being tested
   * @param {HalfEdge[]} horizon - The edges that form part of the horizon in
   * ccw order
   */
  computeHorizon (eyePoint, crossEdge, face, horizon) {
    // moves face's vertices to the `unclaimed` vertex list
    this.deleteFaceVertices(face)

    face.mark = DELETED

    let edge
    if (!crossEdge) {
      edge = crossEdge = face.getEdge(0)
    } else {
      // start from the next edge since `crossEdge` was already analyzed
      // (actually `crossEdge.opposite` was the face who called this method
      // recursively)
      edge = crossEdge.next
    }

    // All the faces that are able to see `eyeVertex` are defined as follows
    //
    //       v    /
    //           / <== visible face
    //          /
    //         |
    //         | <== not visible face
    //
    //  dot(v, visible face normal) - visible face offset > this.tolerance
    //
    do {
      const oppositeEdge = edge.opposite
      const oppositeFace = oppositeEdge.face
      if (oppositeFace.mark === VISIBLE) {
        if (oppositeFace.distanceToPlane(eyePoint) > this.tolerance) {
          this.computeHorizon(eyePoint, oppositeEdge, oppositeFace, horizon)
        } else {
          horizon.push(edge)
        }
      }
      edge = edge.next
    } while (edge !== crossEdge)
  }

  /**
   * Creates a face with the points `eyeVertex.point`, `horizonEdge.tail` and
   * `horizonEdge.tail` in ccw order
   *
   * @param {Vertex} eyeVertex
   * @param {HalfEdge} horizonEdge
   * @return {HalfEdge} The half edge whose vertex is the eyeVertex
   */
  addAdjoiningFace (eyeVertex, horizonEdge) {
    // all the half edges are created in ccw order thus the face is always
    // pointing outside the hull
    // edges:
    //
    //                  eyeVertex.point
    //                       / \
    //                      /   \
    //                  1  /     \  0
    //                    /       \
    //                   /         \
    //                  /           \
    //          horizon.tail --- horizon.head
    //                        2
    //
    const face = Face.createTriangle(
      eyeVertex,
      horizonEdge.tail(),
      horizonEdge.head()
    )
    this.faces.push(face)
    // join face.getEdge(-1) with the horizon's opposite edge
    // face.getEdge(-1) = face.getEdge(2)
    face.getEdge(-1).setOpposite(horizonEdge.opposite)
    return face.getEdge(0)
  }

  /**
   * Adds horizon.length faces to the hull, each face will be 'linked' with the
   * horizon opposite face and the face on the left/right
   *
   * @param {Vertex} eyeVertex
   * @param {HalfEdge[]} horizon - A chain of half edges in ccw order
   */
  addNewFaces (eyeVertex, horizon) {
    this.newFaces = []
    let firstSideEdge, previousSideEdge
    for (let i = 0; i < horizon.length; i += 1) {
      const horizonEdge = horizon[i]
      // returns the right side edge
      const sideEdge = this.addAdjoiningFace(eyeVertex, horizonEdge)
      if (!firstSideEdge) {
        firstSideEdge = sideEdge
      } else {
        // joins face.getEdge(1) with previousFace.getEdge(0)
        sideEdge.next.setOpposite(previousSideEdge)
      }
      this.newFaces.push(sideEdge.face)
      previousSideEdge = sideEdge
    }
    firstSideEdge.next.setOpposite(previousSideEdge)
  }

  /**
   * Computes the distance from `edge` opposite face's centroid to
   * `edge.face`
   *
   * @param {HalfEdge} edge
   * @return {number}
   * - A positive number when the centroid of the opposite face is above the
   *   face i.e. when the faces are concave
   * - A negative number when the centroid of the opposite face is below the
   *   face i.e. when the faces are convex
   */
  oppositeFaceDistance (edge) {
    return edge.face.distanceToPlane(edge.opposite.face.centroid)
  }

  /**
   * Merges a face with none/any/all its neighbors according to the strategy
   * used
   *
   * if `mergeType` is MERGE_NON_CONVEX_WRT_LARGER_FACE then the merge will be
   * decided based on the face with the larger area, the centroid of the face
   * with the smaller area will be checked against the one with the larger area
   * to see if it's in the merge range [tolerance, -tolerance] i.e.
   *
   *    dot(centroid smaller face, larger face normal) - larger face offset > -tolerance
   *
   * Note that the first check (with +tolerance) was done on `computeHorizon`
   *
   * If the above is not true then the check is done with respect to the smaller
   * face i.e.
   *
   *    dot(centroid larger face, smaller face normal) - smaller face offset > -tolerance
   *
   * If true then it means that two faces are non convex (concave), even if the
   * dot(...) - offset value is > 0 (that's the point of doing the merge in the
   * first place)
   *
   * If two faces are concave then the check must also be done on the other face
   * but this is done in another merge pass, for this to happen the face is
   * marked in a temporal NON_CONVEX state
   *
   * if `mergeType` is MERGE_NON_CONVEX then two faces will be merged only if
   * they pass the following conditions
   *
   *    dot(centroid smaller face, larger face normal) - larger face offset > -tolerance
   *    dot(centroid larger face, smaller face normal) - smaller face offset > -tolerance
   *
   * @param {Face} face
   * @param {number} mergeType - Either MERGE_NON_CONVEX_WRT_LARGER_FACE or
   * MERGE_NON_CONVEX
   */
  doAdjacentMerge (face, mergeType) {
    let edge = face.edge
    let convex = true
    let it = 0
    do {
      if (it >= face.nVertices) {
        throw Error('merge recursion limit exceeded')
      }
      const oppositeFace = edge.opposite.face
      let merge = false

      // Important notes about the algorithm to merge faces
      //
      // - Given a vertex `eyeVertex` that will be added to the hull
      //   all the faces that cannot see `eyeVertex` are defined as follows
      //
      //      dot(v, not visible face normal) - not visible offset < tolerance
      //
      // - Two faces can be merged when the centroid of one of these faces
      // projected to the normal of the other face minus the other face offset
      // is in the range [tolerance, -tolerance]
      // - Since `face` (given in the input for this method) has passed the
      // check above we only have to check the lower bound e.g.
      //
      //      dot(v, not visible face normal) - not visible offset > -tolerance
      //
      if (mergeType === MERGE_NON_CONVEX) {
        if (this.oppositeFaceDistance(edge) > -this.tolerance ||
            this.oppositeFaceDistance(edge.opposite) > -this.tolerance) {
          merge = true
        }
      } else {
        if (face.area > oppositeFace.area) {
          if (this.oppositeFaceDistance(edge) > -this.tolerance) {
            merge = true
          } else if (this.oppositeFaceDistance(edge.opposite) > -this.tolerance) {
            convex = false
          }
        } else {
          if (this.oppositeFaceDistance(edge.opposite) > -this.tolerance) {
            merge = true
          } else if (this.oppositeFaceDistance(edge) > -this.tolerance) {
            convex = false
          }
        }
      }

      if (merge) {
        // when two faces are merged it might be possible that redundant faces
        // are destroyed, in that case move all the visible vertices from the
        // destroyed faces to the `unclaimed` vertex list
        const discardedFaces = face.mergeAdjacentFaces(edge, [])
        for (let i = 0; i < discardedFaces.length; i += 1) {
          this.deleteFaceVertices(discardedFaces[i], face)
        }
        return true
      }

      edge = edge.next
      it += 1
    } while (edge !== face.edge)
    if (!convex) {
      face.mark = NON_CONVEX
    }
    return false
  }

  /**
   * Adds a vertex to the hull with the following algorithm
   *
   * - Compute the `horizon` which is a chain of half edges, for an edge to
   *   belong to this group it must be the edge connecting a face that can
   *   see `eyeVertex` and a face which cannot see `eyeVertex`
   * - All the faces that can see `eyeVertex` have its visible vertices removed
   *   from the claimed VertexList
   * - A new set of faces is created with each edge of the `horizon` and
   *   `eyeVertex`, each face is connected with the opposite horizon face and
   *   the face on the left/right
   * - The new faces are merged if possible with the opposite horizon face first
   *   and then the faces on the right/left
   * - The vertices removed from all the visible faces are assigned to the new
   *   faces if possible
   *
   * @param {Vertex} eyeVertex
   */
  addVertexToHull (eyeVertex) {
    const horizon = []

    this.unclaimed.clear()

    // remove `eyeVertex` from `eyeVertex.face` so that it can't be added to the
    // `unclaimed` vertex list
    this.removeVertexFromFace(eyeVertex, eyeVertex.face)
    this.computeHorizon(eyeVertex.point, null, eyeVertex.face, horizon)
    this.addNewFaces(eyeVertex, horizon)

    // first merge pass
    // Do the merge with respect to the larger face
    for (let i = 0; i < this.newFaces.length; i += 1) {
      const face = this.newFaces[i]
      if (face.mark === VISIBLE) {
        while (this.doAdjacentMerge(face, MERGE_NON_CONVEX_WRT_LARGER_FACE)) {} // eslint-disable-line no-empty
      }
    }

    // second merge pass
    // Do the merge on non convex faces (a face is marked as non convex in the
    // first pass)
    for (let i = 0; i < this.newFaces.length; i += 1) {
      const face = this.newFaces[i]
      if (face.mark === NON_CONVEX) {
        face.mark = VISIBLE
        while (this.doAdjacentMerge(face, MERGE_NON_CONVEX)) {} // eslint-disable-line no-empty
      }
    }

    // reassign `unclaimed` vertices to the new faces
    this.resolveUnclaimedPoints(this.newFaces)
  }

  build () {
    let eyeVertex
    this.createInitialSimplex()
    while ((eyeVertex = this.nextVertexToAdd())) {
      this.addVertexToHull(eyeVertex)
    }
    this.reindexFaceAndVertices()
  }
}

module.exports = QuickHull
