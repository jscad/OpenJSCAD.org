const html = require('nanohtml')

// viewer data
const rendererStuff = require('@jscad/regl-renderer')

const { pointerGestures } = require('../../most-gestures')
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
let updateView = true

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

  if (!render) {
    const options = setup(el)
    if (options.error) return html`<b style="color:red; background:white; position:fixed; z-index:10; top:50%">${options.error}</b>`
    viewerOptions = options.viewerOptions
    camera = options.camera
    render = prepareRender(viewerOptions)
    const gestures = pointerGestures(el)

    window.addEventListener('resize', (evt) => { updateView = true })

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
      if (rotateDelta[0] || rotateDelta[1]) {
        const updated = orbitControls.rotate({ controls, camera, speed: rotateSpeed }, rotateDelta)
        rotateDelta = [0, 0]
        controls = { ...controls, ...updated.controls }
        updateView = true
      }

      if (panDelta[0] || panDelta[1]) {
        const updated = orbitControls.pan({ controls, camera, speed: panSpeed }, panDelta)
        panDelta = [0, 0]
        camera.position = updated.camera.position
        camera.target = updated.camera.target
        updateView = true
      }

      if (zoomDelta) {
        const updated = orbitControls.zoom({ controls, camera, speed: zoomSpeed }, zoomDelta)
        controls = { ...controls, ...updated.controls }
        zoomDelta = 0
        updateView = true
      }

      if (zoomToFit) {
        controls.zoomToFit.tightness = 1.5
        const updated = orbitControls.zoomToFit({ controls, camera, entities: prevEntities })
        controls = { ...controls, ...updated.controls }
        zoomToFit = false
        updateView = true
      }
    }

    // the heart of rendering, as themes, controls, etc change
    const updateAndRender = (timestamp) => {
      doRotatePanZoom()

      if (updateView) {
        const updated = orbitControls.update({ controls, camera })
        controls = { ...controls, ...updated.controls }
        updateView = controls.changed // for elasticity in rotate / zoom

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
      const sameSolids = compareSolids(solids, prevSolids)
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
        updateView = true
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

  return el
}

const createContext = (canvas, contextAttributes) => {
  const get = (type) => {
    try {
      // NOTE: older browsers may return null from getContext()
      const context = canvas.getContext(type)
      return context ? { gl: context, type } : null
    } catch (e) {
      return null
    }
  }
  return (
    get('webgl2') ||
    get('webgl') ||
    get('experimental-webgl') ||
    get('webgl-experimental')
  )
}

const setup = (element) => {
  // prepare the camera
  let error
  const camera = Object.assign({}, perspectiveCamera.defaults)
  camera.position = [150, -180, 233]

  const { gl, type } = createContext(element)

  const viewerOptions = {
    glOptions: { gl },
    camera,
    drawCommands: {
      // draw commands bootstrap themselves the first time they are run
      drawAxis: drawCommands.drawAxis,
      drawGrid: drawCommands.drawGrid,
      drawLines: drawCommands.drawLines,
      drawMesh: drawCommands.drawMesh
    },
    // data
    entities: []
  }
  if (type === 'webgl') {
    if (gl.getExtension('OES_element_index_uint')) {
      viewerOptions.glOptions.optionalExtensions = ['oes_element_index_uint']
    }
  }
  return { viewerOptions, camera, error }
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

let idCounter = Date.now()
const compareSolids = (current, previous) => {
  // any solid or value type compares to null is false
  if (current.indexOf(null) > -1) return false
  // add an id to each solid if not already
  current = current.map((s) => {
    if (!s.id) s.id = ++idCounter
    return s
  })
  // check if the solids are the same
  if (!previous) return false
  if (current.length !== previous.length) return false
  return current.reduce((acc, id, i) => acc && current[i].id === previous[i].id, true)
}

module.exports = { viewer, compareSolids }
