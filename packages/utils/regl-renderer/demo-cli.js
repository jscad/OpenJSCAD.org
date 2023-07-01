import gl from 'gl'

import { colors, primitives, booleans } from '@jscad/modeling'

import { writeContextToFile } from '@jscad/img-utils'

import { prepareRender, commands, cameras, entitiesFromSolids } from './dist/jscad-regl-renderer.es.js'

// setup demo solids data
const demoSolids = (parameters) => {
  const { colorize } = colors
  const { cube, cuboid, line, sphere, star } = primitives
  const { intersect, subtract } = booleans

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
  const star2D = star({ vertices: 8, innerRadius: 300, outerRadius: 400 })
  const line2D = colorize([1.0, 0, 0], line([[260, 260], [-260, 260], [-260, -260], [260, -260], [260, 260]]))
  // some colors are intentionally without alpfa channel to test geom2ToGeometries will add alpha channel
  const colorChange = [
    [1, 0, 0, 1],
    [1, 0.5, 0],
    [1, 0, 1],
    [0, 1, 0],
    [0, 0, 0.7]
  ]
  star2D.outlines.forEach((outline, i) => {
    outline.color = colorChange[i % colorChange.length]
  })

  return [transpCube, star2D, line2D, ...logo]
}

const params = {
  width: 640,
  height: 480
}

const { width, height } = params

// create webgl context
const context = gl(width, height)

// process entities and inject extras
const entities = entitiesFromSolids({}, demoSolids({ scale: 1 }))

// prepare the camera
const perspectiveCamera = cameras.perspective
const camera = Object.assign({}, perspectiveCamera.defaults)
perspectiveCamera.setProjection(camera, camera, { width, height })
perspectiveCamera.update(camera, camera)

const options = {
  glOptions: { gl: context },
  camera,
  drawCommands: {
    // draw commands bootstrap themselves the first time they are run
    drawAxis: commands.drawAxis,
    drawGrid: commands.drawGrid,
    drawLines: commands.drawLines,
    drawMesh: commands.drawMesh
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
  // next few are for solids / csg / cags specifically
  overrideOriginalColors: false, // for csg/cag conversion: do not use the original (csg) color, use meshColor instead
  smoothNormals: true,

  // data
  entities: [
    { // grid data
      // the choice of what draw command to use is also data based
      visuals: {
        drawCmd: 'drawGrid',
        show: true
      },
      size: [500, 500],
      ticks: [25, 5]
      // color: [0, 0, 1, 1],
      // subColor: [0, 0, 1, 0.5]
    },
    {
      visuals: {
        drawCmd: 'drawAxis',
        show: true
      },
      size: 300
      // alwaysVisible: false,
      // xColor: [0, 0, 1, 1],
      // yColor: [1, 0, 1, 1],
      // zColor: [0, 0, 0, 1]
    },
    ...entities
  ]
}

// render the contents
const render = prepareRender(options)
render(options)

// output to file
writeContextToFile(context, width, height, 4, './test.png')
