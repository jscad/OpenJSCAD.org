const most = require('most')

const { withLatestFrom } = require('../../most-utils')

const reducers = {
  initialize: (state) => {
    const viewer = {
      rendering: {
        background: [1, 1, 1, 1],
        meshColor: [0, 0.6, 1, 1],
        autoRotate: false,
        autoZoom: true
      },
      grid: {
        show: true,
        color: [1, 1, 1, 0.1]
      },
      axes: {
        show: true
      },
      camera: {
        position: ''
      }
    }
    return { viewer }
  },

  toggleAutoRotate: (state, autoRotate) => {
    const rendering = Object.assign({}, state.viewer.rendering, { autoRotate })
    const viewer = Object.assign({}, state.viewer, { rendering })
    return { viewer }
  },

  toggleAutoZoom: (state, autoZoom) => {
    const rendering = Object.assign({}, state.viewer.rendering, { autoZoom })
    const viewer = Object.assign({}, state.viewer, { rendering })
    return { viewer }
  },

  toggleGrid: (state, show) => {
    const grid = Object.assign({}, state.viewer.grid, { show })
    const viewer = Object.assign({}, state.viewer, { grid })
    return { viewer }
  },

  toggleAxes: (state, show) => {
    const axes = Object.assign({}, state.viewer.axes, { show })
    const viewer = Object.assign({}, state.viewer, { axes })
    return { viewer }
  },

  toPresetView: (state, position) => {
    const camera = Object.assign({}, state.viewer.camera, { position })
    const viewer = Object.assign({}, state.viewer, { camera })
    return { viewer }
  },

  setProjectionType: (state, projectionType) => {
    const viewer = Object.assign({}, state.viewer, { camera: { projectionType } })
    return { viewer }
  }

}

const actions = ({ sources }) => {
  const initializeViewer$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map((payload) => Object.assign({}, { type: 'initializeViewer', sink: 'state' }, { state: payload }))

  const toggleGrid$ = most.mergeArray([
    sources.dom.select('#toggleGrid').events('click')
      .map((e) => e.target.checked)
    // sources.store
    // .filter((reply) => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.viewer && reply.data.viewer.grid && reply.data.viewer.grid.show !== undefined)
    // .map((reply) => reply.data.viewer.grid.show)
  ])
    .thru(withLatestFrom(reducers.toggleGrid, sources.state))
    .map((data) => ({ type: 'toggleGrid', state: data, sink: 'state' }))

  const toggleAxes$ = most.mergeArray([
    sources.dom.select('#toggleAxes').events('click')
      .map((e) => e.target.checked)
    // sources.store
    // .filter((reply) => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.viewer && reply.data.viewer.axes && reply.data.viewer.axes.show !== undefined)
    // .map((reply) => reply.data.viewer.axes.show)
  ])
    .thru(withLatestFrom(reducers.toggleAxes, sources.state))
    .map((data) => ({ type: 'toggleAxes', state: data, sink: 'state' }))

  const toggleAutoRotate$ = most.mergeArray([
    sources.dom.select('#toggleAutoRotate').events('click')
      .map((e) => e.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleAutoRotate, sources.state))
    .map((data) => ({ type: 'toggleAutoRotate', state: data, sink: 'state' }))

  const toggleAutoZoom$ = most.mergeArray([
    sources.dom.select('#toggleAutoZoom').events('click')
      .map((e) => e.target.checked)
  ])
    .thru(withLatestFrom(reducers.toggleAutoZoom, sources.state))
    .map((data) => ({ type: 'toggleAutoZoom', state: data, sink: 'state' }))

  // all other viewer actions, triggered from elsewhere
  const otherActions = ['toPresetView']
  const otherViewerActions$ = sources.actions
    .filter((action) => otherActions.includes(action.type))
    .thru(withLatestFrom((state, action) => reducers[action.type](state, action.data), sources.state))
    .map((data) => ({ type: 'otherActions', state: data, sink: 'state' }))

  return {
    // 3d viewer
    initializeViewer$,
    toggleGrid$,
    toggleAxes$,
    toggleAutoRotate$,
    toggleAutoZoom$,
    otherViewerActions$
  }
}

module.exports = actions
