import * as plane from '../../../maths/plane/index.js'
import * as vec2 from '../../../maths/vec2/index.js'
import * as vec3 from '../../../maths/vec3/index.js'

import * as geom2 from '../../../geometries/geom2/index.js'

import calculatePlane from '../slice/calculatePlane.js'

import assignHoles from './assignHoles.js'

/*
 * Constructs a polygon hierarchy which associates holes with their outer solids.
 * This class maps a 3D polygon onto a 2D space using an orthonormal basis.
 * It tracks the mapping so that points can be reversed back to 3D losslessly.
 */
export class PolygonHierarchy {
  constructor (slice) {
    this.plane = calculatePlane(slice)

    // create an orthonormal basis
    // choose an arbitrary right hand vector, making sure it is somewhat orthogonal to the plane normal
    const rightvector = vec3.orthogonal(vec3.create(), this.plane)
    const perp = vec3.cross(vec3.create(), this.plane, rightvector)
    this.v = vec3.normalize(perp, perp)
    this.u = vec3.cross(vec3.create(), this.v, this.plane)

    // map from 2D to original 3D points
    this.basisMap = new Map()

    // project slice onto 2D plane
    const projected = slice.parts.map((part) => part.map((v) => this.to2D(v)))

    // compute polygon hierarchies, assign holes to solids
    const geometry = geom2.create(projected)
    this.roots = assignHoles(geometry)
  }

  /*
   * project a 3D point onto the 2D plane
   */
  to2D (vector3) {
    const vector2 = vec2.fromValues(vec3.dot(vector3, this.u), vec3.dot(vector3, this.v))
    this.basisMap.set(vector2, vector3)
    return vector2
  }

  /*
   * un-project a 2D point back into 3D
   */
  to3D (vector2) {
    // use a map to get the original 3D, no floating point error
    const original = this.basisMap.get(vector2)
    if (original) {
      return original
    } else {
      console.log('Warning: point not in original slice')
      const v1 = vec3.scale(vec3.create(), this.u, vector2[0])
      const v2 = vec3.scale(vec3.create(), this.v, vector2[1])

      const planeOrigin = vec3.scale(vec3.create(), this.plane, this.plane[3])
      const v3 = vec3.add(v1, v1, planeOrigin)
      return vec3.add(v2, v2, v3)
    }
  }
}

export default PolygonHierarchy
