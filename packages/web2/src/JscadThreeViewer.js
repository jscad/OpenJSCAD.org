// cd c:\hrg\3dp_dev\three.js; esbuild Three.jscad.js --outfile=C:/hrg/3dp_dev/OpenJSCAD.org/packages/web2/src/Three.jscad.js --bundle --watch --sourcemap=external --minify --format=esm
import * as THREE from './Three.jscad.js'
import { CSG2Object3D } from './util/CSG2Object3D.js'

const entities = []
let canvas

CSG2Object3D(THREE)

const startRenderer = ({ canvas, cameraPosition, cameraTarget, axis = {}, grid = {} }) => {
}

let renderTimer
const tmFunc = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame

function updateView (delay = 8) {
  // if (renderTimer || !renderer) return
  // renderTimer = tmFunc(updateAndRender, delay)
}

function resize ({ width, height }) {
  // state.canvas.width = width
  // state.canvas.height = height
  // perspectiveCamera.setProjection(state.camera, state.camera, { width, height })
  // perspectiveCamera.update(state.camera, state.camera)
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

export default function JscadThreeViewer (el, { showAxes = true, showGrid = true } = {}) {
  console.log('init Three.js viewer')
  canvas = document.createElement('CANVAS')
  el.appendChild(canvas)

  const destroy = () => {
    el.removeChild(canvas)
  }

  try {
    startRenderer({ canvas, axis: { show: showAxes }, grid: { show: showGrid } })

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
