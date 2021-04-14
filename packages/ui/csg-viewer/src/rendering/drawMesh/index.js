const mat4 = require('gl-mat4')
const vao = require('vertex-ao')

const drawMesh = function (regl, params = { extras: {} }) {
  const { buffer } = regl
  const defaults = {
    useVertexColors: true,
    dynamicCulling: false,
    geometry: undefined,
    type: undefined
  }
  const { geometry, dynamicCulling, useVertexColors, type } = Object.assign({}, defaults, params)

  let ambientOcclusion // = vao(geometry.indices, geometry.positions, 64, 64)
  ambientOcclusion = regl.buffer([])

  // vertex colors or not ?
  const hasIndices = !!(geometry.indices && geometry.indices.length > 0)
  const hasNormals = !!(geometry.normals && geometry.normals.length > 0)
  const hasVertexColors = !!(useVertexColors && geometry.colors && geometry.colors.length > 0)
  const cullFace = dynamicCulling ? function (context, props) {
    const isOdd = ([props.model[0], props.model[5], props.model[10]].filter(x => x < 0).length) & 1 // count the number of negative components & deterine if that is odd or even
    return isOdd ? 'front' : 'back'
  } : 'back'

  const vert = hasVertexColors ? require('./vColorShaders').vert : require('./meshShaders').vert
  let frag = hasVertexColors ? require('./vColorShaders').frag : require('./meshShaders').frag

  // FIXME: forced override for 2D shape colors to have a simple color
  if (type === '2d') {
    frag = require('./colorOnlyShaders').frag
  }
  // console.log('type', type)
  // const vert = vColorVert
  // const frag = vColorFrag

  let commandParams = {
    vert,
    frag,

    uniforms: {
      model: (context, props) => props && props.model ? props.model : mat4.identity([]),
      ucolor: (context, props) => props && props.color ? props.color : [1, 1, 1, 1],
      // semi hack, woraround to enable/disable vertex colors!!!
      vColorToggler: (context, props) => (props && props.useVertexColors && props.useVertexColors === true) ? 1.0 : 0.0,
      // experimental
      unormal: (context, props) => {
        const model = props.model
        const modelViewMatrix = mat4.multiply(mat4.create(), model, props.camera.view)
        const normalMatrix = mat4.create()
        mat4.invert(normalMatrix, modelViewMatrix)
        mat4.transpose(normalMatrix, normalMatrix)
        return normalMatrix
      }
    },
    attributes: {
      position: buffer(geometry.positions),
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
    primitive: (context, props) => props && props.primitive ? props.primitive : 'triangles'
  }

  if (geometry.cells) {
    commandParams.elements = geometry.cells
  } else if (hasIndices) {
    // FIXME: not entirely sure about all this
    const indices = geometry.indices
    /* let type
    if (indices instanceof Uint32Array && regl.hasExtension('oes_element_index_uint')) {
      type = 'uint32'
    }else if (indices instanceof Uint16Array) {
      type = 'uint16'
    } else {
      type = 'uint8'
    } */

    commandParams.elements = regl.elements({
      // type,
      data: indices
    })
  } else if (geometry.triangles) {
    commandParams.elements = geometry.triangles
  } else {
    commandParams.count = geometry.positions.length / 3
  }

  if (hasNormals) {
    commandParams.attributes.normal = buffer(geometry.normals)
  }
  if (hasVertexColors) {
    commandParams.attributes.color = buffer(geometry.colors)
  }

  // Splice in any extra params
  commandParams = Object.assign({}, commandParams, params.extras)
  return regl(commandParams)
}

module.exports = drawMesh
