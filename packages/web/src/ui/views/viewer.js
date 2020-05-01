
const html = require('bel')
// viewer data
const rendererStuff = require('@jscad/regl-renderer') // replace this with the correct import
const { prepareRender, drawCommands, cameras, entitiesFromSolids } = rendererStuff
const perspectiveCamera = cameras.perspective
const orbitControls = rendererStuff.controls.orbit

// params
const rotateSpeed = 0.002
const zoomSpeed = 0.08
const panSpeed = 1

// internal state
let initialized = false
let render
let viewerOptions
let camera = perspectiveCamera.defaults
let controls = orbitControls.defaults

const grid = { // grid data
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
    window.onresize = function () {
      resize(el)
      render(viewerOptions)
    }
    const foo = setup()
    viewerOptions = foo.viewerOptions
    camera = foo.camera
    camera.position = [150, 180, 233] // [150, 250, 200]
    render = prepareRender(viewerOptions)
    const gestures = require('most-gestures').pointerGestures(el)

    // rotate
    gestures.drags
      .forEach(data => {
        const delta = [data.delta.x, data.delta.y].map(d => -d)
        const { shiftKey } = data.originalEvents[0]
        if (!shiftKey) {
          const updated = orbitControls.rotate({ controls, camera, speed: rotateSpeed }, delta)
          controls = { ...controls, ...updated.controls }
        }
      })
    // pan
    gestures.drags
      .forEach(data => {
        const delta = [data.delta.x, data.delta.y].map(d => d)
        const { shiftKey } = data.originalEvents[0]
        if (shiftKey) {
          const updated = orbitControls.pan({ controls, camera, speed: panSpeed }, delta)
          // const fooCam = camera = { ...camera, ...updated.camera }
          camera.position = updated.camera.position
          camera.target = updated.camera.target
        }
      })

    // zoom
    gestures.zooms
      .forEach(x => {
        const updated = orbitControls.zoom({ controls, camera, speed: zoomSpeed }, -x)
        controls = { ...controls, ...updated.controls }
      })

    // auto fit
    gestures.taps
      .filter(taps => taps.nb === 2)
      .forEach(x => {
        const updated = orbitControls.zoomToFit({ controls, camera, entities })
        controls = { ...controls, ...updated.controls }
      })

    // some live animation example
    const updateAndRender = () => {
      const updatedA = orbitControls.update({ controls, camera })
      controls = { ...controls, ...updatedA.controls }
      camera.position = updatedA.camera.position
      perspectiveCamera.update(camera)

      resize(el)
      render(viewerOptions)
      window.requestAnimationFrame(updateAndRender)
    }
    window.requestAnimationFrame(updateAndRender)

    resize(el)
  } else {
    if (prevSolids) {
      const solids = state.design.solids
      const sameSolids = solids.length === prevSolids.length &&
      JSON.stringify(state.design.solids) === JSON.stringify(prevSolids)
      // return sameSolids
      prevSolids = solids
      // console.log('sameSolids', sameSolids)
      if (!sameSolids) {
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

    const updated = orbitControls.update({ controls, camera })
    controls = { ...controls, ...updated.controls }
    camera.position = updated.camera.position
    perspectiveCamera.update(camera)

    resize(el)
    render(viewerOptions)
  }

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
  const pixelRatio = window.devicePixelRatio || 1
  let width = window.innerWidth
  let height = window.innerHeight
  if (viewerElement !== document.body) {
    const bounds = viewerElement.getBoundingClientRect()
    width = bounds.right - bounds.left
    height = bounds.bottom - bounds.top
  }
  viewerElement.width = pixelRatio * width
  viewerElement.height = pixelRatio * height
}
