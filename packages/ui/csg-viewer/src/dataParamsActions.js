// const limitFlow = require('./observable-utils/limitFlow')

function actions (sources) {
  const { data$, params$ } = sources

  const setEntitiesFromSolids$ = data$
  // .thru(limitFlow(800))
    /* .take(4)
    .merge(
      data$.debounce(100)
    ) */
    .filter(data => data !== undefined && data.solids)
    .multicast()
    .map(data => ({ type: 'setEntitiesFromSolids', data: data.solids }))

  const updateParams$ = params$
    .multicast()
    .map(data => ({ type: 'updateParams', data: data }))

  return [
    setEntitiesFromSolids$,
    updateParams$
  ]
}

module.exports = actions
