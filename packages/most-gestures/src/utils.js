const { empty, continueWith } = require('most')

// for most.js
const repeat = (n, stream) => n === 0 ? empty()
  : n === 1 ? stream
    : continueWith(() => repeat(n - 1, stream), stream)

// see https://github.com/cujojs/most/issues/20

// this is in another package/module normally
function preventDefault (event) {
  event.preventDefault()
  return event
}

/* determine if distance was 'enough' to consider it a ...movement */
function isMoving (moveDelta, deltaSqr) {
  return true
/* let distSqr = (moveDelta.x * moveDelta.x + moveDelta.y * moveDelta.y)
let isMoving = (distSqr > deltaSqr)
// console.log("moving",isMoving)
return isMoving */
}

function normalizeWheel (event) {
  let delta = {x: 0, y: 0}
  if (event.wheelDelta) { // WebKit / Opera / Explorer 9
    delta = event.wheelDelta
  } else if (event.detail) { // Firefox older
    delta = -event.detail
  } else if (event.deltaY) { // Firefox
    delta = -event.deltaY
  }
  delta = delta >= 0 ? 1 : -1
  return delta
}

function exists (data) {
  return data !== null && data !== undefined
}

function bufferUntil (obsToBuffer, obsEnd) {
  return obsToBuffer
    .map(data => ({type: 'data', data}))
    .merge(taps$.debounce(multiTapDelay).map(data => ({type: 'reset'})))
    .loop(function (seed, {type, data}) {
      let value
      if (type === 'data') {
        seed.push(data)
      } else {
        value = seed
        seed = []
      }
      return {seed, value}
    }, [])
    .filter(exists)

/* const baseBuffer$ =
  obsToBuffer.scan(function (acc, current) {
    acc.push(current)
    return acc
}, [])

return baseBuffer$
  .until(obsEnd) */
}

module.exports = {repeat, preventDefault, isMoving, normalizeWheel, exists}
