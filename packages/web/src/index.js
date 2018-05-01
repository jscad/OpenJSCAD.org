
const {proxy} = require('most-proxy')
const {makeState} = require('./state')

function makeJscad (targetElement, options) {
  const defaults = {
    name: 'jscad'
  }
  const {name} = Object.assign({}, defaults, options)

  // create root dom element
  const bel = require('bel')
  const jscadEl = bel`<div class='jscad' key=${name}></div>`
  targetElement.appendChild(jscadEl)

  // setup all the side effects : ie , input/outputs
  // fake file system
  const fs = require('./sideEffects/memFs')()
  // (local) storage
  const storage = require('./sideEffects/localStorage')(name)
  // http requests
  const http = require('./sideEffects/http')()

  // title bar side effect
  const titleBar = require('@jscad/core/sideEffects/titleBar')()
  // drag & drop side effect // FIXME: unify with the one in core()
  const dragDrop = require('./sideEffects/dragDrop')(jscadEl)
  // dom side effect
  const dom = require('@jscad/core/sideEffects/dom')({targetEl: jscadEl})
  // worker side effect
  const makeWorkerEffect = require('@jscad/core/sideEffects/worker')

  // internationalization side effect
  const i18n = require('@jscad/core/sideEffects/i18n')({
    translations: {
      en: require('../locales/en.json'),
      fr: require('../locales/fr.json'),
      de: require('../locales/de.json')
    }
  })
  // web workers
  const solidWorker = makeWorkerEffect(require('./core/code-evaluation/rebuildSolidsWorker.js'))
  // generic design parameter handling
  const paramsCallbacktoStream = require('@jscad/core/observable-utils/callbackToObservable')()
  // generic editor events handling
  const editorCallbackToStream = require('@jscad/core/observable-utils/callbackToObservable')()

  // proxy state stream to be able to access & manipulate it before it is actually available
  const { attach, stream } = proxy()
  const state$ = stream

  // all the sources of data
  const sources = {
    state$,
    paramChanges: paramsCallbacktoStream.stream,
    editor: editorCallbackToStream.stream,
    store: storage.source(),
    fs: fs.source(),
    http: http.source(),
    drops: dragDrop.source(),
    dom: dom.source(),
    solidWorker: solidWorker.source(),
    i18n: i18n.source(),
    titleBar: titleBar.source()  // #http://openjscad.org/examples/slices/tor.jscad
  }

  // all the destinations of data
  const sinks = {
    store: storage.sink,
    fs: fs.sink,
    http: http.sink,
    i18n: i18n.sink,
    dom: dom.sink,
    solidWorker: solidWorker.sink
  }

  // all the actions
  const designActions = require('./ui/design/actions')(sources)
  const ioActions = require('./ui/io/actions')(sources)
  const viewerActions = require('./ui/viewer/actions')(sources)
  const otherActions = require('./ui/actions')(sources)
  const actions$ = Object.assign({}, designActions, otherActions, ioActions, viewerActions)

  // loop back the state stream so it is circular
  attach(makeState(Object.values(actions$)))

  // formating of data data that goes out to the sink side effects
  // setup reactions (ie outputs to sinks)
  require('./ui/reactions')(sinks, sources, state$, actions$, {jscadEl, paramsCallbacktoStream, editorCallbackToStream})

  return {}
}

module.exports = makeJscad
