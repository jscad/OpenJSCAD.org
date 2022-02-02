const most = require('most')

const callbackToObservable = require('../../most-utils/callbackToObservable')

const makeState = (params) => {
  // const defaults = {
  //   logging: true
  // }
  // const { logging, packageMetadata, keyBindings } = Object.assign({}, defaults, params)
  // const log = makeLogger({ enabled: logging })
  const { packageMetadata, keyBindings } = params
  const commandResponses = callbackToObservable()

  const initialState = {
    appTitle: `jscad v ${packageMetadata.version}`,
    // to determine what ui tool is active: options, code editor etc
    activeTool: undefined,
    // status
    status: {
      message: '',
      error: undefined, // for possible errors
      busy: false
    },
    // interactions
    shortcuts: keyBindings,
    // storage: this is not changeable, only for display
    storage: {
      path: '' // require('electron').remote.app.getPath('userData')
    },
    version: packageMetadata.version
  }

  const source = () => {
    const commandResponses$ = commandResponses.stream.multicast()
    // return commandResponses$
    return most.scan((state, input) => {
      const foo = Object.assign({}, state, input.state)
      return foo
    }, initialState, commandResponses$)
      .startWith(initialState)
      .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
      .multicast()
  }

  const sink = (out$) => {
    out$.forEach((command) => {
      commandResponses.callback(command)
    })
  }
  return { source, sink }
}

module.exports = makeState
