const { merge } = require('most')

// based on http://jsfiddle.net/mattpodwysocki/pfCqq/
function mouseDrags (mouseDowns$, mouseUps, mouseMoves, settings) {
  const {pixelRatio} = settings
  return mouseDowns$.flatMap(function (md) {
    // calculate offsets when mouse down
    let startX = md.pageX * pixelRatio
    let startY = md.pageY * pixelRatio
    // Calculate delta with mousemove until mouseup
    let prevX = startX
    let prevY = startY

    return mouseMoves
      .map(function (e) {
        let curX = e.pageX * pixelRatio
        let curY = e.pageY * pixelRatio

        let delta = {
          left: curX - startX,
          top: curY - startY,
          x: prevX - curX,
          y: curY - prevY
        }

        prevX = curX
        prevY = curY

        const normalized = {x: curX, y: curY}
        return {originalEvents: [e], delta, normalized, type: 'mouse'}
      })
      .takeUntil(mouseUps)
  })
}

function touchDrags (touchStarts$, touchEnds$, touchMoves$, settings) {
  const {pixelRatio} = settings
  return touchStarts$
    .filter(t => (t.touches.length === 1 || t.touches.length === 3)) // length 2 is pinch (zoom)
    .flatMap(function (e) {
      let startX = e.touches[0].pageX * pixelRatio
      let startY = e.touches[0].pageY * pixelRatio

      let prevX = startX
      let prevY = startY

      return touchMoves$
        .map(function (e) {
          let curX = e.touches[0].pageX * pixelRatio
          let curY = e.touches[0].pageY * pixelRatio

          let delta = {
            left: curX - startX,
            top: curY - startY,
            x: prevX - curX,
            y: curY - prevY
          }

          prevX = curX
          prevY = curY

          const normalized = {x: curX, y: curY}
          return {originalEvents: [e], delta, normalized, type: 'touch'}
        })
        .takeUntil(touchEnds$)
    })
}

/* drag move interactions press & move(continuously firing)
*/
function drags ({mouseDowns$, mouseUps$, mouseMoves$, touchStarts$, touchEnds$, longTaps$, touchMoves$}, settings) {
  const drags$ = merge(
    mouseDrags(mouseDowns$, mouseUps$, mouseMoves$, settings),
    touchDrags(touchStarts$, touchEnds$, touchMoves$, settings)
  )
  // .merge(merge(touchEnds$, mouseUps$).map(undefined))
  // .tap(e=>console.log('dragMoves',e))

  // .takeUntil(longTaps$) // .repeat() // no drag moves if there is a context action already taking place

  return drags$
}

module.exports = {mouseDrags, touchDrags, drags}
