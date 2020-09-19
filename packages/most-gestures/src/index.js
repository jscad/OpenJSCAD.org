const { fromEvent, merge } = require('most')
const { normalizeWheel, preventDefault } = require('./utils')
const { presses } = require('./presses')
const { taps } = require('./taps')
const { drags } = require('./drags')
const { zooms } = require('./zooms')

/**
 * returns an object of base interactions from dom events, on the target element.
 * @param {DomElement} targetEl - The dom element to attach events handlers to
 * @param {Object} options
 * @param {Boolean} options.passiveEventsHandlers=true  Whenever possible make event listeners passive 
 * (see here https://developers.google.com/web/updates/2016/06/passive-event-listeners for more details)
 * @param {Boolean} options.preventScroll=true Prevent all forms of scrolling on the target element
 * @param {Boolean} options.preventMenu=true Prevent default right click menu on the target element
 * @returns {Object}
 */
function baseInteractionsFromEvents (targetEl, options) {
  const defaults = {
    passiveEventsHandlers: true,
    preventScroll: true,
    preventMenu: true
  }
  options = Object.assign({}, defaults, options)
  const {passiveEventsHandlers, preventScroll, preventMenu} = options

  const mouseDowns$ = fromEvent('mousedown', targetEl, {passive: passiveEventsHandlers, capture: false})
  const mouseUps$ = fromEvent('mouseup', targetEl, {passive: passiveEventsHandlers, capture: false})
  // const mouseLeaves$ = fromEvent('mouseleave', targetEl, {passive:true,capture:false}).merge(fromEvent('mouseout', targetEl, {passive:true,capture:false}))
  const mouseMoves$ = fromEvent('mousemove', targetEl, {passive: passiveEventsHandlers, capture: false}) // .takeUntil(mouseLeaves$) // altMouseMoves(fromEvent(targetEl, 'mousemove')).takeUntil(mouseLeaves$)
  const rightClicks$ = fromEvent('contextmenu', targetEl, {passive: !options.preventMenu, capture: false})

  const touchStarts$ = fromEvent('touchstart', targetEl, {passive: passiveEventsHandlers, capture: false})
  const touchMoves$ = fromEvent('touchmove', targetEl, {passive: passiveEventsHandlers, capture: false})
  const touchEnds$ = fromEvent('touchend', targetEl, {passive: passiveEventsHandlers, capture: false})

  const pointerDowns$ = merge(mouseDowns$, touchStarts$) // mouse & touch interactions starts
  const pointerUps$ = merge(mouseUps$, touchEnds$) // mouse & touch interactions ends
  const pointerMoves$ = merge(mouseMoves$, touchMoves$.filter(t => t.touches.length === 1))

  function preventAllScrolls (targetEl) {
    fromEvent('mousewheel', targetEl, {passive: false, capture: false}).forEach(preventDefault)
    fromEvent('DOMMouseScroll', targetEl, {passive: false, capture: false}).forEach(preventDefault)
    fromEvent('wheel', targetEl, {passive: false, capture: false}).forEach(preventDefault)
    fromEvent('touchmove', targetEl, {passive: false, capture: false}).forEach(preventDefault)
  }

  if (preventScroll) {
    preventAllScrolls(targetEl, {passive: passiveEventsHandlers, capture: false})
  }
  if (preventMenu) {
    rightClicks$.forEach(preventDefault)
  }

  const wheel$ = merge(
    fromEvent('wheel', targetEl, {passive: passiveEventsHandlers, capture: false}),
    fromEvent('DOMMouseScroll', targetEl, {passive: passiveEventsHandlers, capture: false}),
    fromEvent('mousewheel', targetEl, {passive: passiveEventsHandlers, capture: false})
  ).map(normalizeWheel)

  return {
    mouseDowns$,
    mouseUps$,
    mouseMoves$,

    rightClicks$,
    wheel$,

    touchStarts$,
    touchMoves$,
    touchEnds$,

    pointerDowns$,
    pointerUps$,
    pointerMoves$}
}

/**
 * returns an object of pointer gestures.
 * @param {DomElement} input - either the dom element to attach events handlers to or the result from baseInteractionsFromEvents
 * @param {Object} options
 * @param {Integer} options.multiTapDelay=250  delay between clicks/taps
 * @param {Integer} options.longPressDelay=250 delay after which we have a 'hold' gesture
 * @param {Float} options.maxStaticDeltaSqr=100 maximum delta (in pixels squared) above which we are not static ie cursor changed places
 * @param {Float} options.zoomMultiplier=200 zoomFactor for normalized interactions across browsers
 * @param {Float} options.pinchThreshold=4000 The minimum amount in pixels the inputs must move until it is fired.
 * @param {Integer} options.pixelRatio=window.devicePixelRatio or 1 : the pixel ratio to use
 * @returns {Object}
 */
function pointerGestures (input, options) {
  let baseInteractions = 'addEventListener' in input ? baseInteractionsFromEvents(input, options) : input

  const defaults = {
    multiTapDelay: 250, // delay between clicks/taps
    longPressDelay: 250, // delay after which we have a 'hold'
    maxStaticDeltaSqr: 100, // maximum delta (in pixels squared) above which we are not static
    zoomMultiplier: 200, // zoomFactor for normalized interactions across browsers
    pinchThreshold: 4000, // The minimum amount in pixels the inputs must move until it is fired.
    pixelRatio: (typeof window !== 'undefined' && window.devicePixelRatio) ? window.devicePixelRatio : 1
  }
  const settings = Object.assign({}, defaults, options)

  const press$ = presses(baseInteractions, settings)
  const holds$ = press$ // longTaps/holds: either HELD leftmouse/pointer or HELD right click
    .filter(e => e.timeDelta > settings.longPressDelay)
    .filter(e => e.moveDelta.sqrd < settings.maxStaticDeltaSqr) // when the square distance is bigger than this, it is a movement, not a tap
    // .map(e => e.value)
  const taps$ = taps(press$, settings)
  const drags$ = drags(baseInteractions, settings)
  const zooms$ = zooms(baseInteractions, settings)

  // FIXME: use 'press' as higher level above tap & click

  return {
    press: press$,
    holds: holds$,
    taps: taps$,
    drags: drags$,
    zooms: zooms$
  }
}

module.exports = {baseInteractionsFromEvents, pointerGestures}
