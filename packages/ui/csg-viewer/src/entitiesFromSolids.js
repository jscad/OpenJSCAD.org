const mat4 = require('gl-mat4')
const {flatten, toArray} = require('./utils')
const csgToGeometries = require('./geometry-utils/csgToGeometries')
const cagToGeometries = require('./geometry-utils/cagToGeometries')
const computeBounds = require('./bound-utils/computeBounds')
const areCSGsIdentical = require('./csg-utils/areCSGsIdentical')

function entitiesFromSolids (baseParams, solids) {
  const defaultColor = baseParams.rendering.meshColor

  solids = toArray(solids)
  // warning !!! fixTJunctions alters the csg and can result in visual issues ??
  // .fixTJunctions()
  // if (!params.csgCheck) { // || !areCSGsIdentical(csg, cachedSolids)) {
  // cachedSolids = solids
  // const start = performance.now()
  const entities = solids.map(function (solid) {
    let geometry
    let type
    if ('sides' in solid) {
      type = '2d'
      geometry = cagToGeometries(solid, {color: defaultColor})
    } else if ('polygons' in solid) {
      type = '3d'
      geometry = csgToGeometries(solid, {
        smoothLighting: baseParams.smoothNormals,
        normalThreshold: 0.3,
        faceColor: defaultColor})//, normalThreshold: 0})
    }
    // geometry = flatten(geometries)// FXIME : ACTUALLY deal with arrays since a single csg can
    // generate multiple geometries if positions count is >65535
    geometry = flatten(geometry)[0]

    // const time = (performance.now() - start) / 1000
    // console.log(`Total time for geometry conversion: ${time} s`)
    // console.log('geometry', geometry)

    // bounds
    const bounds = computeBounds({geometry})// FXIME : ACTUALLY deal with arrays as inputs see above

    // transforms: for now not used, since all transformed are stored in the geometry
    const matrix = mat4.identity([])

    const transforms = {
      matrix
      /* const modelViewMatrix = mat4.multiply(mat4.create(), model, props.camera.view)
      const normalMatrix = mat4.create()
      mat4.invert(normalMatrix, modelViewMatrix)
      mat4.transpose(normalMatrix, normalMatrix)
      return normalMatrix */
    }

    const entity = {geometry, transforms, bounds, type}
    return entity
  })
  // }
  return entities
}

module.exports = entitiesFromSolids
