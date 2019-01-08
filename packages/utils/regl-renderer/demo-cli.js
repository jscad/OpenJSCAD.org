
const { writeContextToFile } = require('../img/src/imgUtils')

const prepareRender = require('./src/rendering/render')
const perspectiveCamera = require('./src/cameras/perspectiveCamera')

const params = {
  width: 640,
  height: 480
}
const { width, height } = params

// the choice of what draw command to use should also be data based, rather than passing
// around a function pointer ?

// also perhaps draw calls should bootstrap themselves ?
// anw what about instancing

/*
// Drawgrid: specific command
const {merge} = require('./utils')
const makeDrawGrid = require('./rendering/drawGrid/multi')
const {ticks, size} = Object.assign([], state.grid, data.grid)
const drawGrid = makeDrawGrid(state.regl, {size, ticks})
data.drawCommands = merge({}, state.drawCommands, {drawGrid})

// drawMesh: not specific command
qsdqdq

// can we memoize based on the parameters (ie data we want to draw?)

*/
/* //possible ??
  const drawCommands = {
    'drawGrid': bootStrapDrawGrid // should either be called with new params, or create ?
  }
*/

const drawFoo = (regl) => {
  return regl({
    frag: `
      precision mediump float;
      uniform vec4 color;
      void main() {
        gl_FragColor = color;
      }`,

    vert: `
      precision mediump float;
      attribute vec2 position;
      uniform float angle;
      void main() {
        gl_Position = vec4(
          cos(angle) * position.x + sin(angle) * position.y,
          -sin(angle) * position.x + cos(angle) * position.y, 0, 1);
      }`,

    attributes: {
      position: [
        -1, 0,
        0, -1,
        1, 1]
    },

    uniforms: {
      color: [1, 1, 1, 1],
      angle: ({ tick }) => 0.01 * tick
    },

    depth: {
      enable: false
    },

    count: 3
  })
}

const options = {
  camera: Object.assign({}, perspectiveCamera.defaults),
  drawCommands: {
    drawGrid: require('./src/rendering/drawGrid/index.js'),
    drawAxis: require('./src/rendering/drawAxis'),
    drawFoo
    // drawCSGs
  },
  rendering: {
    background: [1, 1, 1, 1],
    meshColor: [1, 0.5, 0.5, 1], // use as default face color for csgs, color for cags
    lightColor: [1, 1, 1, 1],
    lightDirection: [0.2, 0.2, 1],
    lightPosition: [100, 200, 100],
    ambientLightAmount: 0.3,
    diffuseLightAmount: 0.89,
    specularLightAmount: 0.16,
    materialShininess: 8.0
  },
  // next few are for solids / csg/ cags specifically
  overrideOriginalColors: false, // for csg/cag conversion: do not use the original (csg) color, use meshColor instead
  smoothNormals: true,

  // data
  entities: [
    { // grid data
      drawCmd: 'drawGrid',
      show: true,
      size: [200, 200],
      ticks: [10, 1],
      color: [0, 0, 1, 1],
      subColor: [0, 0, 1, 1],
      fadeOut: true
    },
    {
      drawCmd: 'drawFoo',
      show: true
    },
    {
      drawCmd: 'drawAxis',
      show: true
    }
  ]
}

// create webgl context
const gl = require('gl')(width, height)
// setup regl
const regl = require('regl')({
  gl
// extensions:['oes_element_index_uint']
}, (width, height))

const render = prepareRender(regl, options)

render(options)
render(options)

writeContextToFile(gl, width, height, 4, './test.png')
