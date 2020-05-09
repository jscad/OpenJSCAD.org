const { mergeArray } = require('most')
const packageMetadata = require('../package.json')

const initialState = {
  appTitle: `jscad v ${packageMetadata.version}`,
  appUpdates: { available: false, version: undefined },
  locale: require('electron').remote.app.getLocale().split('-')[0],
  availableLanguages: [],
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
  showOptions: false,
  busy: false,
  // visuals
  themeName: 'light',
  themeSettings: { mainTextColor: '#FFF' },
  viewer: require('./ui/viewer/reducers').initialize(),
  // interactions
  shortcuts: require('../data/keybindings.json'),
  // storage: this is not changeable, only for display
  storage: {
    path: require('electron').remote.app.getPath('userData')
  }

}

console.log('initialState', initialState)

// status infos from web ui: sort out, reuse or not
/*
error: data,
ready: 'Ready',
aborted: 'Aborted.',
busy: `${data} <img id=busy src='imgs/busy.gif'>`,
loading: `Loading ${data} <img id=busy src='imgs/busy.gif'>`,
loaded: data,
saving: data,
saved: data,
converting: `Converting ${data} <img id=busy src='imgs/busy.gif'>`,
fetching: `Fetching ${data} <img id=busy src='imgs/busy.gif'>`,
rendering: `Rendering. Please wait <img id=busy src='imgs/busy.gif'>` */

function makeState (actions) {
  // const reducers = //Object.assign({}, dataParamsReducers, cameraControlsReducers)
  actions = mergeArray(actions)

  const rootReducers = require('./ui/reducers')
  const designReducers = require('./ui/design/reducers')
  const ioReducers = require('./ui/io/reducers')
  const viewerReducers = require('./ui/viewer/reducers')

  const reducers = Object.assign({}, rootReducers, designReducers, ioReducers, viewerReducers)

  const state$ = actions
    .scan(function (state, action) {
      const reducer = reducers[action.type] ? reducers[action.type] : (state) => state
      try {
        const newState = reducer(state, action.data, initialState)
        return newState
      } catch (error) {
        console.error('caught error', error)
        return Object.assign({}, state, { error })
      }
      // const newState = merge({}, state, updatedData)
      // console.log('SCAAAN', action, newState)
    }, initialState)
    .filter(x => x !== undefined)// just in case ...
    .multicast()

  return state$
}

module.exports = { makeState, initialState }
