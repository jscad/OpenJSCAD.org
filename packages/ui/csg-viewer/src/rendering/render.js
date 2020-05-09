const renderWrapper = require('./renderWrapper')

const makeDrawMeshNoNormals = require('./drawMeshNoNormals')
const makeDrawAxis = require('./drawAxis')
const makeDrawNormals = require('./drawNormals')
const makeDrawConnector = require('./drawConnector')

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

  const cube = {
    positions: [
      0, 0, 0,
      0, 100, 0,
      0, 100, 100],

    cells: [0, 1, 2]
  }

  const drawTest = makeDrawMeshNoNormals(regl, { geometry: cube })
  const drawAxis = makeDrawAxis(regl, {})
  const drawConnector = makeDrawConnector(regl, {})

  const command = (props) => {
    // console.log('params in render', props)
    const { camera, drawCommands } = props
    const { drawGrid, drawCSGs } = drawCommands
    const useVertexColors = !props.overrideOriginalColors

    renderWrapper(regl)(props, context => {
      regl.clear({
        color: props.rendering.background,
        depth: 1
      })

      const transparents = drawCSGs.filter(drawCall => drawCall.isTransparent)
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
      })

      // drawTest({color: [1, 0, 0, 1], model: mat4.translate(mat4.create(), mat4.identity([]), [100, 0, 200])})
      if (drawGrid && props.grid.show) {
        const gridColor = props.grid.color
        const subGridColor = [gridColor[0], gridColor[1], gridColor[2], gridColor[3] * 0.35]
        const fadeOut = props.grid.fadeOut
        drawGrid({ color: gridColor, subColor: subGridColor, fadeOut })
      }
      if (props.axes.show) {
        drawAxis() // needs to be last to be 'on top' of the scene
      }
      // drawConnector()
      // drawNormals()
    })
  }
  return function render (data) {
    // important for stats, correct resizing etc
    regl.poll()
    command(data)
    // tick += 0.01
  }
}

module.exports = prepareRender
