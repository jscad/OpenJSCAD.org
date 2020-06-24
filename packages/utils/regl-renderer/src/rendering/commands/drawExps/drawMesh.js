const mat4 = require('gl-mat4')

const drawMesh = (regl, params) => {
  const mesh = params.geometry
  return regl({
    vert: `
      precision mediump float;
      uniform mat4 projection, view;
      attribute vec3 position, normal;
      varying vec3 vNormal;
      void main () {
        vNormal = normal;
        gl_Position = projection * view * vec4(position, 1.0);
      }`,

    frag: `precision mediump float;
      varying vec3 vNormal;
      void main () {
        gl_FragColor = vec4(vNormal, 1.0);
      }`,

    // this converts the vertices of the mesh into the position attribute
    attributes: {
      position: mesh.positions,
      normal: mesh.normals
    },

    // and this converts the faces fo the mesh into elements
    elements: mesh.triangles || mesh.indices || mesh.cells,

    uniforms: {
      model: (context, props) => props && props.model ? props.model : mat4.identity([]),
      color: (context, props) => [1, 0, 0, 1],
      view: ({ tick }) => {
        const t = 0.01 * tick
        return mat4.lookAt([],
          [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
          [0, 2.5, 0],
          [0, 1, 0])
      },
      projection: ({ viewportWidth, viewportHeight }) =>
        mat4.perspective([],
          Math.PI / 4,
          viewportWidth / viewportHeight,
          0.01,
          1000)
    },
    cull: {
      enable: true,
      face: 'front'
    },
    blend: {
      enable: false,
      func: {
        src: 'src alpha',
        dst: 'one minus src alpha'
      }
    }
  })
}

module.exports = drawMesh
