const most = require('most')

const actions = ({sources}) => {
  const setErrors$ = most.mergeArray([
    sources.solidWorker.filter(event => 'error' in event),
    sources.http.filter(event => 'error' in event)
  ])
    .map(data => ({type: 'setErrors', data}))

  const clearErrors$ = most.never()
  return {setErrors$, clearErrors$}
}

module.exports = actions
