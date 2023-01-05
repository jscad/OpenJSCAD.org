import intersect from '../../maths/utils/intersect.js'

/**
 * Check whether the given polygon is simple, i.e. does not intersect itself.
 * @see https://en.wikipedia.org/wiki/Simple_polygon
 * @param {poly2} polygon - the polygon to interrogate
 * @returns {Boolean} true if simple
 * @alias module:modeling/geometries/poly2.isSimple
 */
export const isSimple = (polygon) => {
  const numvertices = polygon.vertices.length
  if (numvertices < 3) return false // only polygons with an areas are simple

  if (numvertices === 3) return true // triangles are simple

  const vertices = polygon.vertices

  // proof one: there are N unique vertices
  const found = new Set()
  vertices.forEach((v) => found.add(v.toString()))
  if (found.size !== numvertices) return false

  // proof two: line segments do not cross
  for (let i = 0; i < numvertices; i++) {
    for (let j = i + 2; j < numvertices; j++) {
      const k = (j + 1) % numvertices
      if (i !== k) {
        const s0 = vertices[i]
        const s1 = vertices[(i + 1) % numvertices]
        const z0 = vertices[j]
        const z1 = vertices[k]
        const ip = intersect(s0, s1, z0, z1)
        if (ip) return false
      }
    }
  }
  return true
}

export default isSimple
