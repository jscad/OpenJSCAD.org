const { writeContextToFile } = require('@jscad/img-utils')

const { prepareRender, drawCommands, cameras, entitiesFromSolids } = require('./src') // replace this with the correct import

// setup demo solids data
const demoSolids = (parameters) => {
  const { colorize } = require('@jscad/modeling').colors
  const { cube, cuboid, line, sphere, star } = require('@jscad/modeling').primitives
  const { intersect, subtract } = require('@jscad/modeling').booleans

  const logo = [
    colorize([1.0, 0.4, 1.0], subtract(
      cube({ size: 300 }),
      sphere({ radius: 200 })
    )),
    colorize([1.0, 1.0, 0], intersect(
      sphere({ radius: 130 }),
      cube({ size: 210 })
    ))
  ]

  const transpCube = colorize([1, 0, 0, 0.75], cuboid({ size: [100 * parameters.scale, 100, 210 + (200 * parameters.scale)] }))
  const star2D = star({ vertices: 8, innerRadius: 150, outerRadius: 200 })
  const line2D = colorize([1.0, 0, 0], line([[220, 220], [-220, 220], [-220, -220], [220, -220], [220, 220]]))

  return [transpCube, star2D, line2D, ...logo]
}

const params = {
  width: 640,
  height: 480
}

const { width, height } = params

// create webgl context
const gl = require('gl')(width, height)

// process entities and inject extras
const solids = entitiesFromSolids({}, demoSolids({ scale: 1 }))

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
