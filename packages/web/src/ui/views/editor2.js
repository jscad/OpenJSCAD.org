const html = require('nanohtml')
const CodeMirror = require('codemirror')
require('codemirror/addon/hint/show-hint')
require('codemirror/addon/hint/javascript-hint')

// const hint = require('./hint')
// const hintJs = require('./hint-js')

let cm

const editorWrapper = (state, editorCallbackToStream) => {
  const el = html`
  <div id='editor' key='editor' style='visibility:${state.activeTool === 'editor' ? 'visible' : 'hidden'}'>
  </div>`
  // el.onadd = console.log.bind(console, 'button added to page!')
  // el.onadd = console.log.bind(console, ' added to page!')
  // el.onupdate = console.log.bind(console, ' updated in page!')
  // el.ondiscard = console.log.bind(console, ' discarded from page!')

  // console.log('el onupdate?', el.onupdate)
  el.onupdate = function () {
    // console.log('update')
    cm.refresh()
  }// console.log.bind(console, ' updated in page!')

  CodeMirror.commands.autocomplete = (cm) => {
    console.log('autocomplete')
    const doc = cm.getDoc()
    const POS = doc.getCursor()
    const mode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(POS).state).mode.name

    console.log('foo', cm.getTokenAt(POS))
    if (mode === 'xml') { // html depends on xml
      CodeMirror.showHint(cm, CodeMirror.hint.html)
    } else if (mode === 'javascript') {
      CodeMirror.showHint(cm, CodeMirror.hint.javascript)
    } else if (mode === 'css') {
      CodeMirror.showHint(cm, CodeMirror.hint.css)
    }
  }

  /* var onload = require('on-load')
  onload(el, function (_el) {
    console.log('in the dom')
    cm = CodeMirror(_el, {
      value: state.design.source,
      mode: {name: 'javascript', globalVars: true},
      // mode: 'javascript',
      lineNumbers: true,
      tabSize: 2,
      theme: 'monokai',
      smartIndent: true,
      extraKeys: {'Ctrl-Space': 'autocomplete'}
    })
    cm.refresh()
  }, function (el) {
    console.log('out of the dom')
  }) */
  return el
}

module.exports = {
  editorWrapper
}
