const mat4 = require('gl-mat4')

const { meshColor } = require('../../renderDefaults')

const drawLines = (regl, params = {}) => {
  const defaults = {
    color: meshColor,
    geometry: undefined
  }
  let { geometry, color } = Object.assign({}, defaults, params)

  if ('color' in geometry) color = geometry.color

  const hasIndices = !!(geometry.indices && geometry.indices.length > 0)
  const hasNormals = !!(geometry.normals && geometry.normals.length > 0)

  // console.log('type', geometry.type, 'color', color, hasIndices, hasNormals)

  let commandParams = {
    primitive: 'lines',
    vert: require('./meshShaders').vert,
    frag: require('./colorOnlyShaders').frag,

    uniforms: {
      model: (context, props) => props.model || geometry.transforms || mat4.create(),
      ucolor: (context, props) => (props && props.color) ? props.color : color
    },
    attributes: {
      position: regl.buffer({ usage: 'static', type: 'float', data: geometry.positions })
    }
  }

  if (hasIndices) {
    commandParams.elements = regl.elements({ usage: 'static', type: 'uint16', data: geometry.indices })
  }

  if (hasNormals) {
    commandParams.attributes.normal = regl.buffer({ usage: 'static', type: 'float', data: geometry.normals })
  }

  return regl(commandParams)
}

module.exports = drawLines
