const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')

const reducers = {
  setErrors: (state, errorPayload) => {
    const { error } = errorPayload
    const status = Object.assign({}, state.status, { error, busy: false })
    return { status }
  },
  clearErrors: (state, _) => {
    const status = Object.assign({}, state.status, { error: undefined, busy: false })
    return { status }
  }
}
const actions = ({ sources }) => {
  const setErrors$ = most.mergeArray(
    Object.values(sources).filter((x) => x !== undefined && 'source' in x)
  )
    .filter((x) => {
      try {
        return 'error' in x
      } catch (e) {
        return false
      }
    })
    .thru(withLatestFrom(reducers.setErrors, sources.state))
    .map((payload) => Object.assign({}, { type: 'setErrors', sink: 'state' }, { state: payload }))

  const clearErrors$ = most.never()
    .thru(withLatestFrom(reducers.clearErrors, sources.state))
    .map((payload) => Object.assign({}, { type: 'clearErrors', sink: 'state' }, { state: payload }))

  return { setErrors$, clearErrors$ }
}

module.exports = actions
