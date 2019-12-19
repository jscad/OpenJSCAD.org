const { geometry } = require('@jscad/modeling')

// objects must be an array of 3D geomertries (with polygons)
const serializeText = (objects, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })

  let result = `solid JSCAD
${convertToStl(objects, options)}
endsolid JSCAD
`
  options.statusCallback && options.statusCallback({ progress: 100 })
  return [result]
}

const convertToStl = (objects, options) => {
  let result = []
  objects.forEach((object, i) => {
    result.push(convertToFacets(object, options))
    options.statusCallback && options.statusCallback({ progress: 100 * i / objects.length })
  })
  return result.join('\n')
}

const convertToFacets = (object, options) => {
  let result = []
  let polygons = geometry.geom3.toPolygons(object)
  polygons.forEach((polygon, i) => {
    result.push(convertToFacet(polygon))
  })
  return result.join('\n')
}

const vector3DtoStlString = (v) => `${v[0]} ${v[1]} ${v[2]}`

const vertextoStlString = (vertex) => `vertex ${vector3DtoStlString(vertex)}`

const convertToFacet = (polygon) => {
  let result = []
  if (polygon.vertices.length >= 3) {
    // STL requires triangular polygons. If our polygon has more vertices, create multiple triangles:
    let firstVertexStl = vertextoStlString(polygon.vertices[0])
    for (let i = 0; i < polygon.vertices.length - 2; i++) {
      let facet = `facet normal ${vector3DtoStlString(polygon.plane)}
outer loop
${firstVertexStl}
${vertextoStlString(polygon.vertices[i + 1])}
${vertextoStlString(polygon.vertices[i + 2])}
endloop
endfacet`
      result.push(facet)
    }
  }
  return result.join('\n')
}

module.exports = {
  serializeText
}
