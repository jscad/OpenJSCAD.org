const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')
const holdUntil = require('../../utils/observable-utils/holdUntil')

const capitalize = string => string.charAt(0).toUpperCase().concat(string.slice(1).toLowerCase())

// order of things
/*
 - initialize -> requestLoadSettings -> recievedSettings -> requestSaveSettings(repeated)

*/

const makeStorageIOStream = (name, sources, reducers) => {
  // setup default 'empty' state
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(payload => Object.assign({}, {type: `initialize${capitalize(name)}`, sink: 'state'}, {state: payload}))

  // we wait until the data here has been initialized before loading the serialized settings
  const requestLoadSettings$ = initialize$
    .map(_ => ({sink: 'store', key: name, type: 'read'}))

  // this 'fires' if we recieved back our settings from storage
  const recievedSettings$ = sources.store.filter(reply => reply.key === name && reply.type === 'read')

  // starts emmiting to storage only AFTER initial settings have been loaded
  // see holdUntil : which will wait for a reply to have come from the localstorage containing
  // data for THIS store
  const requestSaveSettings$ = sources.state
    .filter(state => state.name)
    .map(state => state.name)
    .thru(recievedSettings$)
    .map(reducers.requestSaveSettings)
    .map(data => Object.assign({}, {data}, {sink: 'store', key: name, type: 'write'}))
    .multicast()

  return {requestSaveSettings$, requestLoadSettings$}
}
