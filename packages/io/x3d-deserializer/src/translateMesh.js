import { pointsToString } from './translateHelpers.js'

import { convertMesh } from './instantiateMesh.js'

const translateToPolyhedron = (type, points, faces, colors, orientation) => {
  const colorsCode = Array.isArray(colors) ? pointsToString(colors) : 'null'
  const primitive = 'polyhedron({points, faces, colors, orientation})'
  const code = `
  // 3D ${type} set: ${points.length} points, ${faces.length} faces
  const points = ${pointsToString(points)}
  const faces = ${pointsToString(faces)}
  const colors = ${colorsCode}
  const orientation = '${orientation}'
`
  return { primitive, code }
}

/*
 * Translate the given objects into mesh (polyhedron).
 * @return { primitive, code }
 */
export const translateMesh = (options, objects) => {
  const components = convertMesh(options, objects)
  if (components) {
    const { type, points, faces, colors, orientation } = components
    return translateToPolyhedron(type, points, faces, colors, orientation)
  }
  return null
}
