const mat4 = require('gl-mat4')

const { flatten, toArray } = require('@jscad/array-utils')
const computeBounds = require('../bound-utils/computeBounds')
const { meshColor } = require('../rendering/renderDefaults')

const geom2ToGeometries = require('./geom2ToGeometries')
const geom3ToGeometries = require('./geom3ToGeometries')
const path2ToGeometries = require('./path2ToGeometries')

const entitiesFromSolids = (params, solids) => {
  const defaults = {
    color: meshColor,
    smoothNormals: true
  }
  const { color, smoothNormals } = Object.assign({}, defaults, params)

  solids = toArray(solids)
  const entities = solids.map((solid) => {
    let geometries
    let type
    if (!solid) {
      return null
    } else if (!(solid instanceof Object)) {
      return null
    } else if ('sides' in solid) {
      type = '2d'
      geometries = geom2ToGeometries({ color }, solid)
    } else if ('points' in solid) {
      type = '2d'
      geometries = path2ToGeometries({ color }, solid)
    } else if ('polygons' in solid) {
      type = '3d'
      geometries = geom3ToGeometries({
        smoothLighting: smoothNormals,
        normalThreshold: 0.3,
        color
      }, solid)
    } else {
      return null
    }

    // FIXME handle multiple geometries, i.e. when positions count is > 65535
    const geometry = flatten(geometries)[0]
    if (!geometry) return null

    // bounds
    const bounds = computeBounds(geometry) // FIXME : ACTUALLY deal with arrays as inputs see above
    if (bounds.dia <= 0.0) return null

    const matrix = mat4.copy(mat4.create(), solid.transforms) // mat4.identity([])
    const transforms = {
      matrix
    }

    const visuals = {
      drawCmd: 'drawMesh',
      show: true,
      // color: meshColor, // overrides colors in geometries
      transparent: geometry.isTransparent, // not sure
      useVertexColors: true
    }

    const entity = {
      type,
      geometry,
      transforms,
      bounds,
      visuals,
      isTransparent: geometry.isTransparent
    }
    return entity
  }).filter((entity) => entity !== null)
  return entities
}

module.exports = entitiesFromSolids
