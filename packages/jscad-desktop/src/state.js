const {mergeArray} = require('most')
const packageMetadata = require('../package.json')
const {merge} = require('./utils/utils')

// very nice color for the cuts [0, 0.6, 1] to go with the orange
const themes = {
  light: require('../data/theme.light'),
  dark: require('../data/theme.dark')
}
const initialState = {
  appTitle: `jscad v ${packageMetadata.version}`,
  // for possible errors
  error: undefined,
  // design data
  design: require('./ui/design/reducers').initialize(),
  // export
  exportFormat: '',
  exportFilePath: '', // default export file path
  availableExportFormats: [],
  // status/toggles
  autoReload: true,
  instantUpdate: true,
  solidsTimeOut: 20000,
  busy: false,
  // visuals
  themeName: 'light',
  mainTextColor: '#FFF',
  viewer: require('./ui/viewer/reducers').initialize(),
  // UI
  shortcuts: require('../data/keybindings.json'),
  // storage: this is not changeable, only for display
  storage: {
    path: require('electron').remote.app.getPath('userData')
  }

}

function makeState (actions) {
  // const reducers = //Object.assign({}, dataParamsReducers, cameraControlsReducers)
  actions = mergeArray(actions)
  let reducers = {
    changeTheme: (state, themeName) => {
      const themeData = themes[themeName]
      // console.log('changeTheme', themeName, themeData)
      const viewer = merge({}, state.viewer, themeData.viewer)
      return Object.assign({}, state, {viewer, themeName, mainTextColor: themeData.mainTextColor})
    },
    clearErrors: (state, _) => {
      console.log('clear errors')
      return Object.assign({}, state, {error: undefined})
    }
  }

  const designReducers = require('./ui/design/reducers')
  const ioReducers = require('./ui/io/reducers')
  const viewerReducers = require('./ui/viewer/reducers')
  reducers = Object.assign({}, reducers, designReducers, ioReducers, viewerReducers)

  const state$ = actions
    .scan(function (state, action) {
      const reducer = reducers[action.type] ? reducers[action.type] : (state) => state
      try {
        const newState = reducer(state, action.data, initialState)
        return newState
      } catch (error) {
        console.error('caught error', error)
        return Object.assign({}, state, {error})
      }
      // const newState = merge({}, state, updatedData)
      // console.log('SCAAAN', action, newState)
    }, initialState)
    .filter(x => x !== undefined)// just in case ...
    .multicast()

  return state$
}

module.exports = {makeState, initialState}
