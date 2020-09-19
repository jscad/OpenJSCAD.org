const test = require('ava')
const { baseInteractionsFromEvents, pointerGestures } = require('./index')
const browserEnv = require('browser-env')
browserEnv()

const { fromEvent, merge } = require('most')


// NOTE : use   // --inspect --debug-brk to debug node commands in chrome
test.afterEach.always(t => {
})

test.beforeEach(t => {
  const div = document.createElement('div')
  const baseStreams = baseInteractionsFromEvents(div)
  t.context = {baseStreams, div}
})

test.cb('presses', t => {
  const press = pointerGestures(t.context.baseStreams).press
  const div = t.context.div
  const mousedown = new window.Event('mousedown')
  const mouseup = new window.Event('mouseup')

  setTimeout(() => {
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 100)

  press
    .forEach(() => {
      //TODO: 'the test is not implemented correctly yet !')// pass()
      t.end()
    })
})

test.cb('presses (direct element)', t => {
  const div = t.context.div

  const press = pointerGestures(div).press
  const mousedown = new window.Event('mousedown')
  const mouseup = new window.Event('mouseup')

  setTimeout(() => {
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 100)

  press
    .forEach(() => {
      //TODO: 'the test is not implemented correctly yet !')// pass()
      t.end()
    })
})

test.cb('taps (2 taps)', t => {
  const taps = pointerGestures(t.context.baseStreams).taps

  const div = t.context.div
  let mousedown = new window.Event('mousedown')
  let mouseup = new window.Event('mouseup')

  setTimeout(() => {
    mousedown.pageX = 3
    mousedown.pageY = -10
    mouseup.pageX = 10
    mouseup.pageY = -3
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 10)

  setTimeout(() => {
    mousedown.pageX = 13
    mousedown.pageY = -4
    mouseup.pageX = 14
    mouseup.pageY = -2
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 100)

  taps
    .forEach(function (e) {
      t.deepEqual(e.nb, 2)
      t.deepEqual(e.list.length, 2)
      t.end()
    })
})

test.cb('taps (2 taps) direct element', t => {
  const div = t.context.div
  const taps = pointerGestures(div).taps

  let mousedown = new window.Event('mousedown')
  let mouseup = new window.Event('mouseup')

  setTimeout(() => {
    mousedown.pageX = 3
    mousedown.pageY = -10
    mouseup.pageX = 10
    mouseup.pageY = -3
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 10)

  setTimeout(() => {
    mousedown.pageX = 13
    mousedown.pageY = -4
    mouseup.pageX = 14
    mouseup.pageY = -2
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 100)

  taps
    .forEach(function (e) {
      t.deepEqual(e.nb, 2)
      t.deepEqual(e.list.length, 2)
      t.end()
    })
})


test.cb('taps (3 taps)', t => {
  const taps = pointerGestures(t.context.baseStreams).taps

  const div = t.context.div
  let mousedown = new window.Event('mousedown')
  let mouseup = new window.Event('mouseup')

  setTimeout(() => {
    mousedown.pageX = 3
    mousedown.pageY = -10
    mouseup.pageX = 10
    mouseup.pageY = -3
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 100)

  setTimeout(() => {
    mousedown.pageX = 13
    mousedown.pageY = -4
    mouseup.pageX = 14
    mouseup.pageY = -2
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 200)

  setTimeout(() => {
    mousedown.offsetX = 11
    mousedown.offsetY = -2
    mousedown.clientX = 11
    mousedown.clientY = -2
    mouseup.offsetX = 14
    mouseup.offsetY = -2
    mouseup.clientX = 14
    mouseup.clientY = -2
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 300)

  taps
    .forEach(function (e) {
      t.deepEqual(e.nb, 3)
      t.deepEqual(e.list.length, 3)
      t.end()
    })
})

test.cb('taps (3 taps) direct element', t => {
  const div = t.context.div
  const taps = pointerGestures(div).taps

  let mousedown = new window.Event('mousedown')
  let mouseup = new window.Event('mouseup')

  setTimeout(() => {
    mousedown.pageX = 3
    mousedown.pageY = -10
    mouseup.pageX = 10
    mouseup.pageY = -3
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 100)

  setTimeout(() => {
    mousedown.pageX = 13
    mousedown.pageY = -4
    mouseup.pageX = 14
    mouseup.pageY = -2
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 200)

  setTimeout(() => {
    mousedown.offsetX = 11
    mousedown.offsetY = -2
    mousedown.clientX = 11
    mousedown.clientY = -2
    mouseup.offsetX = 14
    mouseup.offsetY = -2
    mouseup.clientX = 14
    mouseup.clientY = -2
    div.dispatchEvent(mousedown)
    div.dispatchEvent(mouseup)
  }, 300)

  taps
    .forEach(function (e) {
      t.deepEqual(e.nb, 3)
      t.deepEqual(e.list.length, 3)
      t.end()
    })
})

test.cb('zooms (from wheel event)', t => {
  const zooms = pointerGestures(t.context.baseStreams).zooms

  const div = t.context.div
  const wheel = new window.Event('wheel')
  setTimeout(() => {
    div.dispatchEvent(wheel)
  }, 100)

  zooms
    .forEach(function (e) {
      t.deepEqual(e, -200)
      t.end()
    })
})

test.cb('zooms (from mousewheel event), direct element', t => {
  const div = t.context.div
  const zooms = pointerGestures(div).zooms

  const wheel = new window.Event('mousewheel')
  setTimeout(() => {
    div.dispatchEvent(wheel)
  }, 100)

  zooms
    .forEach(function (e) {
      t.deepEqual(e, -200)
      t.end()
    })
})


test.cb('zooms (from mousewheel event)', t => {
  const zooms = pointerGestures(t.context.baseStreams).zooms

  const div = t.context.div
  const wheel = new window.Event('mousewheel')
  setTimeout(() => {
    div.dispatchEvent(wheel)
  }, 100)

  zooms
    .forEach(function (e) {
      t.deepEqual(e, -200)
      t.end()
    })
})

test.cb('zooms (from mousewheel event) direct element', t => {
  const div = t.context.div
  const zooms = pointerGestures(div).zooms

  const wheel = new window.Event('mousewheel')
  setTimeout(() => {
    div.dispatchEvent(wheel)
  }, 100)

  zooms
    .forEach(function (e) {
      t.deepEqual(e, -200)
      t.end()
    })
})

test.cb('zooms (from pinch)', t => {
  const zooms = pointerGestures(t.context.baseStreams).zooms

  const div = t.context.div
  const touchstart = new window.Event('touchstart')
  const touchmove = new window.Event('touchmove')
  const touchend = new window.Event('touchend')

  setTimeout(() => {
    touchstart.touches = [{pageX: 3, pageY: -10}, {pageX: 43, pageY: 0}]
    touchmove.touches = [{pageX: 44, pageY: -2}, {pageX: 244, pageY: 122}]
    touchend.touches = [{pageX: 144, pageY: -22}, {pageX: 644, pageY: 757}]
    div.dispatchEvent(touchstart)
    div.dispatchEvent(touchmove)
    div.dispatchEvent(touchend)
  }, 100)

  zooms
    .forEach(function (e) {
      t.deepEqual(e, 32.205600000000004)
      t.end()
    })
})

test.cb('zooms (from pinch) direct element', t => {
  const div = t.context.div
  const zooms = pointerGestures(div).zooms

  const touchstart = new window.Event('touchstart')
  const touchmove = new window.Event('touchmove')
  const touchend = new window.Event('touchend')

  setTimeout(() => {
    touchstart.touches = [{pageX: 3, pageY: -10}, {pageX: 43, pageY: 0}]
    touchmove.touches = [{pageX: 44, pageY: -2}, {pageX: 244, pageY: 122}]
    touchend.touches = [{pageX: 144, pageY: -22}, {pageX: 644, pageY: 757}]
    div.dispatchEvent(touchstart)
    div.dispatchEvent(touchmove)
    div.dispatchEvent(touchend)
  }, 100)

  zooms
    .forEach(function (e) {
      t.deepEqual(e, 32.205600000000004)
      t.end()
    })
})

test.cb('drags (mouse)', t => {
  const drags = pointerGestures(t.context.baseStreams).drags

  const div = t.context.div
  const mousedown = new window.Event('mousedown')
  const mouseup = new window.Event('mouseup')
  const mousemove = new window.Event('mousemove')

  setTimeout(() => {
    mousedown.offsetX = 3
    mousedown.offsetY = -10
    mousedown.clientX = 3
    mousedown.clientY = -10
    mousedown.pageX = 3
    mousedown.pageY = -10

    mousemove.offsetX = 44
    mousemove.offsetY = -2
    mousemove.clientX = 44
    mousemove.clientY = -2
    mousemove.pageX = 44
    mousemove.pageY = -2

    mouseup.offsetX = 144
    mouseup.offsetY = -22
    mouseup.clientX = 144
    mouseup.clientY = -22
    mouseup.pageX = 144
    mouseup.pageY = -22

    div.dispatchEvent(mousedown)
    div.dispatchEvent(mousemove)
    div.dispatchEvent(mouseup)
  }, 100)

  drags
    .forEach(function (e) {
      const expEvent = {
        originalEvents: [{isTrusted: false}],
        delta: { left: 41, top: 8, x: -41, y: 8 },
        normalized: { x: 44, y: -2 },
        type: 'mouse'
      }
      t.deepEqual(e.delta, expEvent.delta)
      t.deepEqual(e.normalized, expEvent.normalized)
      t.deepEqual(e.type, expEvent.type)
      t.end()
    })
})

test.cb('drags (mouse) direct element', t => {
  const div = t.context.div
  const drags = pointerGestures(div).drags

  const mousedown = new window.Event('mousedown')
  const mouseup = new window.Event('mouseup')
  const mousemove = new window.Event('mousemove')

  setTimeout(() => {
    mousedown.offsetX = 3
    mousedown.offsetY = -10
    mousedown.clientX = 3
    mousedown.clientY = -10
    mousedown.pageX = 3
    mousedown.pageY = -10

    mousemove.offsetX = 44
    mousemove.offsetY = -2
    mousemove.clientX = 44
    mousemove.clientY = -2
    mousemove.pageX = 44
    mousemove.pageY = -2

    mouseup.offsetX = 144
    mouseup.offsetY = -22
    mouseup.clientX = 144
    mouseup.clientY = -22
    mouseup.pageX = 144
    mouseup.pageY = -22

    div.dispatchEvent(mousedown)
    div.dispatchEvent(mousemove)
    div.dispatchEvent(mouseup)
  }, 100)

  drags
    .forEach(function (e) {
      const expEvent = {
        originalEvents: [{isTrusted: false}],
        delta: { left: 41, top: 8, x: -41, y: 8 },
        normalized: { x: 44, y: -2 },
        type: 'mouse'
      }
      t.deepEqual(e.delta, expEvent.delta)
      t.deepEqual(e.normalized, expEvent.normalized)
      t.deepEqual(e.type, expEvent.type)
      t.end()
    })
})

test.cb('drags (touch)', t => {
  const drags = pointerGestures(t.context.baseStreams).drags

  const div = t.context.div
  const touchstart = new window.Event('touchstart')
  const touchmove = new window.Event('touchmove')
  const touchend = new window.Event('touchend')

  setTimeout(() => {
    touchstart.touches = [{pageX: 3, pageY: -10}]
    touchmove.touches = [{pageX: 44, pageY: -2}]
    touchend.touches = [{pageX: 144, pageY: -22}]
    div.dispatchEvent(touchstart)
    div.dispatchEvent(touchmove)
    div.dispatchEvent(touchend)
  }, 100)

  drags
    .forEach(function (e) {
      const expEvent = {
        originalEvents: [{isTrusted: false}],
        delta: { left: 41, top: 8, x: -41, y: 8 },
        normalized: { x: 44, y: -2 },
        type: 'touch'
      }
      t.deepEqual(e.delta, expEvent.delta)
      t.deepEqual(e.normalized, expEvent.normalized)
      t.deepEqual(e.type, expEvent.type)
      t.end()
    })
})

test.cb('drags (touch) direct element', t => {
  const div = t.context.div
  const drags = pointerGestures(div).drags

  const touchstart = new window.Event('touchstart')
  const touchmove = new window.Event('touchmove')
  const touchend = new window.Event('touchend')

  setTimeout(() => {
    touchstart.touches = [{pageX: 3, pageY: -10}]
    touchmove.touches = [{pageX: 44, pageY: -2}]
    touchend.touches = [{pageX: 144, pageY: -22}]
    div.dispatchEvent(touchstart)
    div.dispatchEvent(touchmove)
    div.dispatchEvent(touchend)
  }, 100)

  drags
    .forEach(function (e) {
      const expEvent = {
        originalEvents: [{isTrusted: false}],
        delta: { left: 41, top: 8, x: -41, y: 8 },
        normalized: { x: 44, y: -2 },
        type: 'touch'
      }
      t.deepEqual(e.delta, expEvent.delta)
      t.deepEqual(e.normalized, expEvent.normalized)
      t.deepEqual(e.type, expEvent.type)
      t.end()
    })
})
