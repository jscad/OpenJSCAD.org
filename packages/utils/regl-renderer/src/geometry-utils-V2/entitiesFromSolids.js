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
    let geometry
    let type
    if ('sides' in solid) {
      type = '2d'
      geometry = geom2ToGeometries({ color }, solid)
    } else if ('points' in solid) {
      type = '2d'
      geometry = path2ToGeometries({ color }, solid)
    } else if ('polygons' in solid) {
      type = '3d'
      geometry = geom3ToGeometries({
        smoothLighting: smoothNormals,
        normalThreshold: 0.3,
        color
      }, solid)
    }

    // geometry = flatten(geometries)// FXIME : ACTUALLY deal with arrays since a single design can
    // generate multiple geometries if positions count is >65535
    geometry = flatten(geometry)[0]

    // bounds
    const bounds = computeBounds(geometry) // FXIME : ACTUALLY deal with arrays as inputs see above

    // transforms: for now not used, since all transformed are stored in the geometry
    // FIXME : for V2 we will be able to use the transfors provided by the solids directly
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
  })
  return entities
}

module.exports = entitiesFromSolids
