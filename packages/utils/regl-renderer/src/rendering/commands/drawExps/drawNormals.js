const mat4 = require('gl-mat4')

const drawNormals = (regl, params) => {
  const defaults = {
    size: 20,
    lineWidth: 5, // FIXME/ linewidth has been "deprecated" in multiple browsers etc, need a workaround,
    alwaysVisible: true, // to have the widget alway visible 'on top' of the rest of the scene
    geometry: undefined
  }
  let { size, lineWidth, alwaysVisible, geometry } = Object.assign({}, defaults, params)

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

  const commandParams = {
    frag: `precision mediump float;
    uniform vec4 color;
    varying vec3 vnormal;
    vec3 foo = vec3(.0, .0, 1.0);
    void main() {

      gl_FragColor = color;
    }`,
    vert: `
    precision mediump float;
    attribute vec3 position, normal;
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

  const normaLines = geometry.normals.map((normal, index) => {
    const position = geometry.positions[index]
    const orientation = mat4.multiply(
      mat4.identity([]),
      mat4.translate(mat4.identity([]), mat4.identity([]), position),
      mat4.lookAt(mat4.identity([]), [0, 0, 0], normal, [0, 0, 1])
      // mat4.lookAt(mat4.identity([]), position, vec3.add([], position, normal), [0, 0, 0])
    )
    const matrix = orientation
    const absNormal = normal.map((x) => Math.abs(x))
    return { color: [absNormal[0], absNormal[1], absNormal[2], 1.0], model: matrix }
  })
  const singleNormal = regl(commandParams)
  return () => singleNormal(normaLines)
}

module.exports = drawNormals
