const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
const {head} = require('@jscad/core/utils/arrays')
const makeLogger = require('../../utils/logger')

const packageMetadata = require('../../../package.json')

const initialState = {
  appTitle: `jscad v ${packageMetadata.version}`,
  appUpdates: {available: false, version: undefined},
  locale: 'en',
  availableLanguages: [],
  availableExportFormats: [],
  // status/toggles
  autoReload: true,
  instantUpdate: true,
  // to determine what ui tool is active: options, code editor etc
  activeTool: undefined,
  // status
  status: {
    message: '',
    error: undefined, // for possible errors
    busy: false
  },
  // visuals
  themeName: 'light',
  themeSettings: {mainTextColor: '#FFF'},
  viewer: require('../../ui/viewer/reducers').initialize(),
  // interactions
  shortcuts: require('../../../data/keybindings.json'),
  // storage: this is not changeable, only for display
  storage: {
    path: '' // require('electron').remote.app.getPath('userData')
  }
}

const makeState = (params) => {
  const defaults = {
    logging: true
  }
  const {logging, packageMetadata} = Object.assign({}, defaults, params)
  const log = makeLogger({enabled: logging})

  const commandResponses = callBackToStream()

  const source = () => {
    const commandResponses$ = commandResponses.stream.multicast()
    // return commandResponses$
    // commandResponses$.forEach(x=>console.log('commandResponses', x))
    return most.scan((state, input) => {
      // console.log('updating state from', state, 'to', input)
      // state = input.state
      const foo = Object.assign({}, state, input.state)
      return foo
    }, initialState, commandResponses$)
    .startWith(initialState)
    .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
    .multicast()
  }

  const sink = (out$) => {
    out$.forEach(function (command) {
      let {state} = command
      /*try {
        const newState = state
      } catch (error) {
        console.error('caught error', error)
        const status = Object.assign({}, state.status, {error})
        state = Object.assign({}, state, {status})
      } */
      commandResponses.callback(command)
    })
  }
  return {source, sink}
}

module.exports = makeState
