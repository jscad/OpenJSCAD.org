const most = require('most')
const morph = require('morphdom')// require('nanomorph')
const {proxy} = require('most-proxy')

const hooks = require('morphdom-hooks')
// const morph = hooks(require('morphdom'))

module.exports = function makeDomSideEffect ({targetEl}) {
  const { attach, stream } = proxy()

  const out$ = stream

  function domSink (targetEl, outToDom$) {
    let tree

    const firstRender$ = outToDom$
      .take(1)
      .map(function (_tree) {
        tree = _tree
        targetEl.appendChild(tree)
      })
    const otherRenders$ = outToDom$
      .skip(1)
      .map(function (newTree) {
        morph(tree, newTree)
      })

    const domRenderRequest$ = most.mergeArray([
      firstRender$,
      otherRenders$
    ]).multicast()

    attach(domRenderRequest$)
    domRenderRequest$.forEach(x => x)
  }

  let storedListeners = {

  }
  function domSource () {
    function getElements (query) {
      // todo : how to deal with 'document' level queries
      /*if (query === document) {
        return [document] //Array.from(document.querySelectorAll(query))
      }*/
      return Array.from(targetEl.querySelectorAll(query))
    }

    const select = function (query) {
      // console.log('selecting', query)
      const items = getElements(query)

      let outputStream

      return {events: function events (eventName) {
        if (!items || (items && items.length === 0)) {
          const eventProxy = proxy()
          outputStream = eventProxy.stream
          storedListeners[query + '@@' + eventName] = {observable: eventProxy, live: false}
        }
      // eventsForListners[query] = eventName
        storedListeners[query + '@@' + eventName].events = eventName
        return outputStream.multicast()
      }}
    }

    out$.forEach(function () {
    // console.log('dom source watching dom change')
      Object.keys(storedListeners).forEach(function (queryAndEventName) {
        const [query, eventName] = queryAndEventName.split('@@')
        const items = getElements(query)
        if (items && items.length > 0) {
          const storedListener = storedListeners[queryAndEventName]
          if (storedListener.live === false) {
            storedListener.live = true

            const itemObs = items.map(item => {
            // console.log('HURRAY NOW I HAVE SOMETHING !!')
              return most.fromEvent(storedListener.events, item)
            })
            const realObservable = most.mergeArray(itemObs)
            storedListener.observable.attach(realObservable)
          }
        }
      })
    })

    // adding element: temporary ??
    return {select, element: targetEl}
  }

  return {source: domSource, sink: domSink.bind(null, targetEl)}
}
