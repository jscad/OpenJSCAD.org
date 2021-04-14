const makeDrawAxis = require('../drawAxis')
const makeDrawMesh = require('../drawMeshNoNormals')
const makeArcGeometry = require('./arcGeo')

const mat4 = require('gl-mat4')

const drawConnector = function (regl, params) {
  const argGeometry = makeArcGeometry({ innerRadius: 9, outerRadius: 10, startRadian: 0, endRadian: Math.PI * 2 })
  const drawAxis = makeDrawAxis(regl, { alwaysVisible: false })
  const drawArc = makeDrawMesh(regl, { geometry: argGeometry })

  const model2 = mat4.translate(
    mat4.create(),
    mat4.rotateX(mat4.create(), mat4.create(), Math.PI * 0.7),
    [-30, 30, 0]
  )

  const connectors = [
    { model: mat4.translate(mat4.create(), mat4.create(), [0, 0, 0]) },
    { model: mat4.translate(mat4.create(), mat4.create(), [30, 30, 0]) },
    { model: model2 }
  ]
  return () => {
    connectors.forEach(connector => {
      drawAxis({ model: connector.model })
      drawArc({ model: mat4.rotateX(mat4.create(), connector.model, Math.PI / 2), color: [0.258, 0.921, 0.956, 1] })
    })
  }
}

module.exports = drawConnector
