const { empty, continueWith } = require('most')

// for most.js
const repeat = (n, stream) => n === 0
  ? empty()
  : n === 1
    ? stream
    : continueWith(() => repeat(n - 1, stream), stream)

// see https://github.com/cujojs/most/issues/20

// this is in another package/module normally
const preventDefault = (event) => {
  event.preventDefault()
  return event
}

/* determine if distance was 'enough' to consider it a ...movement */
const isMoving = (moveDelta, deltaSqr) => true
// {
//   let distSqr = (moveDelta.x * moveDelta.x + moveDelta.y * moveDelta.y)
//   let isMoving = (distSqr > deltaSqr)
//   return isMoving
// }

const normalizeWheel = (event) => {
  let delta = { x: 0, y: 0 }
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

const exists = (data) => data !== null && data !== undefined

module.exports = { repeat, preventDefault, isMoving, normalizeWheel, exists }
