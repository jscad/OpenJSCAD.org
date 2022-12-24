const mat4 = require('gl-mat4')

const { meshColor } = require('../../renderDefaults')

const drawMesh = (regl, params = { extras: {} }) => {
  const defaults = {
    useVertexColors: true,
    dynamicCulling: true,
    geometry: undefined,
    color: meshColor,
    visuals: {}
  }
  const { geometry, dynamicCulling, useVertexColors, color, visuals } = Object.assign({}, defaults, params)
  // let ambientOcclusion = vao(geometry.indices, geometry.positions, 64, 64)
  const ambientOcclusion = regl.buffer([])

  // vertex colors or not ?
  const hasIndices = !!(geometry.indices && geometry.indices.length > 0)
  const hasNormals = !!(geometry.normals && geometry.normals.length > 0)
  const transparent = 'transparent' in visuals ? visuals.transparent : false
  const hasVertexColors = !!(useVertexColors && geometry.colors && geometry.colors.length > 0)
  const transforms = geometry.transforms || mat4.create()
  const flip = mat4.determinant(transforms) < 0
  const cullFace = dynamicCulling
    ? (flip ? 'front' : 'back')
    : 'back'

  const vert = hasVertexColors ? require('./vColorShaders').vert : require('./meshShaders').vert
  const frag = hasVertexColors ? require('./vColorShaders').frag : require('./meshShaders').frag
  const modelMatrixInv = mat4.invert(mat4.create(), transforms)

  let commandParams = {
    primitive: 'triangles',
    vert,
    frag,

    uniforms: {
      model: (context, props) => transforms,
      ucolor: (context, props) => (props && props.color) ? props.color : color,
      // semi hack, woraround to enable/disable vertex colors !!!
      vColorToggler: (context, props) => (props && props.useVertexColors && props.useVertexColors === true) ? 1.0 : 0.0,
      // experimental
      unormal: (context, props) => {
        const modelViewMatrix = mat4.invert(mat4.create(), props.camera.view)
        mat4.multiply(modelViewMatrix, modelMatrixInv, modelViewMatrix)
        mat4.transpose(modelViewMatrix, modelViewMatrix)
        return modelViewMatrix
      }
    },
    attributes: {
      position: regl.buffer({ usage: 'static', type: 'float', data: geometry.positions }),
      ao: ambientOcclusion
    },
    cull: {
      enable: true,
      face: cullFace
    }
  }

  // blending is a bit tricky
  // https://stackoverflow.com/questions/51938739/regl-color-and-alpha-blending-of-primitives
  if (transparent) {
    commandParams.blend = {
      enable: true,
      func: { src: 'src alpha', dst: 'one minus src alpha' }
    }
  }

  if (geometry.cells) {
    commandParams.elements = geometry.cells
  } else if (hasIndices) {
    commandParams.elements = regl.elements({ usage: 'static', type: 'uint16', data: geometry.indices })
  } else if (geometry.triangles) {
    commandParams.elements = geometry.triangles
  } else {
    commandParams.count = geometry.positions.length / 3
  }

  if (hasNormals) {
    commandParams.attributes.normal = regl.buffer({ usage: 'static', type: 'float', data: geometry.normals })
  }
  if (hasVertexColors) {
    commandParams.attributes.color = regl.buffer({ usage: 'static', type: 'float', data: geometry.colors })
  }

  // Splice in any extra params
  commandParams = Object.assign({}, commandParams, params.extras)
  return regl(commandParams)
}

module.exports = drawMesh
