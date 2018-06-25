const mat4 = require('../../math/vec4')
const vec4 = require('../../math/vec4')
const poly3 = require('../poly3')
const vert3 = require('../vert3')
const fromPolygons = require('./fromPolygons')

/**
 * Return a new CSG solid that is transformed using the given Matrix.
 * Several matrix transformations can be combined before transforming this solid.
 * @param {CSG.matrix} matrix - 4x4 matrix (mat4) to be applied
 * @returns {CSG} new CSG object
 * @example
 * const m = mat4.create()
 * m = m.multiply(rotateX(40, m))
 * m = m.multiply(translate([-.5, 0, 0], m))
 * let B = transform(m, A)
**/
const transform = (matrix, shape3) => {
    let ismirror = mat4.isMirroring(matrix)
    let transformedvertices = {}
    let transformedplanes = {}
    let newpolygons = shape3.polygons.map(function (p) {
      let newplane
      let plane = p.plane
      let planetag = plane.getTag()
      if (planetag in transformedplanes) {
        newplane = transformedplanes[planetag]
      } else {
        newplane = vec4.transform(matrix, plane)
        transformedplanes[planetag] = newplane
      }
      let newvertices = p.vertices.map(function (v) {
        let newvertex
        let vertextag = v.getTag()
        if (vertextag in transformedvertices) {
          newvertex = transformedvertices[vertextag]
        } else {
          newvertex = vert3.transform(matrix, v)
          transformedvertices[vertextag] = newvertex
        }
        return newvertex
      })
      if (ismirror) newvertices.reverse()
      return poly3.fromData(newvertices, p.shared, newplane)
    })
    let result = fromPolygons(newpolygons)
    result.properties = shape3.properties._transform(matrix)
    result.isRetesselated = shape3.isRetesselated
    result.isCanonicalized = shape3.isCanonicalized
    return result
}

module.exports = transform

  /*
    // Affine transformation of CSG object. Returns a new CSG object
  transform1: function (matrix) {
    let newpolygons = this.polygons.map(function (p) {
      return p.transform(matrix)
    })
    let result = CSG.fromPolygons(newpolygons)
    result.properties = this.properties._transform(matrix)
    result.isRetesselated = this.isRetesselated
    return result
  }
  */
 