const initialize = () => {
  return { // ridiculous shadowing of viewer state ?? or actually logical
    rendering: {
      background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
      meshColor: [0.4, 0.6, 0.5, 1] // nice orange : [1, 0.4, 0, 1]
    },
    grid: {
      show: true,
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
}
const toggleAutorotate = (state, autoRotate) => {
  const controls = Object.assign({}, state.viewer.controls, { autoRotate: { enabled: autoRotate } })
  const viewer = Object.assign({}, state.viewer, { controls })
  return Object.assign({}, state, { viewer })
}
const toggleGrid = (state, show) => {
  const grid = Object.assign({}, state.viewer.grid, { show })
  const viewer = Object.assign({}, state.viewer, { grid })
  return Object.assign({}, state, { viewer })
}
const toggleAxes = (state, show) => {
  const axes = Object.assign({}, state.viewer.axes, { show })
  const viewer = Object.assign({}, state.viewer, { axes })
  return Object.assign({}, state, { viewer })
}
const toPresetView = (state, viewName) => {
  const viewer = Object.assign({}, state.viewer, { camera: { position: viewName } })
  return Object.assign({}, state, { viewer })
}
const setProjectionType = (state, projectionType) => {
  const viewer = Object.assign({}, state.viewer, { camera: { projectionType } })
  return Object.assign({}, state, { viewer })
}

module.exports = {
  initialize,
  toggleAutorotate,
  toggleGrid,
  toggleAxes,
  toPresetView,
  setProjectionType
}
