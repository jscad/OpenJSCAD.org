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
    return [{ ext: 'js', fullPath: '/changes.js', mimetype: 'javascript', name: 'changes.js', source }]
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
    <textarea>
    </textarea>
    <p style='position:absolute;top:0rem;right:1rem;color:gray;user-select:none'>
      Press 'shift + enter' to render!
    </p>
    </section>
    `
    wrapper.onkeydown = (e) => e.stopPropagation()
    wrapper.onkeyup = (e) => e.stopPropagation()

    // and add the editor
    editor = CodeMirror.fromTextArea(wrapper.firstChild, editorOptions)

    editor.setOption('extraKeys', {
      Tab: (cm) => {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
        cm.replaceSelection(spaces)
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

    let compileShortcut = state.shortcuts.find((shortcut) => shortcut.args === 'reevaluate')
    if (!compileShortcut) compileShortcut = { args: 'Shift-Enter' }
    let key = compileShortcut.key.toUpperCase()
    // can you say PAIN? codemirror has very specific control prefixes!
    key = key.replace(/enter/i, 'Enter')
    key = key.replace(/alt[+-]/i, 'Alt-')
    key = key.replace(/cmd[+-]/i, 'Cmd-')
    key = key.replace(/control[+-]/i, 'Ctrl-')
    key = key.replace(/shift[+-]/i, 'Shift-')

    const extraKeys = {
      Tab: (cm) => {
        const spaces = Array(cm.getOption('indentUnit') + 1).join(' ')
        cm.replaceSelection(spaces)
      }
    }
    extraKeys[key] = (cm) => {
      const fileTree = createFileTree(cm)
      if (fileTree) editorCallbackToStream.callback({ type: 'read', id: 'loadRemote', data: fileTree })
    }
    editor.setOption('extraKeys', extraKeys)

    editor.focus()
    editor.scrollIntoView({ line: 0, ch: 0 })
    // workaround to make content appear without clicking the editor after loading an example
    // call the refresh in a setTimeout to force js to run it in the next global event loop
    setTimeout(() => editor.refresh(), 0)
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
        editor.refresh()
      }
    }
  }

  return el
}

module.exports = {
  editorWrapper
}
