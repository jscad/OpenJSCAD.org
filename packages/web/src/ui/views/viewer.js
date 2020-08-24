const html = require('bel')

// viewer data
const rendererStuff = require('@jscad/regl-renderer')

const { prepareRender, drawCommands, cameras, entitiesFromSolids } = rendererStuff
const perspectiveCamera = cameras.perspective
const orbitControls = rendererStuff.controls.orbit

// params
const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08

const rotateRate = 20 // number of rotations per second
let lastRotate = 0 // time in ms
const zoomRate = 20 // number of zooms per second
let lastZoom = 0 // time in ms
const panRate = 20 // number of pans per second
let lastPan = 0 // time in ms
const renderRate = 10 // number of renders per second
let lastRender = 0

// internal state
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

const axes = {
  visuals: {
    drawCmd: 'drawAxis',
    show: true
  }
}

let prevEntities = []
let prevSolids

const viewer = (state, i18n) => {
  // console.log('regen viewer', state.viewer)
  const el = html`<canvas id='renderTarget'> </canvas>`

  if (!render) {
    window.onresize = () => {
      resize(el)
      render(viewerOptions)
    }

    const options = setup(el)
    viewerOptions = options.viewerOptions
    camera = options.camera
    render = prepareRender(viewerOptions)
    const gestures = require('most-gestures').pointerGestures(el)

    // rotate
    gestures.drags
      .forEach((data) => {
        const { shiftKey } = data.originalEvents[0]
        if (!shiftKey) {
          const now = Date.now()
          const ms = now - lastRotate
          if (ms > (1000 / rotateRate)) {
            const delta = [data.delta.x, data.delta.y].map((d) => -d)
            const updated = orbitControls.rotate({ controls, camera, speed: rotateSpeed }, delta)
            controls = { ...controls, ...updated.controls }
            lastRotate = now
          }
        }
      })
    // pan
    gestures.drags
      .forEach((data) => {
        const { shiftKey } = data.originalEvents[0]
        if (shiftKey) {
          const now = Date.now()
          const ms = now - lastPan
          if (ms > (1000 / panRate)) {
            const delta = [data.delta.x, data.delta.y].map((d) => d)
            const updated = orbitControls.pan({ controls, camera, speed: panSpeed }, delta)
            camera.position = updated.camera.position
            camera.target = updated.camera.target
            lastPan = now
          }
        }
      })

    // zoom
    gestures.zooms
      .forEach((x) => {
        const now = Date.now()
        const ms = now - lastZoom
        if (ms > (1000 / zoomRate)) {
          const updated = orbitControls.zoom({ controls, camera, speed: zoomSpeed }, -x)
          controls = { ...controls, ...updated.controls }
          lastZoom = now
        }
      })

    // auto fit
    gestures.taps
      .filter((taps) => taps.nb === 2)
      .forEach((x) => {
        const updated = orbitControls.zoomToFit({ controls, camera, entities: prevEntities })
        controls = { ...controls, ...updated.controls }
      })

    // the heart of rendering, as themes, controls, etc change
    const updateAndRender = (timestamp) => {
      const elaspe = timestamp - lastRender
      if (elaspe > (1000 / renderRate)) {
        lastRender = timestamp

        const updatedA = orbitControls.update({ controls, camera })
        controls = { ...controls, ...updatedA.controls }
        camera.position = updatedA.camera.position
        perspectiveCamera.update(camera)

        resize(el)
        render(viewerOptions)
      }
      window.requestAnimationFrame(updateAndRender)
    }
    window.requestAnimationFrame(updateAndRender)
  } else {
    // only generate entities when the solids change
    // themes, options, etc also change the viewer state
    const solids = state.design.solids
    if (prevSolids) {
      // FIXME inefficient, replace
      const sameSolids = solids.length === prevSolids.length && JSON.stringify(solids) === JSON.stringify(prevSolids)
      if (!sameSolids) {
        const theme = state.themes.themeSettings.viewer
        const meshColor = theme.rendering.meshColor
        prevEntities = entitiesFromSolids({ meshColor }, solids)
      }
    }
    prevSolids = solids

    if (state.themes && state.themes.themeSettings) {
      const theme = state.themes.themeSettings.viewer
      grid.visuals.color = theme.grid.color
      grid.visuals.subColor = theme.grid.subColor

      if (viewerOptions.rendering) {
        viewerOptions.rendering.background = theme.rendering.background
        viewerOptions.rendering.meshColor = theme.rendering.meshColor
      }
    }

    viewerOptions.entities = [
      state.viewer.grid.show ? grid : undefined,
      state.viewer.axes.show ? axes : undefined,
      ...prevEntities
    ].filter((x) => x !== undefined)
  }

  return el
}

const setup = (element) => {
  const width = window.innerWidth
  const height = window.innerHeight
  // prepare the camera
  const camera = Object.assign({}, perspectiveCamera.defaults)
  camera.position = [150, 180, 233]

  perspectiveCamera.setProjection(camera, camera, { width, height })
  perspectiveCamera.update(camera, camera)

  const viewerOptions = {
    glOptions: { canvas: element },
    camera,
    drawCommands: {
      // draw commands bootstrap themselves the first time they are run
      drawGrid: drawCommands.drawGrid,
      drawAxis: drawCommands.drawAxis,
      drawMesh: drawCommands.drawMesh
    },
    // data
    entities: []
  }
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

module.exports = viewer
