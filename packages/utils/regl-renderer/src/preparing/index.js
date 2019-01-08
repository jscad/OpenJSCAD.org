const entitiesFromSolids = require('./entitiesFromSolids')

const makeDrawCallsForSolids = (regl, solids, options) => {
  const entities = entitiesFromSolids(solids, options)
  // we need to update the render function to provide the new geometry data from entities
  // const render = prepareRender(regl, Object.assign({}, state, {entities}))
  const makeDrawMesh = require('./rendering/drawMesh/index')
  const drawCSGs = entities
    .map(entity => {
      const { geometry, type } = entity
      let drawMesh = makeDrawMesh(regl, { geometry, type })
      drawMesh.isTransparent = geometry.isTransparent
      drawMesh.entity = entity
      return drawMesh
    })

  // const totalTime = new Date() - startTime
  // console.warn(`total time to generate geometry and draw calls: ${totalTime}`)
  return {
    entities,
    drawCommands: {
      drawCSGs
    }
  }
}

module.exports = makeDrawCallsForSolids
