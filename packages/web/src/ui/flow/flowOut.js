const most = require('most')

function makeReactions (inputs) {
  const { sinks, sources, outputs$, extras } = inputs
  const { store, fs, http, i18n, dom, solidWorker, state, dat } = sinks

  /* outputs$
    .filter(x => 'sink' in x && x.sink === 'dom')
    .forEach(x => console.log(' out to dom', x))
  outputs$
    .filter(x => 'sink' in x && x.sink === 'state')
    .forEach(x => console.log(' out to state', x))

  outputs$
    .filter(x => 'sink' in x && x.sink === 'i18n')
    .forEach(x => console.log(' out to i18n', x))

  outputs$
    .filter(x => 'sink' in x && x.sink === 'store')
    .forEach(x => console.log(' out to store', x))
  outputs$
    .filter(x => 'sink' in x && x.sink === 'fs')
    .forEach(x => console.log(' out to fs', x)) */

  // output to dom
  dom(require('./dom')(inputs))
  // output to i18n
  i18n(outputs$.filter(x => 'sink' in x && x.sink === 'i18n'))
  // output to storage
  store(outputs$.filter(x => 'sink' in x && x.sink === 'store'))
  // output to http
  http(outputs$.filter(x => 'sink' in x && x.sink === 'http'))
  // data out to file system sink
  // drag & drops of files/folders have DUAL meaning:
  // * ADD this file/folder to the available ones
  // * OPEN this file/folder
  fs(outputs$.filter(x => 'sink' in x && x.sink === 'fs'))
  // web worker sink
  solidWorker(outputs$.filter(x => 'sink' in x && x.sink === 'geometryWorker'))
  // state sink
  state(outputs$.filter(x => 'sink' in x && x.sink === 'state'))

  dat(outputs$.filter(x => 'sink' in x && x.sink === 'dat'))

  // viewer data
  // FIXME: does not belong here at all !
  const makeCsgViewer = require('@jscad/csg-viewer')

  const { prepareRender, drawCommands, cameras, entitiesFromSolids } = require('@jscad/regl-renderer') // replace this with the correct import
  const width = window.innerWidth
  const height = window.innerHeight
  // prepare the camera
  const perspectiveCamera = cameras.perspective
  const camera = Object.assign({}, perspectiveCamera.defaults)
  perspectiveCamera.setProjection(camera, camera, { width, height })
  perspectiveCamera.update(camera, camera)
  let solids = []

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
    entities: [
      { // grid data
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
      },
      {
        visuals: {
          drawCmd: 'drawAxis',
          show: true
        }
      },
      ...solids
    ]
  }

  let csgViewer
  let render
  const jscadEl = extras.jscadEl
  sources.state
    .filter(state => state.design && state.design.mainPath !== '')
    .skipRepeatsWith(function (state, previousState) {
      const sameSolids = state.design.solids.length === previousState.design.solids.length &&
      JSON.stringify(state.design.solids) === JSON.stringify(previousState.design.solids)
      return sameSolids
    })
    .forEach(state => {
      if (csgViewer !== undefined) {
        viewerOptions.entities = entitiesFromSolids({}, state.design.solids)
        console.log('rendering', viewerOptions.solids)
        render(viewerOptions)
        
        // csgViewer(undefined, { solids: state.design.solids })
      }
    })

  outputs$.filter(x => 'sink' in x && x.sink === 'viewer')
    .forEach(x => {
      console.log('viewer', x)
      if (csgViewer) {
        // csgViewer({ camera: { projectionType: x.data } })
      }
    })

  sources.state
    .map(state => state.viewer)
  // FIXME: not working correctly with themeing
  /* .skipRepeatsWith(function (state, previousState) {
    const sameViewerParams = JSON.stringify(state) === JSON.stringify(previousState)
    return sameViewerParams
  }) */
    .forEach(params => {
      const viewerElement = jscadEl.querySelector('#renderTarget')

      // initialize viewer if it has not been done already
      if (viewerElement && !csgViewer) {
        console.log('preparing renderer')

        // const csgViewerItems = makeCsgViewer(viewerElement, params)
        // csgViewer = csgViewerItems.csgViewer
        viewerOptions.glOptions.container = viewerElement
        csgViewer = render = prepareRender(viewerOptions)
        render(viewerOptions)
        // const bar = require('most-gestures').pointerGestures(jscadEl.querySelector('#renderTarget'))

        // some live animation example
        let tick = 0
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
        window.requestAnimationFrame(updateAndRender)
      }
      if (csgViewer) {
        console.log('params', params)
        render(viewerOptions)
        // csgViewer(params)
      }
    })

  // titlebar & store side effects
  // FIXME/ not compatible with multiple instances !!
  /* titleBar.sink(
    state.map(state => state.appTitle).skipRepeats()
  ) */
}

module.exports = makeReactions
