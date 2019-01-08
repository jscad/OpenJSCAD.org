const renderWrapper = require('./renderWrapper')

// const makeDrawMeshNoNormals = require('./drawMeshNoNormals')
// const makeDrawNormals = require('./drawNormals')
// const makeDrawConnector = require('./drawConnector')

const prepareRender = (regl, params) => {
  // const drawGrid = prepDrawGrid(regl, {fadeOut: true, ticks: 10, size: [1000, 1000]})
  // const drawNormals = makeDrawNormals(regl, {geometry})
  /* const vectorizeText = require('vectorize-text')
  const complex = vectorizeText('Hello world! 你好', {
    triangles: true,
    width: 500,
    textBaseline: 'hanging'
  })

  complex.positions = complex.positions.map(point => [point[0], point[1], 0]) */

  const drawCache = {}

  const cube = { positions: [
    0, 0, 0,
    0, 100, 0,
    0, 100, 100],

  cells: [0, 1, 2]
  }

  // const drawTest = makeDrawMeshNoNormals(regl, { geometry: cube })
  // const drawAxis = makeDrawAxis(regl, {})
  // const drawConnector = makeDrawConnector(regl, {})

  let command = props => {
    // console.log('params in render', props)
    const { camera, drawCommands } = props
    // const { drawGrid, drawCSGs } = drawCommands
    const useVertexColors = !props.overrideOriginalColors

    // props is the first parameter, the second one is a function
    renderWrapper(regl)(props, context => {
      // console.log('props', props)
      regl.clear({
        color: props.rendering.background,
        depth: 1
      })
      // console.log('props', props)

      /* const transparents = drawCSGs.filter(drawCall => drawCall.isTransparent)
      const nonTransparents = drawCSGs.filter(drawCall => !drawCall.isTransparent)

      nonTransparents.forEach(drawCall => {
        const { entity } = drawCall
        const primitive = entity.type === '2d' ? 'lines' : 'triangles'
        const model = entity.transforms.matrix
        drawCall({ color: props.rendering.meshColor, primitive, useVertexColors, camera, model })
      })
      transparents.forEach(drawCall => {
        const { entity } = drawCall
        const primitive = entity.type === '2d' ? 'lines' : 'triangles'
        const model = entity.transforms.matrix
        drawCall({ color: props.rendering.meshColor, primitive, useVertexColors, camera, model })
      }) */

      // drawTest({color: [1, 0, 0, 1], model: mat4.translate(mat4.create(), mat4.identity([]), [100, 0, 200])})
      /* if (drawGrid && props.grid.show) {
        const gridColor = props.grid.color
        const subGridColor = [gridColor[0], gridColor[1], gridColor[2], gridColor[3] * 0.35]
        const fadeOut = props.grid.fadeOut
        drawGrid({ color: gridColor, subColor: subGridColor, fadeOut })
      } */
      if (props.entities) {
        console.log('-------')
        // console.log('gna', props.entities)
        props.entities.forEach(entity => {
          // console.log('entity', entity)
          if (entity.drawCmd && entity.show && props.drawCommands[entity.drawCmd]) {
            // console.log('drawCmd', entity.drawCmd, props.drawCommands)
            const key = JSON.stringify(entity)
            let drawCmd = drawCache[key]
            if (!drawCmd) {
              // makeDrawFunction
              // console.log('making draw command', entity.drawCmd)
              drawCmd = props.drawCommands[entity.drawCmd](regl, entity)
              drawCache[key] = drawCmd
            }
            console.log('drawing with', entity.drawCmd, entity)
            const fooParams = {
              ...entity,
              camera: props.camera
            }
            drawCmd(fooParams)
          }
        })
      }
      // drawAxis() // needs to be last to be 'on top' of the scene
      // drawConnector()
      // drawNormals()
    })
  }
  // actual render function
  return function render (data) {
    // important for stats, correct resizing etc
    regl.poll()
    command(data)
    // tick += 0.01
  }
}

module.exports = prepareRender
