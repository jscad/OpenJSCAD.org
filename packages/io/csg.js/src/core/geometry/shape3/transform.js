const mat4 = require('../../math/mat4')
const vec4 = require('../../math/vec4')
const vec3 = require('../../math/vec3')
const plane = require('../../math/plane')
// const poly3 = require('../poly3')
// const vert3 = require('../vert3')
const fromPolygons = require('./fromPolygons')

/**
 * Return a new CSG solid that is transformed using the given Matrix.
 * Several matrix transformations can be combined before transforming this solid.
 * @param {Mat4} matrix - 4x4 matrix (mat4) to be applied
 * @returns {CSG} new CSG object
 * @example
 * let m = mat4.create()
 * m = mat4.multiply(mat4.rotateX(40, m))
 * m = mat4.multiply(mat4.translate([-.5, 0, 0], m))
 * const shapeB = transform(m, shapeA)
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

// module.exports = transform

// alternate implementation, ditching the pre-existing polygons structure & opting for a more compact one
// ASUMES TRIANGLES ONLY !!!
const transform2 = (matrix, shape3) => {
  const ismirrored = mat4.isMirroring(matrix)

  const polygonData = shape3.polygonData
  const resultData = new Float32Array(polygonData.length)

  const planeOffset = 12
  // positions stride: 7, planesStride: 7
  // [pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, pos3.x, pos3.y, pos3.z, 
  //  plane.x, plane.y, plane.z, plane.w]
  for (let i = 0; i < polygonData.length; i += 7) {
    const positions = polygonData.slice(0, 12) // meh, use a dataview
    const plane = polygonData.slice(12, 16) // meh, use a dataview

    const transformedPositions = positions.map(position => vec3.transform(matrix, position)) // FIXME use memoizing/ lookups to avoid multiple computation
    const transformedPlane = vec4.transform(matrix, plane) // FIXME use memoizing/ lookups to avoid multiple computation

    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set 
    resultData.set(ismirrored ? transformedPositions.reverse() : transformedPositions, i)
    resultData.set(transformedPlane, i + planeOffset) 
  }
  return resultData
  // [vert1, vert2, vert3, plane]
}

module.exports = transform2

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
