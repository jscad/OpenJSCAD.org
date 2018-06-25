const canonicalize = require('./utils/canonicalize')

 /** Convert to compact binary form.
 * See fromCompactBinary.
 * @return {CompactBinary}
 */
const toCompactBinary = (_cag) => {
  let cag = canonicalize(_cag)
  let numsides = cag.sides.length
  let vertexmap = {}
  let vertices = []
  let numvertices = 0
  let sideVertexIndices = new Uint32Array(2 * numsides)
  let sidevertexindicesindex = 0
  cag.sides.map(function (side) {
    [side.vertex0, side.vertex1].map(function (v) {
      let vertextag = v.getTag()
      let vertexindex
      if (!(vertextag in vertexmap)) {
        vertexindex = numvertices++
        vertexmap[vertextag] = vertexindex
        vertices.push(v)
      } else {
        vertexindex = vertexmap[vertextag]
      }
      sideVertexIndices[sidevertexindicesindex++] = vertexindex
    })
  })
  let vertexData = new Float64Array(numvertices * 2)
  let verticesArrayIndex = 0
  vertices.map(function (v) {
    let pos = v.pos
    vertexData[verticesArrayIndex++] = pos._x
    vertexData[verticesArrayIndex++] = pos._y
  })
  let result = {
    'class': 'CAG',
    sideVertexIndices: sideVertexIndices,
    vertexData: vertexData
  }
  return result
}

module.exports = toCompactBinary
