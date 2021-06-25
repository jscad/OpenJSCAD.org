const mat4 = require('gl-mat4')

const { meshColor } = require('../../renderDefaults')

const drawMesh = (regl, params = { extras: {} }) => {
  const defaults = {
    useVertexColors: true,
    dynamicCulling: false,
    geometry: undefined,
    color: meshColor
  }
  let { geometry, dynamicCulling, useVertexColors, color } = Object.assign({}, defaults, params)

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

  // console.log('type', geometry.type, 'color', color, hasVertexColors)

  let commandParams = {
    primitive: 'triangles',
    vert,
    frag,

    uniforms: {
      model: (context, props) => props.model || geometry.transforms || mat4.create(),
      ucolor: (context, props) => (props && props.color) ? props.color : color,
      // semi hack, woraround to enable/disable vertex colors!!!
      vColorToggler: (context, props) => (props && props.useVertexColors && props.useVertexColors === true) ? 1.0 : 0.0,
      // experimental
      unormal: (context, props) => {
        const model = geometry.transforms || mat4.create()
        const modelViewMatrix = mat4.invert(mat4.create(), props.camera.view)
        const normalMatrix = mat4.invert(mat4.create(), model)
        mat4.multiply(normalMatrix, normalMatrix, modelViewMatrix)
        mat4.transpose(normalMatrix, normalMatrix)
        return normalMatrix
      }
    },
    attributes: {
      position: regl.buffer({ usage: 'static', type: 'float', data: geometry.positions }),
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
