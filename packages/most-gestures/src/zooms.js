const { merge } = require('most')

// this one is not reliable enough
function pinchZooms_old (gestureChange$, gestureStart$, gestureEnd$) {
  return gestureStart$
    .flatMap(function (gs) {
      return gestureChange$
        .map(x => x.scale)
        // .loop((prev, cur) => ({seed: cur, value: prev ? cur - prev : prev}), undefined)
        .loop(function (prev, cur) {
          console.log('prev', prev, 'cur', cur, 'value', prev ? cur - prev : prev)
          let value = prev ? cur - prev : prev

          if (value > 0) {
            value = Math.min(Math.max(value, 0), 2)
          } else {
            value = Math.min(Math.max(value, 2), 0)
          }

          return {seed: cur, value}
        }, undefined)
        .filter(x => x !== undefined)
        // .map(x => x / x)
        .takeUntil(gestureEnd$)
    }).tap(e => console.log('pinchZooms', e))
}

function pinchZooms ({touchStarts$, touchMoves$, touchEnds$}, settings) {
  const {pixelRatio, pinchThreshold} = settings
  // generic custom gesture handling
  // very very vaguely based on http://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch
  return touchStarts$
    .filter(t => t.touches.length === 2)
    .flatMap(function (ts) {
      let startX1 = ts.touches[0].pageX * pixelRatio
      let startY1 = ts.touches[0].pageY * pixelRatio

      let startX2 = ts.touches[1].pageX * pixelRatio
      let startY2 = ts.touches[1].pageY * pixelRatio

      const startDist = ((startX1 - startX2) * (startX1 - startX2)) + ((startY1 - startY2) * (startY1 - startY2))

      return touchMoves$
        .tap(e => e.preventDefault())
        .filter(t => t.touches.length === 2)
        .map(function (e) {
          let curX1 = e.touches[0].pageX * pixelRatio
          let curY1 = e.touches[0].pageY * pixelRatio

          let curX2 = e.touches[1].pageX * pixelRatio
          let curY2 = e.touches[1].pageY * pixelRatio

          const currentDist = ((curX1 - curX2) * (curX1 - curX2)) + ((curY1 - curY2) * (curY1 - curY2))
          return currentDist
        })
        .loop(function (prev, cur) {
          if (prev) {
            if (Math.abs(cur - prev) < pinchThreshold) {
              return {seed: cur, value: undefined}
            }
            return {seed: cur, value: cur - prev}
          }
          return {seed: cur, value: cur - startDist}
        }, undefined)
        .filter(x => x !== undefined)
        .map(x => x * 0.000003) // arbitrary, in order to harmonise desktop /mobile up to a point
        /* .map(function (e) {
          const scale = e > 0 ? Math.sqrt(e) : -Math.sqrt(Math.abs(e))
          return scale
        }) */
        .takeUntil(touchEnds$)
    })
}

function zooms ({touchStarts$, touchMoves$, touchEnds$, wheel$}, settings) {
  const zooms$ = merge(
    pinchZooms({touchStarts$, touchMoves$, touchEnds$}, settings), // for Android (no gestureXX events)
    wheel$
  )
    .map(x => x * settings.zoomMultiplier)
  return zooms$
}

module.exports = {pinchZooms, zooms}
