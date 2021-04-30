const mat4 = require('gl-mat4')

const { meshColor } = require('../../renderDefaults')

const drawMesh = (regl, params = { extras: {} }) => {
  const { buffer } = regl
  const defaults = {
    useVertexColors: true,
    dynamicCulling: false,
    geometry: undefined,
    primitive: 'triangles',
    color: meshColor
  }
  let { geometry, dynamicCulling, useVertexColors, primitive, color } = Object.assign({}, defaults, params)

  // let ambientOcclusion = vao(geometry.indices, geometry.positions, 64, 64)
  const ambientOcclusion = regl.buffer([])

  // vertex colors or not ?
  const hasIndices = !!(geometry.indices && geometry.indices.length > 0)
  const hasNormals = !!(geometry.normals && geometry.normals.length > 0)
  const hasVertexColors = !!(useVertexColors && geometry.colors && geometry.colors.length > 0)
  const cullFace = dynamicCulling
    ? (context, props) => {
        const isOdd = ([props.model[0], props.model[5], props.model[10]].filter((x) => x < 0).length) & 1 // count the number of negative components & deterine if that is odd or even
        return isOdd ? 'front' : 'back'
      }
    : 'back'

  const vert = hasVertexColors ? require('./vColorShaders').vert : require('./meshShaders').vert
  let frag = hasVertexColors ? require('./vColorShaders').frag : require('./meshShaders').frag

  if (geometry.type === '2d') {
    primitive = 'lines'
    if ('color' in geometry) color = geometry.color
    frag = require('./colorOnlyShaders').frag
  }
  // console.log('type', geometry.type, 'primitive', primitive, 'color', color, hasVertexColors)

  let commandParams = {
    vert,
    frag,

    uniforms: {
      model: (context, props) => props.model || geometry.transforms || mat4.create(),
      ucolor: (context, props) => (props && props.color) ? props.color : color,
      // semi hack, woraround to enable/disable vertex colors!!!
      vColorToggler: (context, props) => (props && props.useVertexColors && props.useVertexColors === true) ? 1.0 : 0.0,
      // experimental
      unormal: (context, props) => {
        const model = mat4.create()
        const modelViewMatrix = mat4.multiply(mat4.create(), model, props.camera.view)
        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, modelViewMatrix)
        mat4.transpose(normalMatrix, normalMatrix)
        return normalMatrix
      }
    },
    attributes: {
      position: buffer({ usage: 'static', type: 'float', data: geometry.positions }),
      ao: ambientOcclusion
    },
    cull: {
      enable: true,
      face: cullFace
    },
    depth: {
      enable: true
    },
    blend: {
      enable: true,

      func: { src: 'src alpha', dst: 'one minus src alpha' }
    },
    primitive: (context, props) => props && props.primitive ? props.primitive : primitive
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
    commandParams.attributes.normal = buffer({ usage: 'static', type: 'float', data: geometry.normals })
  }
  if (hasVertexColors) {
    commandParams.attributes.color = buffer({ usage: 'static', type: 'float', data: geometry.colors })
  }

  // Splice in any extra params
  commandParams = Object.assign({}, commandParams, params.extras)
  return regl(commandParams)
}

module.exports = drawMesh
