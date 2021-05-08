const most = require('most')
const morph = require('morphdom')// require('nanomorph')
const { proxy } = require('most-proxy')

const makeDomSideEffect = ({ targetEl }) => {
  const { attach, stream } = proxy()

  const out$ = stream

  const domSink = (targetEl, outToDom$) => {
    let tree

    const firstRender$ = outToDom$
      .take(1)
      .map((_tree) => {
        tree = _tree
        targetEl.appendChild(tree)
      })
    const otherRenders$ = outToDom$
      .skip(1)
      .map((newTree) => {
        morph(tree, newTree)
      })

    const domRenderRequest$ = most.mergeArray([
      firstRender$,
      otherRenders$
    ]).multicast()

    attach(domRenderRequest$)
    domRenderRequest$.forEach((x) => x)
  }

  const storedListeners = {}

  const domSource = () => {
    // TODO : how to deal with 'document' level queries
    const getElements = (query) => Array.from(targetEl.querySelectorAll(query))
    /* if (query === document) {
      return [document] //Array.from(document.querySelectorAll(query))
    } */

    const select = (query) => {
      // console.log('selecting', query)
      const items = getElements(query)

      let outputStream

      return {
        events: function events (eventName) {
          if (!items || (items && items.length === 0)) {
            const eventProxy = proxy()
            outputStream = eventProxy.stream
            storedListeners[query + '@@' + eventName] = { observable: eventProxy, live: false }
          }
          // eventsForListners[query] = eventName
          storedListeners[query + '@@' + eventName].events = eventName
          return outputStream.multicast()
        }
      }
    }

    out$.forEach(() => {
    // console.log('dom source watching dom change')
      Object.keys(storedListeners).forEach((queryAndEventName) => {
        const [query] = queryAndEventName.split('@@')
        const items = getElements(query)
        if (items && items.length > 0) {
          const storedListener = storedListeners[queryAndEventName]
          if (storedListener.live === false) {
            storedListener.live = true

            const itemObs = items.map((item) => most.fromEvent(storedListener.events, item))
            const realObservable = most.mergeArray(itemObs)
            storedListener.observable.attach(realObservable)
          }
        }
      })
    })

    // adding element: temporary ??
    return { select, element: targetEl }
  }

  return { source: domSource, sink: domSink.bind(null, targetEl) }
}

module.exports = makeDomSideEffect
