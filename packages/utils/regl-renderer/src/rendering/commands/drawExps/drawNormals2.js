const mat4 = require('gl-mat4')

const drawNormals = function (regl, params) {
  const defaults = {
    xColor: [1, 0, 0, 1],
    yColor: [0, 1, 0, 1],
    zColor: [0, 0, 1, 1],
    size: 10,
    lineWidth: 3, // FIXME/ linewidth has been "deprecated" in multiple browsers etc, need a workaround,
    alwaysVisible: true, // to have the widget alway visible 'on top' of the rest of the scene
    geometry: undefined
  }
  let { size, xColor, yColor, zColor, lineWidth, alwaysVisible, geometry } = Object.assign({}, defaults, params)

  if (!geometry) {
    throw new Error('no geometry provided to drawNormals')
  }
  if (lineWidth > regl.limits.lineWidthDims[1]) {
    lineWidth = regl.limits.lineWidthDims[1]
  }
  const points = [
    0, 0, 0,
    size, 0, 0
  ]

  console.log('geometry', geometry)

  const commandParams = {
    frag: `precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
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
      color: (context, props) => props.color,
      angle: (contet, props) => props.angle
    },
    attributes: {
      position: points
    },
    count: points.length / 3,
    primitive: 'line loop',
    lineWidth,
    depth: {
      enable: !alwaysVisible // disable depth testing to have the axis widget 'alway on top' of other items in the 3d viewer
    }
  }

  // const xAxisModel = mat4.identity([])
  // const yAxisModel = mat4.rotateZ(mat4.create(), mat4.identity([]), Math.PI / 2)
  // const zAxisModel = mat4.rotateY(mat4.create(), mat4.identity([]), -Math.PI / 2)

  const foo = geometry.normals.map(function (normal, index) {
    let orientation = mat4.identity([])
    orientation = mat4.rotateX(orientation, orientation, normal[0])
    orientation = mat4.rotateY(orientation, orientation, normal[1])
    orientation = mat4.rotateZ(orientation, orientation, normal[2])
    const position = mat4.translate([], orientation, geometry.positions[index])

    return { color: xColor, model: position }
  })
  const singleNormal = regl(commandParams)
  return () => singleNormal(foo)
}

module.exports = drawNormals
