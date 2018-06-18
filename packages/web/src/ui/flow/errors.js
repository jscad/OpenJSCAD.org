const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')

const reducers = {
  setErrors: (state, error) => {
    const status = Object.assign({}, state.status, {error, busy: false})
    return Object.assign({}, state, {status})
  },
  clearErrors: (state, _) => {
    const status = Object.assign({}, state.status, {error: undefined})
    return Object.assign({}, state, {status})
  }
}
const actions = ({sources}) => {
  const setErrors$ = most.mergeArray([
    sources.solidWorker.filter(event => 'error' in event),
    sources.http.filter(event => 'error' in event)
  ])
    .thru(withLatestFrom(reducers.setErrors, sources.state))
    .map(payload => Object.assign({}, {type: 'setErrors', sink: 'state'}, {state: payload}))

  const clearErrors$ = most.never()
    .thru(withLatestFrom(reducers.clearErrors, sources.state))
    .map(payload => Object.assign({}, {type: 'clearErrors', sink: 'state'}, {state: payload}))

  return {setErrors$, clearErrors$}
}

module.exports = actions
