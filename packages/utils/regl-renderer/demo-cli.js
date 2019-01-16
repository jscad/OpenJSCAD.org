
const { writeContextToFile } = require('../img/src/imgUtils')
const { prepareRender, drawCommands, cameras, entitiesFromSolids } = require('./src') // replace this with the correct import

// setup demo solids data
const initializeData = function () {
  const { color } = require('@jscad/scad-api').color
  const { cube, sphere } = require('@jscad/scad-api').primitives3d
  const { union, difference, intersection } = require('@jscad/scad-api').booleanOps
  const logo = union(
    difference(
      cube({ size: 30, center: true }),
      sphere({ r: 20, center: true })
    ),
    intersection(
      sphere({ r: 13, center: true }),
      cube({ size: 21, center: true })
    )
  ).translate([0, 0, 1.5]).scale(10)

  const transpCube = color([1, 0, 0, 0.75], cube({ size: [100, 100, 400] }))
  return [ transpCube, logo ]
}

const params = {
  width: 640,
  height: 480
}
const { width, height } = params
// create webgl context
const gl = require('gl')(width, height)

// process entities and inject extras
const solids = entitiesFromSolids({}, initializeData())

// prepare the camera
const perspectiveCamera = cameras.perspective
const camera = Object.assign({}, perspectiveCamera.defaults)
perspectiveCamera.setProjection(camera, camera, { width, height })
perspectiveCamera.update(camera, camera)

const options = {
  glOptions: { gl },
  camera,
  drawCommands: {
    // draw commands bootstrap themselves the first time they are run
    drawGrid: drawCommands.drawGrid, // require('./src/rendering/drawGrid/index.js'),
    drawAxis: drawCommands.drawAxis, // require('./src/rendering/drawAxis'),
    drawMesh: drawCommands.drawMesh // require('./src/rendering/drawMesh/index.js')
  },
  rendering: {
    background: [1, 1, 1, 1],
    meshColor: [1, 0.5, 0.5, 1], // use as default face color for csgs, color for cags
    lightColor: [1, 1, 1, 1], // note: for now there is a single preset light, not an entity
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
      // the choice of what draw command to use is also data based
      visuals: {
        drawCmd: 'drawGrid',
        show: true,
        color: [0, 0, 0, 0.1],
        subColor: [0, 0, 1, 0.1],
        fadeOut: true,
        transparent: true
      },
      size: [500, 500],
      ticks: [10, 1]
    },
    {
      visuals: {
        drawCmd: 'drawAxis',
        show: true
      }
    },
    ...solids
  ]
}

// prepare
const render = prepareRender(options)
// do the actual render
render(options)
// output to file
writeContextToFile(gl, width, height, 4, './test.png')
