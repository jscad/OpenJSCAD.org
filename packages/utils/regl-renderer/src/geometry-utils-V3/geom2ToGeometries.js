import mat4 from 'gl-mat4'

const maxIndex = Math.floor(65535 / 2) // two vertices per segment

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {geom2} solid - the V3 geom3 object to convert
 * @return {Array} list of new geometries
 */
export const geom2ToGeometries = (options, solid) => {
  let { color } = options

  const outlines = solid.outlines
  if (outlines.length === 0) return []

  if ('color' in solid) color = solid.color
  const isTransparent = (color[3] < 1.0)

  const geometries = []
  for (let i = 0; i < outlines.length; i++) {
    const points = outlines[i]
    const numgeometries = Math.floor(points.length / (maxIndex)) + 1

    for (let g = 0; g < numgeometries; g++) {
      const offset = g * maxIndex
      const endset = Math.min(offset + maxIndex, points.length)
      const positions = []
      let prevvertice
      for (let j = offset; j < endset; j++) {
        const point = points[j]
        if (prevvertice) {
          positions.push([prevvertice[0], prevvertice[1], 0])
          positions.push([point[0], point[1], 0])
        }
        prevvertice = point
      }
      // add the last segment if necessary
      if ((g + 1) === numgeometries && prevvertice) {
        const point = points[0]
        positions.push([prevvertice[0], prevvertice[1], 0])
        positions.push([point[0], point[1], 0])
      }
      // assemble the geometry
      const normal = [0, 0, -1]
      const normals = positions.map((x) => normal)
      const indices = positions.map((x, i) => i) // FIXME: temporary, not really needed, need to change drawLines
      const transforms = solid.transforms ? mat4.clone(solid.transforms) : mat4.create()
      // FIXME positions should be Float32Array buffers to eliminate another conversion
      // FIXME normals should be Float32Array buffers to eliminate another conversion
      // FIXME indices should be Uint16Array buffers to eliminate another conversion
      geometries.push({ type: '2d', positions, normals, indices, transforms, color, isTransparent })
    }
  }
  return geometries
}
