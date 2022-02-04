// cd c:\hrg\3dp_dev\three.js; esbuild Three.jscad.js --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/Three.jscad.js --bundle --watch --sourcemap=external --minify --format=esm
const { Engine, Scene, HemisphericLight, ArcRotateCamera, Vector3, AxesViewer, MeshBuilder, Mesh, Plane } = require('@babylonjs/core')
const { GridMaterial } = require('@babylonjs/materials')

const entities = []
let canvas
let engine
let scene
let camera

const startRenderer = ({ canvas, cameraPosition, cameraTarget, axis = {}, grid = {} }) => {
  engine = new Engine(canvas, true)
  scene = new Scene(engine)

  camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0))
  camera.upVector = new Vector3(0, 0, 1)

  camera.attachControl(canvas, true)
  const light = new HemisphericLight('light', new Vector3(1, 1, 0))
  scene.addLight(light)

  const ground = MeshBuilder.CreatePlane('ground', { width: 100, height: 100, sideOrientation: Mesh.DOUBLESIDE, sourcePlane: new Plane(0, 0, 1, 0) })
  const gridMat = ground.material = new GridMaterial('groundMaterial', scene)
  gridMat.opacity = 0.8
  scene.addGeometry(ground)
  new AxesViewer(scene, 10)

  engine.runRenderLoop(function () {
    scene.render()
  })
}

let renderTimer
const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame

function updateView (delay = 8) {
  // if (renderTimer || !renderer) return
  // renderTimer = tmFunc(updateAndRender, delay)
}

function updateAndRender () {
//  scene.render()
}

function resize ({ width, height }) {
  canvas.width = width
  canvas.height = height
  engine.resize()
  updateView()
}

const handlers = {
  showAxes: ({ show }) => {
    // axisOptions.visuals.show = show
    updateView()
  },
  entities: ({ entities }) => {
    entities.push()
  },
  showGrid: ({ show }) => {
    // gridOptions.visuals.show = show
    updateView()
  }
}

function receiveCmd (cmd) {
  const fn = handlers[cmd.action]
  if (!fn) {
    throw new Error('no handler for type: ' + cmd.action)
  }
  fn(cmd)
}

function sendCmd (cmd) {
  receiveCmd(cmd)
}

export default function JscadBabylonViewer (el, { showAxes = true, showGrid = true } = {}) {
  console.log('init Babylon.js viewer')
  canvas = document.createElement('CANVAS')
  canvas.setAttribute('touch-action', 'none')
  el.appendChild(canvas)

  const destroy = () => {
    el.removeChild(canvas)
  }

  try {
    startRenderer({ canvas, axis: { show: showAxes }, grid: { show: showGrid } })
    canvas.addEventListener('wheel', e => {
      e.preventDefault()
    })
    const resizeObserver = new ResizeObserver(entries => {
      const rect = entries[0].contentRect
      resize(rect)
    })
    resizeObserver.observe(el)
  } catch (error) {
    destroy()
    throw error
  }

  return { sendCmd, destroy }
}
