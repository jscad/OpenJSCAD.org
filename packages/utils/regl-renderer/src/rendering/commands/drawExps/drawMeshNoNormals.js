const mat4 = require('gl-mat4')

const drawMesh = (regl, params) => {
  const defaults = {
    geometry: undefined
  }
  const { geometry } = Object.assign({}, defaults, params)

  const commandParams = {
    frag: `precision mediump float;
    uniform vec4 uColor;
    void main() {
      gl_FragColor = uColor;
    }`,
    vert: `
    precision mediump float;
    attribute vec3 position;
    uniform mat4 model, view, projection;
    void main() {
      gl_Position = projection * view * model * vec4(position, 1);
    }`,

    uniforms: {
      model: (context, props) => props && props.model ? props.model : mat4.identity([]),
      uColor: (context, props) => props && props.color ? props.color : [1, 1, 1, 1]
    },
    attributes: {
      position: geometry.positions
    },
    elements: geometry.cells,
    cull: {
      enable: false
    },
    blend: {
      enable: false,
      func: {
        src: 'src alpha',
        dst: 'one minus src alpha'
      }
    }
  }
  return regl(commandParams)
}

module.exports = drawMesh
