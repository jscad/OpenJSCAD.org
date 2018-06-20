
const packageMetadata = require('../package.json')
const keyBindings = require('../data/keybindings.json')
let instances = 0

function makeJscad (targetElement, options) {
  const defaults = {
    name: 'jscad',
    logging: false
  }
  const {name, logging} = Object.assign({}, defaults, options)

  // create root dom element
  const bel = require('bel')
  const jscadEl = bel`<div class='jscad' key=${name} tabindex=${instances}></div>`
  targetElement.appendChild(jscadEl)

  // setup all the side effects : ie , input/outputs
  // fake file system
  const fs = require('./sideEffects/memFs')({logging})
  // (local) storage
  const storage = require('./sideEffects/localStorage')({name, logging})
  // http requests
  const http = require('./sideEffects/http')({logging})
  // title bar side effect
  const titleBar = require('@jscad/core/sideEffects/titleBar')({logging})
  // drag & drop side effect // FIXME: unify with the one in core()
  const dragDrop = require('./sideEffects/dragDrop')({targetEl: jscadEl, logging})
  // fileDialog side effect
  const fileDialog = require('./sideEffects/fileDialog')({targetEl: jscadEl, logging})
  // dom side effect
  const dom = require('@jscad/core/sideEffects/dom')({targetEl: jscadEl}, logging)
  // state (pseudo) side effect
  const state = require('./sideEffects/state/index')({logging, packageMetadata, keyBindings})

  // internationalization side effect
  const i18n = require('@jscad/core/sideEffects/i18n')({
    translations: {
      en: require('../locales/en.json'),
      fr: require('../locales/fr.json'),
      de: require('../locales/de.json')
    },
    logging
  })

  // web workers
  const geometryWorker = require('@jscad/core/sideEffects/worker')(require('./core/code-evaluation/rebuildGeometryWorker.js'))
  // generic design parameter handling
  const paramsCallbacktoStream = require('@jscad/core/observable-utils/callbackToObservable')()
  // generic editor events handling
  const editorCallbackToStream = require('@jscad/core/observable-utils/callbackToObservable')()

  // all the sources of data
  const sources = {
    state: state.source(),
    paramChanges: paramsCallbacktoStream.stream,
    editor: editorCallbackToStream.stream,
    store: storage.source(),
    fs: fs.source(),
    http: http.source(),
    drops: dragDrop.source(),
    dom: dom.source(),
    solidWorker: geometryWorker.source(),
    i18n: i18n.source(),
    titleBar: titleBar.source(),  // #http://openjscad.org/examples/slices/tor.jscad
    fileDialog: fileDialog.source()
  }

  // all the destinations of data
  const sinks = {
    store: storage.sink,
    fs: fs.sink,
    http: http.sink,
    i18n: i18n.sink,
    dom: dom.sink,
    solidWorker: geometryWorker.sink,
    state: state.sink,
    fileDialog: fileDialog.sink
  }

  // all the outputs (ie inputs from sources converted to outputs/actions etc)
  const outputs$ = require('./ui/flow/flowIn')(sources)
  // setup reactions (ie outputs to sinks)
  const extras = {jscadEl, paramsCallbacktoStream, editorCallbackToStream}
  require('./ui/flow/flowOut')({sinks, sources, outputs$, extras})

  // increase the count of jscad instances in this page
  instances += 1

  // we return a function to allow setting/modifying params
  const mainParams = require('@jscad/core/observable-utils/callbackToObservable')()
  mainParams.stream.forEach(x => console.log('setting params', x))
  return (params) => {
    mainParams.callback(params)
  }
}

module.exports = makeJscad
