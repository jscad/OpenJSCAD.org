const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')
// const makeLogger = require('../../utils/logger')

const makeState = (params) => {
  // const defaults = {
  //   logging: true
  // }
  // const { logging, packageMetadata, keyBindings } = Object.assign({}, defaults, params)
  // const log = makeLogger({ enabled: logging })
  const { packageMetadata, keyBindings } = params
  const commandResponses = callBackToStream()

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
    }
  }

  const source = () => {
    const commandResponses$ = commandResponses.stream.multicast()
    // return commandResponses$
    // commandResponses$.forEach(x=>console.log('commandResponses', x))
    return most.scan((state, input) => {
      // console.log('updating state', state.design, input.type, input.state.design)
      const foo = Object.assign({}, state, input.state)
      // console.log('output state', foo.design)
      return foo
    }, initialState, commandResponses$)
      .startWith(initialState)
      .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
      .multicast()
  }

  const sink = (out$) => {
    out$.forEach((command) => {
      // const { state } = command
      /* try {
        const newState = state
      } catch (error) {
        console.error('caught error', error)
        const status = Object.assign({}, state.status, {error})
        state = Object.assign({}, state, {status})
      } */
      commandResponses.callback(command)
    })
  }
  return { source, sink }
}

module.exports = makeState
