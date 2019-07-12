
const html = require('bel')
// const onload = require('on-load')
// viewer data
const makeCsgViewer = require('@jscad/csg-viewer')
const { prepareRender, drawCommands, cameras, entitiesFromSolids } = require('@jscad/regl-renderer') // replace this with the correct import
const perspectiveCamera = cameras.perspective

let initialized = false
let render
let viewerOptions
let camera

let grid = { // grid data
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
}
const axes =
  {
    visuals: {
      drawCmd: 'drawAxis',
      show: true
    }
  }
let entities = []
let prevSolids

module.exports = function viewer (state, i18n) {
  // console.log('regen viewer', state.viewer)
  const el = html`<canvas id='renderTarget'> </canvas>`

  if (!initialized) {
    let foo = setup()
    viewerOptions = foo.viewerOptions
    camera = foo.camera
    render = prepareRender(viewerOptions)
    render(viewerOptions)
    // const bar = require('most-gestures').pointerGestures(jscadEl.querySelector('#renderTarget'))

    // some live animation example
    /* let tick = 0
    const updateAndRender = () => {
      tick += 0.01
      camera.position[0] = Math.cos(tick) * 800
      perspectiveCamera.update(camera, camera)
      viewerOptions.camera = camera

      // you can change the state of the viewer at any time by just calling the viewer
      // function again with different params
      render(viewerOptions)
      window.requestAnimationFrame(updateAndRender)
    }
    window.requestAnimationFrame(updateAndRender) */

    resize(el)
  } else {
    viewerOptions.camera.position = [150, 150, 100]

    if (prevSolids) {
      let solids = state.design.solids
      const sameSolids = solids.length === prevSolids.length &&
      JSON.stringify(state.design.solids) === JSON.stringify(prevSolids)
      // return sameSolids
      prevSolids = solids
      console.log('sameSolids', sameSolids)
      if (!sameSolids) {
        console.log('REGEN')
        entities = entitiesFromSolids({}, state.design.solids)
      }
    } else {
      prevSolids = state.design.solids
    }

    viewerOptions.entities = [
      state.viewer.grid.show ? grid : undefined,
      state.viewer.axes.show ? axes : undefined,
      ...entities
    ]
      .filter(x => x !== undefined)
    // console.log('rendering', viewerOptions.entities)
    perspectiveCamera.update(camera, camera)

    render(viewerOptions)
  }

  // handle injection into dom
  /* onload(el, function (_el) {
    setCanvasSize(_el)
    window.onresize = function () {
      setCanvasSize(_el)
    }
  }) */
  return el
}

/* .skipRepeatsWith(function (state, previousState) {
    const sameSolids = state.design.solids.length === previousState.design.solids.length &&
      JSON.stringify(state.design.solids) === JSON.stringify(previousState.design.solids)
    return sameSolids
  }) */

const setup = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  // prepare the camera
  const camera = Object.assign({}, perspectiveCamera.defaults)
  perspectiveCamera.setProjection(camera, camera, { width, height })
  perspectiveCamera.update(camera, camera)

  const viewerOptions = {
    glOptions: { container: document.body },
    camera,
    drawCommands: {
    // draw commands bootstrap themselves the first time they are run
      drawGrid: drawCommands.drawGrid, // require('./src/rendering/drawGrid/index.js'),
      drawAxis: drawCommands.drawAxis, // require('./src/rendering/drawAxis'),
      drawMesh: drawCommands.drawMesh // require('./src/rendering/drawMesh/index.js')
    },
    // data
    entities: []
  }
  initialized = true
  return { viewerOptions, camera }
}

const resize = (viewerElement) => {
  const bounds = viewerElement.getBoundingClientRect()
  const w = bounds.right - bounds.left
  const h = bounds.bottom - bounds.top
  const pixelRatio = window.devicePixelRatio || 1
  viewerElement.width = pixelRatio * w
  viewerElement.height = pixelRatio * h
}

const setCanvasSize = (viewerElement) => {
  if (!viewerElement) {
    return
  }
  let pixelRatio = window.devicePixelRatio || 1
  let width = window.innerWidth
  let height = window.innerHeight
  if (viewerElement !== document.body) {
    const bounds = viewerElement.getBoundingClientRect()
    width = bounds.right - bounds.left
    height = bounds.bottom - bounds.top
  }
  width *= pixelRatio
  height *= pixelRatio
  viewerElement.width = width
  viewerElement.height = height
  // console.log('width', width, 'height', height, 'of', viewerElement)
}
