// ui-editor.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// Editor Functionality
//
// History:
//   2016/06/27: 0.5.1: added local storage by Robert Starkey
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// --- Dependencies
// gProcessor var
// #editor element

// --- Global Variables
const ace = require('brace')
require('brace/mode/javascript')
require('brace/mode/scad')
require('brace/theme/chrome')

const openscadOpenJscadParser = require('@jscad/openscad-openjscad-translator')

// See http://ace.ajax.org/#nav=howto
function setUpEditor (divname, gProcessor) {
  var gEditor = null
  if (divname === undefined) { divname = 'editor' }
  if (document.getElementById(divname) === null) return

  gEditor = ace.edit(divname)
  gEditor.$blockScrolling = Infinity
  gEditor.getSession().setMode('ace/mode/javascript')
  // gEditor.setTheme("ace/theme/ambiance")
  // gEditor.setTheme("ace/theme/chaos")
  gEditor.setTheme('ace/theme/chrome')
  // gEditor.setTheme("ace/theme/clouds")
  // gEditor.setTheme("ace/theme/cobalt")
  // gEditor.setTheme("ace/theme/dawn") // nice
  // gEditor.setTheme("ace/theme/dreamweaver")
  // gEditor.setTheme("ace/theme/eclipse")
  // gEditor.setTheme("ace/theme/github")
  // gEditor.setTheme("ace/theme/idle_fingers")
  // gEditor.setTheme("ace/theme/katzenmilch")
  // gEditor.setTheme("ace/theme/kr_theme")
  // gEditor.setTheme("ace/theme/kuroir")
  // gEditor.setTheme("ace/theme/merbivore")
  // gEditor.setTheme("ace/theme/mono_industrial")
  // gEditor.setTheme("ace/theme/monokai")
  // gEditor.setTheme("ace/theme/pastel_on_dark")
  // gEditor.setTheme("ace/theme/solarized_dark")
  // gEditor.setTheme("ace/theme/solarized_light")
  // gEditor.setTheme("ace/theme/terminal")
  // gEditor.setTheme("ace/theme/textmate")
  // gEditor.setTheme("ace/theme/tomorrow")
  // gEditor.setTheme("ace/theme/tomorrow_night")
  // gEditor.setTheme("ace/theme/tomorrow_night_blue")
  // gEditor.setTheme("ace/theme/tomorrow_night_bright")
  // gEditor.setTheme("ace/theme/tomorrow_night_eighties")
  // gEditor.setTheme("ace/theme/twilight")
  // gEditor.setTheme("ace/theme/vibrant_ink")
  // gEditor.setTheme("ace/theme/xcode")

  function runExec(editor) {
    var src = editor.getValue()
    if (src.match(/^\/\/\!OpenSCAD/i)) {
      editor.getSession().setMode('ace/mode/scad')
      // FIXME test for the global function first
      src = openscadOpenJscadParser.parse(src)
    } else {
      editor.getSession().setMode('ace/mode/javascript')
    }
    if (gProcessor !== null) {
      gProcessor.setJsCad(src)
    }
  }
  // enable special keystrokes
  gEditor.commands.addCommand({
    name: 'setJSCAD',
    bindKey: { win: 'F5|Shift-Return', mac: 'F5|Shift-Return' },
    exec: runExec
  })
  document.body.addEventListener('keydown', function(evt) {
    if (evt.key === 'F5') {
      evt.preventDefault()
      //console.log('no accidental reloading!')
      runExec(gEditor);
    }
  });
  gEditor.commands.addCommand({
    name: 'viewerReset',
    bindKey: { win: 'Ctrl-Return', mac: 'Command-Return' },
    exec: function (editor) {
      if (gProcessor !== null) {
        gProcessor.viewer.resetCamera()
      }
    }
  })
  gEditor.commands.addCommand({
    name: 'saveSource',
    bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
    exec: function (editor) {
      var src = editor.getValue()
      localStorage.editorContent = src
      gProcessor.setStatus('saved', 'Saved source to browser storage')
    }
  })
  gEditor.commands.addCommand({
    name: 'loadSource',
    bindKey: { win: 'Ctrl-L', mac: 'Command-L' },
    exec: function (editor) {
      var src = localStorage.editorContent
      src && src.length ? editor.setValue(src, 1) : null
      gEditor.commands.exec('setJSCAD', editor)
      gProcessor.setStatus('loaded', 'Loaded source from browser storage')
    }
  })
  gEditor.commands.addCommand({
    name: 'downloadSource',
    bindKey: { win: 'Ctrl-Shift-S', mac: 'Command-Shift-S' },
    exec: function (editor) {
      var src = editor.getValue()
      setTimeout(function () {
        var blob = new Blob([src], {type: 'text/plain'})
        var object_url = URL.createObjectURL(blob)
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        save_link.href = object_url
        save_link.download = 'MyDesign.jscad'

        var event = new MouseEvent('click')
        save_link.dispatchEvent(event)
      }, 0)
    }
  })
  gEditor.commands.addCommand({
    name: 'clearStorage',
    bindKey: { win: 'Ctrl-Shift-\\', mac: 'Command-Shift-\\' },
    exec: function (editor) {
      var src = editor.getValue()
      localStorage.clear()
      gProcessor.setStatus('cleared', 'Cleared browser storage')
    }
  })

  return gEditor
}

function putSourceInEditor (gEditor, src, fn) {
  if (gEditor !== null) {
    gEditor.setValue(src, -1)
    if (src.match(/^\/\/!OpenSCAD/i)) {
      gEditor.getSession().setMode('ace/mode/scad')
    } else {
      gEditor.getSession().setMode('ace/mode/javascript')
    }
  }
}

function getSourceFromEditor (gEditor) {
  if (gEditor !== null) {
    return gEditor.getValue()
  }
  return ''
}

module.exports = {
  setUpEditor,
  putSourceInEditor,
  getSourceFromEditor
}

