
const { writeContextToFile } = require('../img/src/imgUtils')
const prepareRender = require('./src/rendering/render')
const perspectiveCamera = require('./src/cameras/perspectiveCamera')
const entitiesFromSolids = require('./src/geometry-utils/entitiesFromSolids')

// setup demo data
const initializeData = function () {
  const { cube, sphere } = require('@jscad/scad-api').primitives3d
  const { union, difference, intersection } = require('@jscad/scad-api').booleanOps
  return union(
    difference(
      cube({ size: 30, center: true }),
      sphere({ r: 20, center: true })
    ),
    intersection(
      sphere({ r: 13, center: true }),
      cube({ size: 21, center: true })
    )
  ).translate([0, 0, 1.5]).scale(10)
}

const params = {
  width: 640,
  height: 480
}
const { width, height } = params
const solids = entitiesFromSolids({}, initializeData()).map(e => {
  e.drawCmd = 'drawMesh'
  e.show = true
  e.color = [0.8, 0.5, 0.7, 0.1]
  e.useVertexColors = true// : true
  return e
})

const camera = Object.assign({}, perspectiveCamera.defaults)
perspectiveCamera.setProjection(camera, camera, { width, height })
perspectiveCamera.update(camera, camera)

const options = {
  camera,
  drawCommands: {
    // draw commands should bootstrap themselves the first time they are run
    drawGrid: require('./src/rendering/drawGrid/index.js'),
    drawAxis: require('./src/rendering/drawAxis'),
    drawMesh: require('./src/rendering/drawMesh/index.js')
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
      // the choice of what draw command to use is also be data based
      drawCmd: 'drawGrid',
      show: true,
      size: [500, 500],
      ticks: [10, 1],
      color: [0, 0, 0, 1],
      // subColor: [0, 0, 1, 1],
      fadeOut: false
    },
    {
      drawCmd: 'drawAxis',
      show: true
    },
    ...solids
  ]
}

// create webgl context
const gl = require('gl')(width, height)
// setup regl
const regl = require('regl')({
  gl
// extensions:['oes_element_index_uint']
}, (width, height))

// prepare
const render = prepareRender(regl, options)
// do the actual render
render(options)
// output to file
writeContextToFile(gl, width, height, 4, './test.png')
