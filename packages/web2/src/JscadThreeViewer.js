// cd c:\hrg\3dp_dev\three.js; esbuild Three.jscad.js --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/Three.jscad.js --bundle --watch --sourcemap=external --minify --format=esm
// cd c:\hrg\3dp_dev\Babylon.js; esbuild src/index.ts --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/babylon.js --bundle --watch --sourcemap=external --minify --format=esm

import * as THREE from './Three.jscad.js'
import { CSG2Object3D } from './util/CSG2Object3D.js'

const { OrbitControls } = THREE

let scene
let camera
let controls
let mesh
let grid2
let grid1
let ground
let renderer
const SHADOW = false
const AXIS2 = true
const CAM_DISTANCE = 100
const shouldRender = Date.now()
const lastRender = true
let renderTimer
// animate()

const entities = []
let canvas

CSG2Object3D(THREE)

const startRenderer = ({
  canvas,
  cameraPosition = [180, -180, 220],
  cameraTarget = [0, 0, 0],
  axis = {},
  grid = {}
}) => {
  camera = new THREE.PerspectiveCamera(45, 1, 1, 50000)
  camera.up.set(0, 0, 1)
  camera.position.set(...cameraPosition)
  camera.lookAt(...cameraTarget)

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
  hemiLight.position.set(0, 0, 2000)
  scene.add(hemiLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff)
  directionalLight.position.set(0, 200, 100)
  directionalLight.castShadow = SHADOW
  if (SHADOW) {
    directionalLight.shadow.camera.top = 180
    directionalLight.shadow.camera.bottom = -100
    directionalLight.shadow.camera.left = -120
    directionalLight.shadow.camera.right = 120
  }
  scene.add(directionalLight)

  // ground

  ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(200, 200), new THREE.MeshPhongMaterial({ color: 0xffffff, depthWrite: false }))
  // ground.rotation.x =  - Math.PI / 2;
  // ground.rotation.y =  - Math.PI / 2;
  ground.receiveShadow = SHADOW
  scene.add(ground)

  grid1 = new THREE.GridHelper(200, 20, 0x000000, 0x000000)
  grid1.rotation.x = -Math.PI / 2
  // grid.rotation.y = - Math.PI / 2;
  grid1.material.opacity = 0.2
  grid1.material.transparent = true
  scene.add(grid1)

  grid2 = new THREE.GridHelper(200, 200, 0x000000, 0x000000)
  grid2.rotation.x = -Math.PI / 2
  // grid.rotation.y = - Math.PI / 2;
  grid2.material.opacity = 0.1
  grid2.material.transparent = true
  scene.add(grid2)

  const axes = new THREE.AxesHelper(10)
  scene.add(axes)

  renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, canvas })
  renderer.setPixelRatio(window.devicePixelRatio)
  console.log('canvasssssa', renderer.domElement)
  controls = new THREE.OrbitControls(camera, canvas)
  controls.target.set(0, 0, 0)
  controls.update()
  controls.addEventListener('change', function () {
    updateView()
  })
}

const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame

function updateView (delay = 8) {
  if (renderTimer || !renderer) return
  renderTimer = tmFunc(updateAndRender, delay)
}

function updateAndRender () {
  renderTimer = null
  console.log('updateAndRender')
  controls.update()
  renderer.render(scene, camera)
}

function resize ({ width, height }) {
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
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

function setCamera ({ position, target }) {
  if (position) camera.position.set(...position)
  // if (target) state.camera.target = target
  // updateView()
}

function getCamera () {
  const target = new THREE.Vector3(0, 0, -1)
  target.applyQuaternion(camera.quaternion)
  return {
    position: camera.position.toArray(),
    target: target.toArray()
  }
}

export default function JscadThreeViewer (el, { showAxes = true, showGrid = true, camera: _camera = {} } = {}) {
  console.log('init Three.js viewer')
  canvas = document.createElement('CANVAS')
  el.appendChild(canvas)

  const destroy = () => {
    el.removeChild(canvas)
  }

  try {
    startRenderer({ canvas, axis: { show: showAxes }, grid: { show: showGrid }, cameraPosition: _camera.position, cameraTarget: _camera.target })

    const resizeObserver = new ResizeObserver(entries => {
      const rect = entries[0].contentRect
      resize(rect)
    })
    resizeObserver.observe(el)
  } catch (error) {
    destroy()
    throw error
  }


  return { sendCmd, destroy, getCamera, setCamera, camera }
}
