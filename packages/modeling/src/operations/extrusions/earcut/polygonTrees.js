const geom2 = require('../../../geometries/geom2')
const OrthoNormalBasis = require('../../../maths/OrthoNormalBasis')
const calculatePlane = require('../slice/calculatePlane')
const assignHoles = require('./assignHoles')

/*
 * This class maps a 3D polygon onto a 2D space using an orthonormal basis.
 * It tracks the mapping so that points can be reversed back to 3D losslessly.
 */
class PolygonTrees {
  constructor (slice) {
    this.plane = calculatePlane(slice)

    // map from 2D to original 3D points
    this.basisMap = new Map()

    // Project slice onto 2D plane
    this.basis = new OrthoNormalBasis(this.plane)
    const to2D = (vector3) => {
      const vector2 = this.basis.to2D(vector3)
      this.basisMap.set(vector2, vector3)
      return vector2
    }
    const projected = slice.edges.map((e) => e.map(to2D))

    // compute polygon hierarchies, assign holes to solids
    const geometry = geom2.create(projected)
    this.trees = assignHoles(geometry)
  }

  to3D (point) {
    // use a map to get the original 3D, no floating point error
    const original = this.basisMap.get(point)
    if (original) {
      return original
    } else {
      console.log('Warning: point not in original slice')
      return this.basis.to3D(point)
    }
  }
}

module.exports = PolygonTrees
