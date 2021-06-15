const { flatten, toArray } = require('@jscad/array-utils')

const { meshColor } = require('../rendering/renderDefaults')

const geom2ToGeometries = require('./geom2ToGeometries')
const geom3ToGeometries = require('./geom3ToGeometries')
const path2ToGeometries = require('./path2ToGeometries')

/*
 * Assemble a set of renderable entities from the given geometries.
 */
const assembleEntities = (geometries) => {
  const entities = geometries.map((geometry) => {
    const visuals = {
      drawCmd: geometry.type === '2d' ? 'drawLines' : 'drawMesh',
      show: true,
      transparent: geometry.isTransparent,
      useVertexColors: true
    }
    const entity = {
      geometry,
      visuals
    }
    return entity
  })
  return entities
}

/**
 * Convert the given solids into renderable entities.
 * Each 'solid' (V2 geometry) is converted to a WEBGL renderable 'geometry'.
 * The resulting entities are passed as properities to the render.
 * @param {Object} options - options for construction
 * @param {Array} [options.color] - color for rendering, if the solid does not provide a color
 * @param {Boolean} [options.smoothNormals=true] - smooth the normals of 3d solids, rendering a smooth surface
 * @returns {Array} an array of renderable entities
 */
const entitiesFromSolids = (options, ...solids) => {
  const defaults = {
    color: meshColor,
    smoothNormals: true
  }
  const { color, smoothNormals } = Object.assign({}, defaults, options)

  solids = flatten(toArray(solids))
  solids = solids.filter((solid) => solid && (solid instanceof Object))

  const entities = []
  solids.forEach((solid) => {
    let geometries = []
    if ('sides' in solid) {
      geometries = geom2ToGeometries({ color }, solid)
    } else if ('points' in solid) {
      geometries = path2ToGeometries({ color }, solid)
    } else if ('polygons' in solid) {
      geometries = geom3ToGeometries({
        smoothLighting: smoothNormals,
        normalThreshold: 0.3,
        color
      }, solid)
    }
    entities.push(...assembleEntities(geometries))
  })
  return entities
}

module.exports = entitiesFromSolids
