const html = require('nanohtml')

const packageMetadata = require('../package.json')
const keyBindings = require('../data/keybindings.json')

let instances = 0

/** make creator function, to create new jscad instances
 * @param  {DOM element} targetElement the dom element where you want to create your jscad instance
 * @param {Object} options
 * @param {String} options.name the UNIQUE name of the output instance, if you re-use the same name
 * you might run into weird issues
 * @param {Boolean} options.logging toggle logging on/off
 */
async function makeJscad (targetElement, options) {
  const defaults = {
    name: 'jscad',
    logging: false
  }
  const { name, logging } = Object.assign({}, defaults, options)

  // create root dom element
  const jscadEl = html`<div class='jscad' key=${name} tabindex=${instances}></div>`
  targetElement.appendChild(jscadEl)

  // setup all the side effects : ie , input/outputs
  // (local) storage
  const storage = require('./sideEffects/localStorage')({ name, logging })
  // title bar side effect
  const titleBar = require('@jscad/core/sideEffects/titleBar')({ logging })
  // drag & drop side effect // FIXME: unify with the one in core()
  const dragDrop = require('./sideEffects/dragDrop')({ targetEl: jscadEl, logging })
  // fileDialog side effect
  const fileDialog = require('./sideEffects/fileDialog')({ targetEl: jscadEl, logging })
  // dom side effect
  const dom = require('@jscad/core/sideEffects/dom')({ targetEl: jscadEl }, logging)
  // state (pseudo) side effect
  const state = require('./sideEffects/state/index')({ logging, packageMetadata, keyBindings })

  // local file system (from drag & drop etc)
  const fs = await require('./sideEffects/localFs')({ logging })
  // http requests
  const http = require('./sideEffects/http')({ logging })
  // dat requests (experimental)
  const dat = await require('./sideEffects/dat')({ logging })

  // internationalization side effect, loaded up with preset translations
  const i18n = require('@jscad/core/sideEffects/i18n')({
    translations: {
      en: require('../locales/en.json'),
      fr: require('../locales/fr.json'),
      de: require('../locales/de.json'),
      ja: require('../locales/ja.json')
    },
    logging
  })

  // web workers
  const solidWorker = require('@jscad/core/sideEffects/worker')(require('@jscad/core/code-evaluation/rebuildGeometryWorker.js'))
  // generic design parameter handling
  const paramsCallbacktoStream = require('@jscad/core/observable-utils/callbackToObservable')()
  // generic editor events handling
  const editorCallbackToStream = require('@jscad/core/observable-utils/callbackToObservable')()

  // all the sources of data
  const sources = {
    paramChanges: paramsCallbacktoStream.stream,
    editor: editorCallbackToStream.stream,
    state: state.source(),
    store: storage.source(),
    fs: fs.source(),
    http: http.source(),
    https: http.source(),
    drops: dragDrop.source(),
    dom: dom.source(),
    solidWorker: solidWorker.source(),
    i18n: i18n.source(),
    titleBar: titleBar.source(),
    fileDialog: fileDialog.source(),
    dat: await dat.source()
  }

  // all the destinations of data
  const sinks = {
    store: storage.sink,
    fs: fs.sink,
    http: http.sink,
    https: http.sink,
    i18n: i18n.sink,
    dom: dom.sink,
    solidWorker: solidWorker.sink,
    state: state.sink,
    fileDialog: fileDialog.sink,

    dat: dat.sink
  }

  // all the outputs (ie inputs from sources converted to outputs/actions etc)
  const outputs$ = require('./ui/flow/flowIn')(sources)
  // setup reactions (ie outputs to sinks)
  const extras = { jscadEl, paramsCallbacktoStream, editorCallbackToStream }
  require('./ui/flow/flowOut')({ sinks, sources, outputs$, extras })

  // increase the count of jscad instances in this page
  instances += 1

  // we return a function to allow setting/modifying params
  const mainParams = require('@jscad/core/observable-utils/callbackToObservable')()
  // mainParams.stream.forEach(x => console.log('setting params', x))
  return (params) => {
    mainParams.callback(params)
  }
}

module.exports = makeJscad
