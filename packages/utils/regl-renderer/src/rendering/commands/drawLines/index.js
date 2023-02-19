import mat4 from 'gl-mat4'

import * as vColorShaders from './vColorShaders.js'
import * as meshShaders from './meshShaders.js'
import * as colorOnlyShaders from './colorOnlyShaders.js'

import { meshColor } from '../../renderDefaults.js'

export const drawLines = (regl, params = {}) => {
  const defaults = {
    color: meshColor,
    geometry: undefined
  }
  let { geometry, color, transparent } = Object.assign({}, defaults, params)

  if ('color' in geometry) color = geometry.color

  const hasIndices = !!(geometry.indices && geometry.indices.length > 0)
  const hasNormals = !!(geometry.normals && geometry.normals.length > 0)
  const hasVertexColors = !!(geometry.colors && geometry.colors.length > 0)

  const vert = hasVertexColors ? vColorShaders.vert : meshShaders.vert
  const frag = hasVertexColors ? vColorShaders.frag : colorOnlyShaders.frag

  const commandParams = {
    primitive: 'lines',
    vert,
    frag,

    uniforms: {
      model: (context, props) => props.model || geometry.transforms || mat4.create(),
      ucolor: (context, props) => (props && props.color) ? props.color : color
    },
    attributes: {
      position: regl.buffer({ usage: 'static', type: 'float', data: geometry.positions })
    },
    depth: { enable: !transparent }
  }

  // blending is a bit tricky
  // https://stackoverflow.com/questions/51938739/regl-color-and-alpha-blending-of-primitives
  if (transparent) {
    commandParams.blend = {
      enable: true,
      func: { src: 'src alpha', dst: 'one minus src alpha' }
    }
  }

  if (hasVertexColors) {
    commandParams.attributes.color = regl.buffer({ usage: 'static', type: 'float', data: geometry.colors })
  }

  if (hasIndices) {
    commandParams.elements = regl.elements({ usage: 'static', type: 'uint16', data: geometry.indices })
  }

  if (hasNormals) {
    commandParams.attributes.normal = regl.buffer({ usage: 'static', type: 'float', data: geometry.normals })
  }

  return regl(commandParams)
}
