const { exists } = require('./utils')

/**
 * tap on screen , either via gestures or clicks,
 * IF the movement was short (settable)
 * AND there was little movement only (settable)
 * @param  {Number} longPressDelay any tap shorter than this time is a short one
 * @param  {Number} maxStaticDeltaSqr  when the square distance is bigger than this, it is a movement, not a tap
 * @param  {Number} multiTapDelay  delay between taps for multi tap detection
 */
function taps (presses$, settings) {
  const {longPressDelay, maxStaticDeltaSqr, multiTapDelay} = settings
  const taps$ = presses$
    .filter(e => e.timeDelta <= longPressDelay) // any tap shorter than this time is a short one
    .filter(e => e.moveDelta.sqrd < maxStaticDeltaSqr) // when the square distance is bigger than this, it is a movement, not a tap
    .map(data => ({type: 'data', data}))
    .merge(presses$.debounce(multiTapDelay).map(data => ({type: 'reset'})))
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
    // .buffer(function () { return taps$.debounce(multiTapDelay) })// buffer all inputs, and emit at then end of multiTapDelay
    .map(list => ({list: list, nb: list.length}))
    .multicast()

  return taps$
}

module.exports = {taps}
