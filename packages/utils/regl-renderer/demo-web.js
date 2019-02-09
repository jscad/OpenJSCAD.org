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

const width = window.innerWidth
const height = window.innerHeight

// process entities and inject extras
const solids = entitiesFromSolids({}, initializeData())

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
    drawGrid: drawCommands.drawGrid, // require('./src/rendering/drawGrid/index.js'),
    drawAxis: drawCommands.drawAxis, // require('./src/rendering/drawAxis'),
    drawMesh: drawCommands.drawMesh // require('./src/rendering/drawMesh/index.js')
  },
  // data
  entities: [
    { // grid data
      // the choice of what draw command to use is also data based
      visuals: {
        drawCmd: 'drawGrid',
        show: true,
        color: [0, 0, 0, 1],
        subColor: [0, 0, 1, 0.5],
        fadeOut: false,
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
// do the actual render :  it is a simple function !
render(options)

// some live animation example
let tick = 0
const updateAndRender = () => {
  tick += 0.01
  camera.position[0] = Math.cos(tick) * 800
  perspectiveCamera.update(camera, camera)
  options.camera = camera

  // you can change the state of the viewer at any time by just calling the viewer
  // function again with different params
  render(options)
  window.requestAnimationFrame(updateAndRender)
}
window.requestAnimationFrame(updateAndRender)
