const { merge } = require('most')

let isPinching = false

if (typeof window !== 'undefined') {
  window.addEventListener('pinchStarted', (e) => {
    // console.log("received pinch started");
    isPinching = true
  })

  window.addEventListener('pinchEnded', (e) => {
    // console.log("received pinch ended");
    isPinching = false
  })
}

// based on http://jsfiddle.net/mattpodwysocki/pfCqq/
const mouseDrags = (mouseDowns$, mouseUps, mouseMoves, settings) => {
  const { pixelRatio } = settings
  return mouseDowns$.flatMap((md) => {
    // calculate offsets when mouse down
    const startX = md.pageX * pixelRatio
    const startY = md.pageY * pixelRatio
    // Calculate delta with mousemove until mouseup
    let prevX = startX
    let prevY = startY

    return mouseMoves
      .map((e) => {
        const curX = e.pageX * pixelRatio
        const curY = e.pageY * pixelRatio

        const delta = {
          left: curX - startX,
          top: curY - startY,
          x: prevX - curX,
          y: curY - prevY
        }

        prevX = curX
        prevY = curY

        const normalized = { x: curX, y: curY }
        return { originalEvents: [e], delta, normalized, type: 'mouse' }
      })
      .takeUntil(mouseUps)
  })
}

const touchDrags = (touchStarts$, touchEnds$, touchMoves$, settings) => {
  const { pixelRatio } = settings
  return touchStarts$
    // 2020-09 FIX
    .filter((t) => (t.touches.length === 1 || t.touches.length === 3)) // length 2 is pinch (zoom)
    // 2020-09 FIX
    .flatMap((e) => {
      const startX = e.touches[0].pageX * pixelRatio
      const startY = e.touches[0].pageY * pixelRatio

      let prevX = startX
      let prevY = startY

      return touchMoves$
        .takeWhile((e) => isPinching === false)
        .map((e) => {
          const curX = e.touches[0].pageX * pixelRatio
          const curY = e.touches[0].pageY * pixelRatio

          const delta = {
            left: curX - startX,
            top: curY - startY,
            x: prevX - curX,
            y: curY - prevY
          }

          prevX = curX
          prevY = curY

          const normalized = { x: curX, y: curY }
          return { originalEvents: [e], delta, normalized, type: 'touch' }
        })
        .takeUntil(touchEnds$)
    })
}

/* drag move interactions press & move(continuously firing)
*/
const drags = ({ mouseDowns$, mouseUps$, mouseMoves$, touchStarts$, touchEnds$, longTaps$, touchMoves$ }, settings) => {
  // 2020-09 FIX
  // touchMoves$ = touchMoves$.filter(t => t.touches.length === 1)
  // 2020-09 FIX
  const drags$ = merge(
    mouseDrags(mouseDowns$, mouseUps$, mouseMoves$, settings),
    touchDrags(touchStarts$, touchEnds$, touchMoves$, settings)
  )
  // .merge(merge(touchEnds$, mouseUps$).map(undefined))
  // .tap(e=>console.log('dragMoves',e))

  // .takeUntil(longTaps$) // .repeat() // no drag moves if there is a context action already taking place

  return drags$
}

module.exports = { mouseDrags, touchDrags, drags }
