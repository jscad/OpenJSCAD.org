const html = require('nanohtml')

// viewer data
const rendererStuff = require('@jscad/regl-renderer')

const { prepareRender, drawCommands, cameras, entitiesFromSolids } = rendererStuff
const perspectiveCamera = cameras.perspective
const orbitControls = rendererStuff.controls.orbit

// params
const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08

// internal state
let render
let viewerOptions
let camera = perspectiveCamera.defaults
let controls = orbitControls.defaults
let rotateDelta = [0, 0]
let panDelta = [0, 0]
let zoomDelta = 0
let zoomToFit = false
let renderUntil = Number.MAX_VALUE

// set a time to stop rendering with a small time buffer just in case.
// rotation has some elasticity in movement so this way we let it finish for sure
const moveRender = () => { renderUntil = Date.now() + 1000 }

const grid = { // command to draw the grid
  visuals: {
    drawCmd: 'drawGrid',
    show: true,
    color: [0, 0, 0, 1],
    subColor: [0, 0, 1, 0.5],
    fadeOut: false,
    transparent: true
  },
  size: [200, 200],
  ticks: [10, 1]
}

const axes = { // command to draw the axes
  visuals: {
    drawCmd: 'drawAxis',
    show: true
  }
}

let prevEntities = []
let prevSolids
let prevColor = []

const viewer = (state, i18n) => {
  const el = html`<canvas id='renderTarget'> </canvas>`
  window.addEventListener('resize', moveRender)

  if (!render) {
    const options = setup(el)
    viewerOptions = options.viewerOptions
    camera = options.camera
    render = prepareRender(viewerOptions)
    const gestures = require('most-gestures').pointerGestures(el)

    // rotate & pan
    gestures.drags
      .forEach((data) => {
        const ev = data.originalEvents[0]
        const { x, y } = data.delta
        const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
        if (shiftKey) {
          panDelta[0] += x
          panDelta[1] += y
        } else {
          rotateDelta[0] -= x
          rotateDelta[1] -= y
        }
      })

    // zoom
    gestures.zooms
      .forEach((x) => {
        zoomDelta -= x
      })

    // auto fit
    gestures.taps
      .filter((taps) => taps.nb === 2)
      .forEach((x) => {
        zoomToFit = true
      })

    const doRotatePanZoom = () => {
      let changed = false

      if (rotateDelta[0] || rotateDelta[1]) {
        const updated = orbitControls.rotate({ controls, camera, speed: rotateSpeed }, rotateDelta)
        rotateDelta = [0, 0]
        controls = { ...controls, ...updated.controls }
        changed = true
      }

      if (panDelta[0] || panDelta[1]) {
        const updated = orbitControls.pan({ controls, camera, speed: panSpeed }, panDelta)
        panDelta = [0, 0]
        camera.position = updated.camera.position
        camera.target = updated.camera.target
        changed = true
      }

      if (zoomDelta) {
        const updated = orbitControls.zoom({ controls, camera, speed: zoomSpeed }, zoomDelta)
        controls = { ...controls, ...updated.controls }
        zoomDelta = 0
        changed = true
      }

      if (zoomToFit) {
        controls.zoomToFit.tightness = 1.3
        const updated = orbitControls.zoomToFit({ controls, camera, entities: prevEntities })
        controls = { ...controls, ...updated.controls }
        zoomToFit = false
        changed = true
      }
      return changed
    }

    // the heart of rendering, as themes, controls, etc change
    const updateAndRender = (timestamp) => {
      if (doRotatePanZoom() || controls.autoRotate.enabled) {
        moveRender()
      }

      if (renderUntil > Date.now()) {
        const updated = orbitControls.update({ controls, camera })
        controls = { ...controls, ...updated.controls }
        camera.position = updated.camera.position
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
      const theme = state.themes.themeSettings.viewer
      const color = theme.rendering.meshColor
      const sameColor = prevColor === color
      // FIXME inefficient, replace
      const sameSolids = solids.length === prevSolids.length && JSON.stringify(solids) === JSON.stringify(prevSolids)
      if (!(sameSolids && sameColor)) {
        prevEntities = entitiesFromSolids({ color }, solids)
        prevColor = color

        zoomToFit = state.viewer.rendering.autoZoom
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

    // special camera commands
    if (state.viewer.camera.position !== '') {
      const adjustment = cameras.camera.toPresetView(state.viewer.camera.position, { camera })
      camera.position = adjustment.position
      perspectiveCamera.update(camera)

      state.viewer.camera.position = ''
    }
    if (state.viewer.rendering) {
      controls.autoRotate.enabled = state.viewer.rendering.autoRotate
    }
  }

  moveRender() // possible fix for huge designs
  return el
}

const setup = (element) => {
  // prepare the camera
  const camera = Object.assign({}, perspectiveCamera.defaults)
  camera.position = [150, -180, 233]

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
  const bounds = viewerElement.getBoundingClientRect()

  const width = (bounds.right - bounds.left) * pixelRatio
  const height = (bounds.bottom - bounds.top) * pixelRatio

  const prevWidth = viewerElement.width
  const prevHeight = viewerElement.height

  if (prevWidth !== width || prevHeight !== height) {
    viewerElement.width = width
    viewerElement.height = height

    perspectiveCamera.setProjection(camera, camera, { width, height })
    perspectiveCamera.update(camera, camera)
  }
}

module.exports = viewer
