const { prepareRender, drawCommands, cameras, entitiesFromSolids } = require('./src')

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
  star2D.sides.forEach((side, i) => {
    if (i >= 2) side.color = colorChange[i % colorChange.length]
  })

  return [transpCube, line2D, star2D, ...logo]
}

const width = window.innerWidth
const height = window.innerHeight

// process entities and inject extras
const entities = entitiesFromSolids({}, demoSolids({ scale: 1 }))

// prepare the camera
const perspectiveCamera = cameras.perspective
const camera = Object.assign({}, perspectiveCamera.defaults)
perspectiveCamera.setProjection(camera, camera, { width, height })
perspectiveCamera.update(camera, camera)

const options = {
  glOptions: { container: document.body },
  camera,
  drawCommands: {
    // draw commands bootstrap themselves the first time they are run
    drawAxis: drawCommands.drawAxis,
    drawGrid: drawCommands.drawGrid,
    drawLines: drawCommands.drawLines,
    drawMesh: drawCommands.drawMesh
  },
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
// prepare
const render = prepareRender(options)
// do the actual render :  it is a simple function !
render(options)

// some live animation example
let tick = 0

let updateCounter = 0
const updateAndRender = () => {
  tick += 0.01
  camera.position[0] = Math.cos(tick) * 800
  perspectiveCamera.update(camera, camera)
  options.camera = camera

  // dynamic geometries, yes indeed !, uncoment this if you want to show it
  // updateCounter += 1

  if (updateCounter > 360) {
    const entitiesDynamic = entitiesFromSolids({}, demoSolids({ scale: Math.random() }))
    options.entities = entitiesDynamic
    updateCounter = 0
  }

  // you can change the state of the viewer at any time by just calling the viewer
  // function again with different params
  render(options)
  window.requestAnimationFrame(updateAndRender)
}
window.requestAnimationFrame(updateAndRender)
