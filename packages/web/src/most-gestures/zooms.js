const { merge } = require('most')

const pinchZooms = ({ touchStarts$, touchMoves$, touchEnds$ }, settings) => {
  const { pixelRatio, pinchThreshold } = settings
  // generic custom gesture handling
  // very very vaguely based on http://stackoverflow.com/questions/11183174/simplest-way-to-detect-a-pinch
  return touchStarts$
    .filter((t) => t.touches.length === 2)
    .flatMap((ts) => {
      const startX1 = ts.touches[0].pageX * pixelRatio
      const startY1 = ts.touches[0].pageY * pixelRatio

      const startX2 = ts.touches[1].pageX * pixelRatio
      const startY2 = ts.touches[1].pageY * pixelRatio

      const startDist = ((startX1 - startX2) * (startX1 - startX2)) + ((startY1 - startY2) * (startY1 - startY2))

      return touchMoves$
        .tap((e) => e.preventDefault())
        .filter((t) => t.touches.length === 2)
        .tap((e) => {
          // console.log("pinch started");
          if (typeof CustomEvent !== 'undefined') {
            const pinchStarted = new CustomEvent('pinchStarted', {
              detail: true
            })

            window.dispatchEvent(pinchStarted)
          }
        })
        .map((e) => {
          const curX1 = e.touches[0].pageX * pixelRatio
          const curY1 = e.touches[0].pageY * pixelRatio

          const curX2 = e.touches[1].pageX * pixelRatio
          const curY2 = e.touches[1].pageY * pixelRatio

          const currentDist = ((curX1 - curX2) * (curX1 - curX2)) + ((curY1 - curY2) * (curY1 - curY2))
          return currentDist
        })
        .loop((prev, cur) => {
          if (prev) {
            if (Math.abs(cur - prev) < pinchThreshold) {
              return { seed: cur, value: undefined }
            }
            return { seed: cur, value: cur - prev }
          }
          return { seed: cur, value: cur - startDist }
        }, undefined)
        .filter((x) => x !== undefined)
        .map((x) => x * 0.000003) // arbitrary, in order to harmonise desktop /mobile up to a point
        /* .map(function (e) {
          const scale = e > 0 ? Math.sqrt(e) : -Math.sqrt(Math.abs(e))
          return scale
        }) */
        .takeUntil(touchEnds$.tap((e) => {
          // console.log("pinch ended");
          if (typeof CustomEvent !== 'undefined') {
            const pinchEnded = new CustomEvent('pinchEnded', {
              detail: true
            })

            window.dispatchEvent(pinchEnded)
          }
        }))
    })
}

const zooms = ({ touchStarts$, touchMoves$, touchEnds$, wheel$ }, settings) => {
  const zooms$ = merge(
    pinchZooms({ touchStarts$, touchMoves$, touchEnds$ }, settings), // for Android (no gestureXX events)
    wheel$
  )
    .map((x) => x * settings.zoomMultiplier)
  return zooms$
}

module.exports = { pinchZooms, zooms }
