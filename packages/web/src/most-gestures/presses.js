const { just, merge } = require('most')
const { exists } = require('./utils')

/* alternative "clicks" (ie mouseDown -> mouseUp ) implementation, with more fine grained control */
const basePresses = ({ mouseDowns$, mouseUps$, mouseMoves$, touchStarts$, touchEnds$, touchMoves$ }, settings) => {
  touchMoves$ = touchMoves$.filter((t) => t.touches.length === 1)

  const starts$ = merge(mouseDowns$, touchStarts$) // mouse & touch interactions starts
  const ends$ = merge(mouseUps$, touchEnds$) // mouse & touch interactions ends
  // only doing any "clicks if the time between mDOWN and mUP is below longpressDelay"
  // any small mouseMove is ignored (shaky hands)

  return starts$.timestamp()
    .flatMap((downEvent) => merge(just(downEvent), ends$.take(1).timestamp()))
    .loop((acc, current) => {
      let result
      if (acc.length === 1) {
        const timeDelta = current.time - acc[0].time

        const curX = 'touches' in current.value ? current.value.changedTouches[0].pageX : current.value.pageX//* pixelRatio
        const curY = 'touches' in current.value ? current.value.changedTouches[0].pageY : current.value.pageY//* pixelRatio

        const prevX = 'touches' in acc[0].value ? acc[0].value.touches[0].pageX : acc[0].value.pageX
        const prevY = 'touches' in acc[0].value ? acc[0].value.touches[0].pageY : acc[0].value.pageY

        let delta = [curX - prevX, curY - prevY] // FIXME: duplicate of mouseDrags !
        delta = delta[0] * delta[0] + delta[1] * delta[1] // squared distance
        const moveDelta = {
          x: prevX - curX,
          y: curY - prevY,
          sqrd: delta
        }

        result = { value: current.value, originalEvent: current.value, timeDelta, moveDelta, x: curX, y: curY }
        acc = []
      } else {
        acc.push(current)
      }
      return { seed: acc, value: result }
    }, [])
    .filter(exists)
    .filter((x) => x.value !== undefined)
    .multicast()
}

const presses = (baseInteractions, settings) => {
  const presses$ = basePresses(baseInteractions, settings)

  /*
  // exploring of more composition based system : much clearer, but needs work

  // Imagine map and filter are curried
  const mapc = curry2(map)
  const filterc = curry2(filter)

  const deltaBelowMax = x => x.moveDelta < maxStaticDeltaSqr
  const intervalBelowLongPress = x => x.interval <= longPressDelay
  const validButton = event => 'button' in event && event.button === 0
  const exists = x => x !== undefined

  const pluckValue = x => x.value
  const pluckList = x => x.list
  const first = x => x[0]

  const shortTaps = compose(
    filterc(deltaBelowMax),
    filterc(intervalBelowLongPress),
    mapc(pluckValue),
    filterc(validButton)
  )

  const firstInList = compose(
    mapc(pluckList),
    mapc(first)
  )

  //const tapsByNumber = tapCount => compose(filterc(x => x.nb === tapCount), firstInList()) */

  return presses$
}

module.exports = { presses }
