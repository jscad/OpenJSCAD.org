const most = require('most')
const limitFlow = require('../../../core/observable-utils/limitFlow')

function actions (sources) {
  const { gestures, heartBeat$, params$, data$, state$ } = sources

  const resizes$ = sources.resizes$
    // .startWith({width: 600, height:400, aspect:1, brect:{}})
    .map(data => ({ type: 'resize', data }))
    .multicast()
    // .tap(x=>console.log('resizes',x))

  const rotations$ = gestures.drags
    .filter(x => x !== undefined) // TODO: add this at gestures.drags level
    .map(function (data) {
      // console.log('rotation',data.originalEvents[0].target)
      const delta = [data.delta.x, data.delta.y]
      const { shiftKey } = data.originalEvents[0]
      if (!shiftKey) {
        return delta
      }
      return undefined
    })
    .filter(x => x !== undefined)
    .map(delta => delta.map(d => d * -Math.PI))
    .map(data => ({ type: 'rotate', data }))
    .multicast()

  const pan$ = gestures.drags
    .filter(x => x !== undefined) // TODO: add this at gestures.drags level
    .map(function (data) {
      const delta = [data.delta.x, data.delta.y]
      const { shiftKey } = data.originalEvents[0]
      if (shiftKey) {
        return delta
      }
      return undefined
    })
    .filter(x => x !== undefined)
    .map(data => ({ type: 'pan', data }))
    .multicast()

  const zoom$ = gestures.zooms
    .startWith(0) // TODO: add this at gestures.zooms level
    .map(x => -x) // we invert zoom direction
    .filter(x => !isNaN(x)) // TODO: add this at gestures.zooms level
    .skip(1)
    .map(data => ({ type: 'zoom', data }))
    .multicast()

  const setProjectionType$ = params$
    .filter(params => {
      return params.camera && params.camera.projectionType
    })
    .map(data => ({ type: 'setProjectionType', data: data.camera.projectionType }))

  // Reset view with a double tap/ when data changed
  const reset$ = most.mergeArray([
    gestures.taps
      .filter(taps => taps.nb === 2)
      .multicast(),
    state$
      .filter(state => state.behaviours.resetViewOn.includes('new-entities'))
      .map(state => state.entities).skipRepeatsWith(areEntitiesIdentical)
      .map(_ => ({ origin: 'new-entities' })),
    params$
      .filter(params => {
        return params.camera && params.camera === 'reset'
        // params === {camera: 'reset'})
      })
      .map(x => ({ origin: 'request' }))
  ])
    .map(data => ({ type: 'reset', data }))
    .multicast()

  function areEntitiesIdentical (previous, current) {
    // console.log('areEntitiesIdentical', previous, current)
    if (current.length !== previous.length) {
      return false
    }
    for (let i = 0; i < current.length; i++) {
      if (current[i].geometry.positions.length !== previous[i].geometry.positions.length) {
        return false
      }
    }

    return true
  }
  // zoomToFit main mesh bounds
  const zoomToFit$ = most.mergeArray([
    gestures.taps.filter(taps => taps.nb === 3)
      .map(_ => ({ type: 'zoomToFit', data: { origin: 'demand' } })),
    state$
      .filter(state => state.behaviours.zoomToFitOn.includes('new-entities'))
      .map(state => state.entities).skipRepeatsWith(areEntitiesIdentical)
      .map(_ => ({ type: 'zoomToFit', data: { origin: 'new-entities' } }))
      // .multicast().tap(x => console.log('zoomToFit on new entities'))
  ])
    .multicast()

  /* const update$ = heartBeat$.thru(limitFlow(33))
    .map(_ => ({type: 'update', data: undefined})) */
  const update$ = most.mergeArray([
    rotations$,
    zoom$,
    reset$,
    zoomToFit$,
    resizes$
  ]).map(_ => ({ type: 'update', data: undefined }))

  return [
    rotations$,
    pan$,
    zoom$,
    reset$,
    zoomToFit$,
    resizes$,
    update$

    // toPresetView$,
    // setProjectionType$
  ]
}

module.exports = actions
