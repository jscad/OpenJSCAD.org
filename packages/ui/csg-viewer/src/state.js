const { merge } = require('./utils')
const makeCameraAndControlsReducers = require('./cameraControlsReducers')
const makeDataAndParamsReducers = require('./dataParamsReducers')

function makeState (actions, initialState, regl) {
  const cameraControlsReducers = makeCameraAndControlsReducers(initialState, regl)
  const dataParamsReducers = makeDataAndParamsReducers(initialState, regl)
  const reducers = Object.assign({}, dataParamsReducers, cameraControlsReducers)
  // console.log('actions', actions)
  // console.log('reducers', reducers)

  const state$ = actions
    .scan(function (state, action) {
      const reducer = reducers[action.type] ? reducers[action.type] : (state) => state
      try {
        const updatedData = reducer(state, action.data, initialState, regl)
        const newState = merge({}, state, updatedData)
        // console.log('SCAAAN', action, newState)
        return newState
      } catch (error) {
        console.error('error', error)
        return merge({}, state, { error })
      }
    }, initialState)
    .filter(x => x !== undefined)// just in case ...
    .multicast()

  return state$
}

module.exports = makeState
