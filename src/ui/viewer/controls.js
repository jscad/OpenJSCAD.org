function addEventListeners () {
  console.log('adding event listeners')

  var context = gl,
    oldX = 0,
    oldY = 0,
    buttons = {},
    hasOld = false
  var has = Object.prototype.hasOwnProperty

  function isDragging () {
    for (var b in buttons) {
      if (has.call(buttons, b) && buttons[b]) return true
    }
    return false
  }

  function augment (original) {
  // Make a copy of original, a native `MouseEvent`, so we can overwrite
  // WebKit's non-standard read-only `x` and `y` properties (which are just
  // duplicates of `pageX` and `pageY`). We can't just use
  // `Object.create(original)` because some `MouseEvent` functions must be
  // called in the context of the original event object.
    var e = {}
    for (var name in original) {
      if (typeof original[name] === 'function') {
        e[name] = (function (callback) {
          return function () {
            callback.apply(original, arguments)
          }
        })(original[name])
      } else {
        e[name] = original[name]
      }
    }
    e.original = original
    e.x = e.pageX
    e.y = e.pageY
    for (var obj = gl.canvas; obj; obj = obj.offsetParent) {
      e.x -= obj.offsetLeft
      e.y -= obj.offsetTop
    }
    if (hasOld) {
      e.deltaX = e.x - oldX
      e.deltaY = e.y - oldY
    } else {
      e.deltaX = 0
      e.deltaY = 0
      hasOld = true
    }
    oldX = e.x
    oldY = e.y
    e.dragging = isDragging()
    e.preventDefault = function () {
      e.original.preventDefault()
    }
    e.stopPropagation = function () {
      e.original.stopPropagation()
    }
    return e
  }

  function augmentTouchEvent (original) {
    var e = {}
    for (var name in original) {
      if (typeof original[name] === 'function') {
        e[name] = (function (callback) {
          return function () {
            callback.apply(original, arguments)
          }
        })(original[name])
      } else {
        e[name] = original[name]
      }
    }
    e.original = original

    if (e.targetTouches.length > 0) {
      var touch = e.targetTouches[0]
      e.x = touch.pageX
      e.y = touch.pageY

      for (var obj = gl.canvas; obj; obj = obj.offsetParent) {
        e.x -= obj.offsetLeft
        e.y -= obj.offsetTop
      }
      if (hasOld) {
        e.deltaX = e.x - oldX
        e.deltaY = e.y - oldY
      } else {
        e.deltaX = 0
        e.deltaY = 0
        hasOld = true
      }
      oldX = e.x
      oldY = e.y
      e.dragging = true
    }

    e.preventDefault = function () {
      e.original.preventDefault()
    }
    e.stopPropagation = function () {
      e.original.stopPropagation()
    }
    return e
  }

  function mousedown (e) {
    gl = context
    if (!isDragging()) {
    // Expand the event handlers to the document to handle dragging off canvas.
      on(document, 'mousemove', mousemove)
      on(document, 'mouseup', mouseup)
      off(gl.canvas, 'mousemove', mousemove)
      off(gl.canvas, 'mouseup', mouseup)
    }
    buttons[e.which] = true
    e = augment(e)
    if (gl.onmousedown) gl.onmousedown(e)
    e.preventDefault()
  }

  function mousemove (e) {
    console.log('mousemove', e)
    gl = context
    e = augment(e)
    if (gl.onmousemove) gl.onmousemove(e)
    e.preventDefault()
  }

  function mouseup (e) {
    gl = context
    buttons[e.which] = false
    if (!isDragging()) {
    // Shrink the event handlers back to the canvas when dragging ends.
      off(document, 'mousemove', mousemove)
      off(document, 'mouseup', mouseup)
      on(gl.canvas, 'mousemove', mousemove)
      on(gl.canvas, 'mouseup', mouseup)
    }
    e = augment(e)
    if (gl.onmouseup) gl.onmouseup(e)
    e.preventDefault()
  }

  function mousewheel (e) {
    gl = context
    e = augment(e)
    if (gl.onmousewheel) gl.onmousewheel(e)
    e.preventDefault()
  }

  function touchstart (e) {
    resetAll()
  // Expand the event handlers to the document to handle dragging off canvas.
    on(document, 'touchmove', touchmove)
    on(document, 'touchend', touchend)
    off(gl.canvas, 'touchmove', touchmove)
    off(gl.canvas, 'touchend', touchend)
    gl = context
    e = augmentTouchEvent(e)
    if (gl.ontouchstart) gl.ontouchstart(e)
    e.preventDefault()
  }

  function touchmove (e) {
    gl = context
    if (e.targetTouches.length === 0) {
      touchend(e)
    }
    e = augmentTouchEvent(e)
    if (gl.ontouchmove) gl.ontouchmove(e)
    e.preventDefault()
  }

  function touchend (e) {
  // Shrink the event handlers back to the canvas when dragging ends.
    off(document, 'touchmove', touchmove)
    off(document, 'touchend', touchend)
    on(gl.canvas, 'touchmove', touchmove)
    on(gl.canvas, 'touchend', touchend)
    gl = context
    e = augmentTouchEvent(e)
    if (gl.ontouchend) gl.ontouchend(e)
    e.preventDefault()
  }

  function reset () {
    hasOld = false
  }

  function resetAll () {
    buttons = {}
    hasOld = false
  }

// We can keep mouse and touch events enabled at the same time,
// because Google Chrome will apparently never fire both of them.
  on(gl.canvas, 'mousedown', mousedown)
  on(gl.canvas, 'mousemove', mousemove)
  on(gl.canvas, 'mouseup', mouseup)
  on(gl.canvas, 'mousewheel', mousewheel)
  on(gl.canvas, 'DOMMouseScroll', mousewheel)
  on(gl.canvas, 'mouseover', reset)
  on(gl.canvas, 'mouseout', reset)
  on(gl.canvas, 'touchstart', touchstart)
  on(gl.canvas, 'touchmove', touchmove)
  on(gl.canvas, 'touchend', touchend)
  on(document, 'contextmenu', resetAll)
}
