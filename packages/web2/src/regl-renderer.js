
const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08
let rotateDelta = [0, 0]
let panDelta = [0, 0]
let zoomDelta = 0
let updateRender = true
let orbitControls, renderOptions, gridOptions, axisOptions, renderer

let entities = []

function createContext (canvas, contextAttributes) {
  function get (type) {
    try {
      return { gl: canvas.getContext(type, contextAttributes), type }
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

const startRenderer = ({ canvas, cameraPosition, cameraTarget, axis = {}, grid = {} }) => {
  const { prepareRender, drawCommands, cameras, controls } = require('@jscad/regl-renderer')
  // ********************
  // Renderer configuration and initiation.
  // ********************

  perspectiveCamera = cameras.perspective
  orbitControls = controls.orbit

  state.canvas = canvas
  // prepare the camera
  state.camera = Object.assign({}, perspectiveCamera.defaults)
  if (cameraPosition) state.camera.position = cameraPosition
  if (cameraTarget) state.camera.target = cameraTarget

  resize({ width: canvas.width, height: canvas.height })

  // prepare the controls
  state.controls = orbitControls.defaults

  const { gl, type } = createContext(canvas)
  // prepare the renderer
  const setupOptions = {
    glOptions: { gl }
  }
  if (type == 'webgl') {
    setupOptions.glOptions.optionalExtensions = ['oes_element_index_uint']
  }
  renderer = prepareRender(setupOptions)

  gridOptions = {
    visuals: {
      drawCmd: 'drawGrid',
      show: grid.show || grid.show === undefined,
      color: grid.color || [0, 0, 0, 1],
      subColor: grid.subColor || [0, 0, 1, 0.5],
      fadeOut: false,
      transparent: true
    },
    size: grid.size || [200, 200],
    ticks: grid.ticks || [10, 1]
  }

  axisOptions = {
    visuals: {
      drawCmd: 'drawAxis',
      show: axis.show || axis.show === undefined
    },
    size: axis.size || 100
  }

  // assemble the options for rendering
  renderOptions = {
    camera: state.camera,
    drawCommands: {
      drawAxis: drawCommands.drawAxis,
      drawGrid: drawCommands.drawGrid,
      drawLines: drawCommands.drawLines,
      drawMesh: drawCommands.drawMesh
    },
    // define the visual content
    entities: [
      gridOptions,
      axisOptions,
      ...entities
    ]
  }
  // the heart of rendering, as themes, controls, etc change

  updateView()
}

let renderTimer
const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame
console.log('tmFunc', tmFunc, typeof requestAnimationFrame)

function updateView (delay = 8) {
  if (renderTimer || !renderer) return
  renderTimer = tmFunc(updateAndRender, delay)
}

const doRotatePanZoom = () => {
  if (rotateDelta[0] || rotateDelta[1]) {
    const updated = orbitControls.rotate({ controls: state.controls, camera: state.camera, speed: rotateSpeed }, rotateDelta)
    state.controls = { ...state.controls, ...updated.controls }
    rotateDelta = [0, 0]
  }

  if (panDelta[0] || panDelta[1]) {
    const updated = orbitControls.pan({ controls: state.controls, camera: state.camera, speed: panSpeed }, panDelta)
    state.controls = { ...state.controls, ...updated.controls }
    panDelta = [0, 0]
    state.camera.position = updated.camera.position
    state.camera.target = updated.camera.target
  }

  if (zoomDelta) {
    const updated = orbitControls.zoom({ controls: state.controls, camera: state.camera, speed: zoomSpeed }, zoomDelta)
    state.controls = { ...state.controls, ...updated.controls }
    zoomDelta = 0
  }
}

const updateAndRender = (timestamp) => {
  renderTimer = null
  doRotatePanZoom()

  const updates = orbitControls.update({ controls: state.controls, camera: state.camera })
  state.controls = { ...state.controls, ...updates.controls }
  if (state.controls.changed) updateView(16) // for elasticity in rotate / zoom

  state.camera.position = updates.camera.position
  perspectiveCamera.update(state.camera)
  renderOptions.entities = [
    gridOptions,
    axisOptions,
    ...entities
  ]
  const time = Date.now()
  renderer(renderOptions)
  if (updateRender) {
    console.log(updateRender, ' first render', Date.now() - time)
    updateRender = ''
  }
}
