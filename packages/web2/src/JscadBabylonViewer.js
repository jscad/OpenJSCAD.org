// cd c:\hrg\3dp_dev\three.js; esbuild Three.jscad.js --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/Three.jscad.js --bundle --watch --sourcemap=external --minify --format=esm
const { Engine, Scene, HemisphericLight, ArcRotateCamera, Vector3, AxesViewer, MeshBuilder, Mesh, Plane, Color3 } = require('@babylonjs/core')
const { GridMaterial } = require('@babylonjs/materials')

const entities = []
let canvas
let engine
let scene
let camera

const startRenderer = ({
  canvas,
  cameraPosition = [180, -180, 220],
  cameraTarget = [0, 0, 0],
  axis = {},
  grid = {}
}) => {
  engine = new Engine(canvas, true)
  scene = new Scene(engine)
  scene.clearColor = new Color3(1, 1, 1)
  // COMPAT another thing to be compatible with threejs and regl
  scene.useRightHandedSystem = true // https://forum.babylonjs.com/t/unexpected-behavior-for-z-up-right-handed-coordinate-system/1090/7

  camera = new ArcRotateCamera('camera', 0, 0, 50, new Vector3(...cameraTarget))
  camera.upVector = new Vector3(0, 0, 1)
  camera.setPosition(new Vector3(...cameraPosition))
  // COMPAT this almost matches what seems as default in threejs and regl
  camera.fov = Math.PI / 4

  camera.attachControl(canvas, true)
  const light = new HemisphericLight('light', new Vector3(1, 1, 0))
  scene.addLight(light)

  const ground = MeshBuilder.CreatePlane('ground', { width: 200, height: 200, sideOrientation: Mesh.DOUBLESIDE, sourcePlane: new Plane(0, 0, 1, 0) })
  const gridMat = ground.material = new GridMaterial('groundMaterial', scene)
  gridMat.opacity = 0.8
  gridMat.gridRatio = 1
  gridMat.lineColor = new Color3(0.9, 0.9, 0.9)
  gridMat.minorUnitVisibility = 0.2
  gridMat.majorUnitFrequency = 10

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

export default function JscadBabylonViewer (el, { showAxes = true, showGrid = true, camera: _camera = {} } = {}) {
  console.log('init Babylon.js viewer')
  canvas = document.createElement('CANVAS')
  canvas.setAttribute('touch-action', 'none')
  el.appendChild(canvas)

  const destroy = () => {
    el.removeChild(canvas)
  }

  try {
    startRenderer({ canvas, axis: { show: showAxes }, grid: { show: showGrid }, cameraPosition: _camera.position, cameraTarget: _camera.target })
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
  function setCamera ({ position, target }) {
    if (position) camera.setPosition(new Vector3(...position))
    if (target) camera.setTtarget(new Vector3(...target))
  }

  function getCamera () {
    return { position: camera.position.asArray(), target: camera.getTarget().asArray() }
  }

  return { sendCmd, destroy, getCamera, setCamera, camera }
}
