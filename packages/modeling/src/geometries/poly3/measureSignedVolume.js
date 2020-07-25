const vec3 = require('../../maths/vec3')

/**
 * Measure the signed volume of the given polygon, which must be convex.
 * The volume is that formed by the tetrahedon connected to the axis [0,0,0],
 * and will be positive or negative based on the rotation of the vertices.
 * @see http://chenlab.ece.cornell.edu/Publication/Cha/icip01_Cha.pdf
 * @param {poly3} polygon - the polygon to measure
 * @return {Number} volume of the polygon
 * @alias module:modeling/geometries/poly3.measureSignedVolume
 */
const measureSignedVolume = (poly3) => {
  let signedVolume = 0
  const vertices = poly3.vertices
  // calculate based on triangluar polygons
  for (let i = 0; i < vertices.length - 2; i++) {
    const cross = vec3.cross(vertices[i + 1], vertices[i + 2])
    signedVolume += vec3.dot(vertices[0], cross)
  }
  signedVolume /= 6
  return signedVolume
}

module.exports = measureSignedVolume
