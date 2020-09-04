const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')

const reducers = {
  initialize: (state) => {
    const viewer = { // ridiculous shadowing of viewer state ?? or actually logical
      rendering: {
        background: [1, 1, 1, 1],
        meshColor: [0, 0.6, 1, 1]
        // background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
        // meshColor: [0.4, 0.6, 0.5, 1] // nice orange : [1, 0.4, 0, 1]
      },
      grid: {
        show: false,
        color: [1, 1, 1, 0.1]
      },
      axes: {
        show: true
      },
      smoothNormals: true,
      // UGH
      behaviours: {
        resetViewOn: []
      },
      autorotate: false
    }
    return { viewer }
  },
  toggleAutorotate: (state, autoRotate) => {
    const controls = Object.assign({}, state.viewer.controls, { autoRotate: { enabled: autoRotate } })
    const viewer = Object.assign({}, state.viewer, { controls })
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
  toPresetView: (state, viewName) => {
    const viewer = Object.assign({}, state.viewer, { camera: { position: viewName } })
    return { viewer }
  },
  setProjectionType: (state, projectionType) => {
    const viewer = Object.assign({}, state.viewer, { camera: { projectionType } })
    return { viewer }
  }

}

const actions = ({ sources }) => {
  // console.log('sources', sources.actions)
  const initializeViewer$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map((payload) => Object.assign({}, { type: 'initializeViewer', sink: 'state' }, { state: payload }))

  const toggleGrid$ = most.mergeArray([
    sources.dom.select('#grid').events('click')
      .map((e) => e.target.checked),
    sources.store
      .filter((reply) => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.viewer && reply.data.viewer.grid && reply.data.viewer.grid.show !== undefined)
      .map((reply) => reply.data.viewer.grid.show)
  ])
    .thru(withLatestFrom(reducers.toggleGrid, sources.state))
    .map((data) => ({ type: 'toggleGrid', state: data, sink: 'state' }))

  const toggleAxes$ = most.mergeArray([
    sources.dom.select('#toggleAxes').events('click')
      .map((e) => e.target.checked)
    // sources.store.map(data => data.viewer.grid.show)
  ])
    .thru(withLatestFrom(reducers.toggleAxes, sources.state))
    .map((data) => ({ type: 'toggleAxes', state: data, sink: 'state' }))

  const toggleAutorotate$ = most.mergeArray([
    sources.dom.select('#autoRotate').events('click')
      .map((e) => e.target.checked)
    // sources.store.map(data => data.viewer.grid.show)
    // sources.actions.filter(action => action.type === 'setProjectionType')
  ])
    .thru(withLatestFrom(reducers.toggleAutorotate, sources.state))
    .map((data) => ({ type: 'toggleAutorotate', state: data, sink: 'state' }))

  // all other viewer actions, triggered from elsewhere, for example via shortcuts ?
  const otherViewerActions$ = sources.actions
    .filter((action) => Object.keys(reducers).includes(action.type))
    /* .thru(withLatestFrom(function (state, action) {
      return reducers[action.type](state, action.data)
    }, sources.state)) */
    // .map(data => ({state: data, sink: 'state'}))
    .map((payload) => Object.assign({}, { sink: 'viewer' }, payload))

  return {
    // 3d viewer
    initializeViewer$,
    toggleGrid$,
    toggleAxes$,
    toggleAutorotate$,
    otherViewerActions$
  }
}

module.exports = actions
