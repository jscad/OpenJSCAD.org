// const {pointerGestures} = require('most-gestures')
const most = require('most')
const { proxy } = require('most-proxy')
const { holdSubject } = require('../../../core/observable-utils/most-subject/index')
// require('most-subject')github:briancavalier/most-subject : issues with webpack hence the above
const makeCameraControlsActions = require('./cameraControlsActions')
const makeDataParamsActions = require('./dataParamsActions')
const makeState = require('./state')
const { merge } = require('./utils')
const prepareRender = require('./rendering/render')

const cameraDefaults = require('./cameraAndControls/perspectiveCamera').defaults
const controlsDefaults = require('./cameraAndControls/orbitControls').defaults

// FIXME : element needs to be either canvas, other htmlelement or gl context
const makeCsgViewer = function (element, options = {}, inputs$ = most.never()) {
  const defaults = {
    glOptions: { // all lower level regl options passed directly through, webgl ones are under attributes
      attributes: {
        alpha: false
      }
    },
    // after this , initial params of camera, controls & render,
    // the object.assign is essential ! state is semi mutable !
    camera: Object.assign({}, cameraDefaults),
    controls: Object.assign({}, controlsDefaults),
    //
    grid: {
      show: false,
      size: [200, 200],
      ticks: [10, 1],
      color: [1, 1, 1, 1],
      fadeOut: true // when set to true, the grid fades out progressively in the distance
    },
    axes: {
      show: true
    },
    rendering: {
      background: [1, 1, 1, 1],
      meshColor: [1, 0.5, 0.5, 1], // use as default face color for csgs, color for cags
      lightColor: [1, 1, 1, 1],
      lightDirection: [0.2, 0.2, 1],
      lightPosition: [100, 200, 100],
      ambientLightAmount: 0.3,
      diffuseLightAmount: 0.89,
      specularLightAmount: 0.16,
      materialShininess: 8.0
    },
    //
    behaviours: {
      resetViewOn: [], // ['new-entities'],
      zoomToFitOn: [] // ['new-entities'],
    },
    // next few are for solids / csg/ cags specifically
    overrideOriginalColors: false, // for csg/cag conversion: do not use the original (csg) color, use meshColor instead
    smoothNormals: true,
    //
    entities: [], // inner representation of the CSG's geometry + meta (bounds etc)
    csgCheck: false, // not used currently
    // draw commands
    drawCommands: {},

    useGestures: true // toggle if you want to use external inputs to control camera etc
  }
  const state = merge({}, defaults, options)

  // we use an observable of parameters, date etc to play nicely with the other observables
  // note: subjects are anti patterns, but they simplify things here so ok for now
  const params$ = holdSubject()
  const data$ = holdSubject()
  const errors$ = holdSubject()
  const { attach, stream } = proxy()
  const state$ = stream

  // initialize regl options
  const reglOptions = Object.assign(
    {}, {
      canvas: (element.nodeName.toLowerCase() === 'canvas') ? element : undefined,
      container: (element.nodeName.toLowerCase() !== 'canvas') ? element : undefined
    },
    state.glOptions,
    {
      onDone: function (err, callback) {
        if (err) {
          errors$.next(err)
        }
      }
    }
  )
  const regl = require('regl')(reglOptions)

  // note we keep the render function around, until we need to swap it out in case of new data
  state.render = prepareRender(regl, state)
  state.regl = regl
  state.drawCommands.drawGrid = () => {}
  state.drawCommands.drawCSGs = []

  const sources = {
    // data streams
    params$: params$.filter(x => x !== undefined).multicast(), // we filter out pointless data from the get go
    data$: data$.filter(x => x !== undefined), // we filter out pointless data from the get go
    state$, // thanks to proxying, we also have access to the state observable/stream inside our actions
    // inputs$: inputs$.filter(x => x !== undefined), // custom user inputs
    // live ui elements only
    gestures: state.useGestures ? require('most-gestures').pointerGestures(element) : { drags: most.never(), zooms: most.never(), taps: most.never() },
    resizes$: state.useGestures ? require('../../../utils/regl-renderer/src/controls/elementSizing')(element) : most.never(),
    heartBeat$: require('../../../core/observable-utils/rafStream').rafStream() // state.useGestures ? require('./observable-utils/rafStream').rafStream() : most.never() // heartbeat provided by requestAnimationFrame
  }

  // create our action streams
  const cameraControlsActions = makeCameraControlsActions(sources)
  const dataParamsActions = makeDataParamsActions(sources)
  const actions = most.mergeArray(dataParamsActions.concat(cameraControlsActions))
  // combine proxy state & real state
  attach(makeState(actions, state, regl))

  // .startWith(state)
  // skipRepeatsWith
  // re-render whenever state changes, since visuals are a function of the state
  state$
    /* .skipRepeatsWith(function (state, previousState) {
      const sameViewerParams = JSON.stringify(state) === JSON.stringify(previousState)
      return sameViewerParams
    }) */
    .forEach(state => {
      state.render(state)
    })
  // dispatch initial params/state
  params$.next(state)

  /** main viewer function : call this one with different parameters and/or data to update the viewer
   * @param  {Object} options={}
   * @param  {Object} data
   */
  const csgViewer = function (params = {}, data) {
    // dispatch data & params
    data$.next(data)
    params$.next(params)
  }
  return { csgViewer, viewerDefaults: defaults, viewerState$: state$ }
}

module.exports = makeCsgViewer
