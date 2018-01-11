const most = require('most')
const morph = require('morphdom')// require('nanomorph')
const {proxy} = require('most-proxy')
const { attach, stream } = proxy()
// const {holdSubject} = require('../../node_modules/csg-viewer/')
// require('../observable-utils/most-subject/index')

const out$ = stream
function domSink (outToDom$) {
  let tree
  const firstRender$ = outToDom$
    .take(1)
    .map(function (_tree) {
      tree = _tree
      document.body.appendChild(tree)
    })
  const otherRenders$ = outToDom$
    .skip(1)
    .map(function (newTree) {
      morph(tree, newTree)
    })

  const foo$ = most.mergeArray([
    firstRender$,
    otherRenders$
  ]).multicast()

  attach(foo$)
  foo$.forEach(x => x)
}

/*let storedObservables = {}
let waitingForListeners = []
let eventsForListners = {} */
let storedListeners = {

}
function domSource () {
  function getElement (query) {
    let item = document.querySelectorAll(query)
    return item
  }

  const select = function (query) {
    // console.log('selecting', query)
    const item = getElement(query)

    let outputStream
    if (!item || (item && item.length === 0)) {
      const eventProxy = proxy()
      outputStream = eventProxy.stream
      storedListeners[query] = {observable: eventProxy, live: false}
    }

    return {events: function events (eventName) {
      // eventsForListners[query] = eventName
      storedListeners[query].events = eventName
      return outputStream
    }}
  }

  out$.forEach(function () {
    // console.log('dom source watching dom change')
    Object.keys(storedListeners).forEach(function (query) {
      const item = getElement(query)
      if (item) {
        const storedListener = storedListeners[query]
        if (item.length === 1 && storedListener.live === false) {
          // console.log('HURRAY NOW I HAVE SOMETHING !!')          
          const realObservable = most.fromEvent(storedListener.events, item[0])
          storedListener.observable.attach(realObservable)
          storedListener.live = true
        }
      }
    })
  })

  return {select}
}

function makeDomSource () {

}

module.exports = {domSource, domSink}
