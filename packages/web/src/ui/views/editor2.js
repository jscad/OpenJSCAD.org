const html = require('nanohtml')

const CodeMirror = require('codemirror')
require('codemirror/mode/javascript/javascript')
require('codemirror/addon/hint/javascript-hint')

const editorOptions = {
  mode: 'javascript',
  indentUnit: 2,
  smartIndent: false,
  indentWithTabs: false,
  lineNumbers: true,
  autofocus: true
}

let editor
let wrapper

/*
 * Create a file tree from the contents of the editor
 */
const createFileTree = (editor) => {
  const source = editor.getValue()
  if (source && source.length > 0) {
    return [{ ext: 'js', fullPath: '/changes.js', mimetype: '', name: 'changes.js', source }]
  }
  return null
}

/*
 * Create a HTML wrapper for the editor (single instance)
 */
const createWrapper = (state, callbackToStream) => {
  if (!wrapper) {
    wrapper = html`
    <section class='popup-menu' id='editor' key='editor' style='visibility:${state.activeTool === 'editor' ? 'visible' : 'hidden'}'>
      <textarea></textarea>
    </section>
    `
    wrapper.onkeydown = (e) => e.stopPropagation()
    wrapper.onkeyup = (e) => e.stopPropagation()

    // and add the editor
    editor = CodeMirror.fromTextArea(wrapper.firstChild, editorOptions)
    editor.setOption("extraKeys", {
      Tab: (cm) => {
        const spaces = Array(cm.getOption("indentUnit") + 1).join(" ")
        cm.replaceSelection(spaces)
      },
      "Shift-Enter": (cm) => {
        const fileTree = createFileTree(cm)
        if (fileTree) callbackToStream.callback({ type: 'read', id: 'loadRemote', data: fileTree })
      }
    })

    // inject style sheet for the editor
    const head = document.getElementsByTagName('HEAD')[0]
    const link = document.createElement('LINK')
    link.rel = 'stylesheet'
    link.href = './css/codemirror.css'
    head.appendChild(link)
  }
  return wrapper
}

/*
 * Create the editor wrapper for handling changes to file contents.
 *
 * Note: Only the contents of a single file are loaded into the editor. No projects.
 * Note: Only the contents of javascript files are loaded into the editor. No external formats.
 */
const editorWrapper = (state, editorCallbackToStream) => {
  const el = createWrapper(state, editorCallbackToStream)

  // and adjust the state
  if (state.activeTool === 'editor') {
    el.style.visibility = 'visible'
    el.focus()

    editor.focus()
    editor.scrollIntoView({line: 0, ch: 0})
    // editor.refresh()
  } else {
    el.style.visibility = 'hidden'
  }

  // and adjust the contents if any
  if (state.design && state.design.filesAndFolders) {
    if (state.design.filesAndFolders.length === 1) {
      const file0 = state.design.filesAndFolders[0]
      let source = file0.source ? file0.source : ''
      if (file0.mimetype) {
        if (file0.mimetype.indexOf('javascript') < 0) source = '// imported from external format'
      } else {
        source = '// imported from project'
      }
      const prevsource = editor.getValue()
      if (source !== prevsource) {
        editor.focus()
        editor.setValue(source)
        editor.setCursor(0, 0)
        //editor.execCommand('goDocStart')
        editor.refresh()
      }
    }
  }

  return el
}

module.exports = {
  editorWrapper
}
