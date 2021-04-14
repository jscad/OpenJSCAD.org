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
require('brace/ext/language_tools.js')
ace.acequire('ace/ext/language_tools')
require('brace/mode/javascript')
require('brace/mode/scad')
require('brace/theme/chrome')
require('brace/theme/monokai')
const openscadOpenJscadParser = require('@jscad/openscad-openjscad-translator')

// See http://ace.ajax.org/#nav=howto
const setUpEditor = (element, gProcessor) => {
  const langTools = ace.acequire('ace/ext/language_tools')

  console.log('langTools', langTools)
  const flowCompleter = {
    getCompletions: (editor, session, pos, prefix, callback) => {
      console.log('getCompletions')
      // your code
    }
  }
  langTools.addCompleter(flowCompleter)

  let gEditor = null
  gEditor = ace.edit(element)
  gEditor.$blockScrolling = Infinity
  gEditor.getSession().setMode('ace/mode/javascript')
  gEditor.setTheme('ace/theme/monokai')
  // gEditor.getSession().setMode("ace/mode/javascript");
  // gEditor.setTheme("ace/theme/ambiance")
  // gEditor.setTheme("ace/theme/chaos")
  // gEditor.setTheme('ace/theme/chrome')
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

  const runExec = (editor) => {
    let src = editor.getValue()
    if (src.match(/^\/\/!OpenSCAD/i)) {
      editor.getSession().setMode('ace/mode/scad')
      // FIXME test for the global function first
      src = openscadOpenJscadParser.parse(src)
    } else {
      editor.getSession().setMode('ace/mode/javascript')
    }
    if (gProcessor !== null) {
      // gProcessor.setJsCad(src)
    }
  }
  // enable special keystrokes
  gEditor.commands.addCommand({
    name: 'setJSCAD',
    bindKey: { win: 'F5|Shift-Return', mac: 'F5|Shift-Return' },
    exec: runExec
  })
  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'F5') {
      evt.preventDefault()
      // console.log('no accidental reloading!')
      runExec(gEditor)
    }
  })
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
      const src = editor.getValue()
      localStorage.editorContent = src
      gProcessor.setStatus('saved', 'Saved source to browser storage')
    }
  })
  gEditor.commands.addCommand({
    name: 'loadSource',
    bindKey: { win: 'Ctrl-L', mac: 'Command-L' },
    exec: function (editor) {
      const src = localStorage.editorContent
      if (src && src.length) editor.setValue(src, 1)
      gEditor.commands.exec('setJSCAD', editor)
      gProcessor.setStatus('loaded', 'Loaded source from browser storage')
    }
  })
  gEditor.commands.addCommand({
    name: 'downloadSource',
    bindKey: { win: 'Ctrl-Shift-S', mac: 'Command-Shift-S' },
    exec: function (editor) {
      const src = editor.getValue()
      setTimeout(() => {
        const blob = new Blob([src], { type: 'text/plain' })
        const objectUrl = URL.createObjectURL(blob)
        const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        saveLink.href = objectUrl
        saveLink.download = 'MyDesign.jscad'

        const event = new MouseEvent('click')
        saveLink.dispatchEvent(event)
      }, 0)
    }
  })
  gEditor.commands.addCommand({
    name: 'clearStorage',
    bindKey: { win: 'Ctrl-Shift-\\', mac: 'Command-Shift-\\' },
    exec: function (editor) {
      localStorage.clear()
      gProcessor.setStatus('cleared', 'Cleared browser storage')
    }
  })

  return gEditor
}

const putSourceInEditor = (gEditor, src, fn) => {
  if (gEditor) {
    gEditor.setValue(src, -1)
    if (src.match(/^\/\/!OpenSCAD/i)) {
      gEditor.getSession().setMode('ace/mode/scad')
    } else {
      gEditor.getSession().setMode('ace/mode/javascript')
    }
  }
}

const getSourceFromEditor = (gEditor) => {
  if (gEditor !== null) {
    return gEditor.getValue()
  }
  return ''
}
const html = require('bel')

const editorWrapper = (state, editorCallbackToStream) => {
  const el = html`
  <div id='editor' key='editor' style='visibility:${state.activeTool === 'editor' ? 'visible' : 'hidden'}' >
  </div>`

  const editor = setUpEditor(el)
  // const snippets = '# Prototype\nsnippet proto\n  ${1:class_name}.prototype.${2:method_name} = function(${3:first_argument}) {\n    ${4:// body...}\n  };\n# Function\nsnippet fun\n  function ${1?:function_name}(${2:argument}) {\n    ${3:// body...}\n  }\n# Anonymous Function\nregex /((=)\\s*|(:)\\s*|(\\()|\\b)/f/(\\))?/\nsnippet f\n  function${M1?: ${1:functionName}}($2) {\n    ${0:$TM_SELECTED_TEXT}\n  }${M2?;}${M3?,}${M4?)}\n# Immediate function\ntrigger \\(?f\\(\nendTrigger \\)?\nsnippet f(\n  (function(${1}) {\n    ${0:${TM_SELECTED_TEXT:/* code */}}\n  }(${1}));\n# if\nsnippet if\n  if (${1:true}) {\n    ${0}\n  }\n# if ... else\nsnippet ife\n  if (${1:true}) {\n    ${2}\n  } else {\n    ${0}\n  }\n# tertiary conditional\nsnippet ter\n  ${1:/* condition */} ? ${2:a} : ${3:b}\n# switch\nsnippet switch\n  switch (${1:expression}) {\n    case \'${3:case}\':\n      ${4:// code}\n      break;\n    ${5}\n    default:\n      ${2:// code}\n  }\n# case\nsnippet case\n  case \'${1:case}\':\n    ${2:// code}\n    break;\n  ${3}\n\n# while (...) {...}\nsnippet wh\n  while (${1:/* condition */}) {\n    ${0:/* code */}\n  }\n# try\nsnippet try\n  try {\n    ${0:/* code */}\n  } catch (e) {}\n# do...while\nsnippet do\n  do {\n    ${2:/* code */}\n  } while (${1:/* condition */});\n# Object Method\nsnippet :f\nregex /([,{[])|^\\s*/:f/\n  ${1:method_name}: function(${2:attribute}) {\n    ${0}\n  }${3:,}\n# setTimeout function\nsnippet setTimeout\nregex /\\b/st|timeout|setTimeo?u?t?/\n  setTimeout(function() {${3:$TM_SELECTED_TEXT}}, ${1:10});\n# Get Elements\nsnippet gett\n  getElementsBy${1:TagName}(\'${2}\')${3}\n# Get Element\nsnippet get\n  getElementBy${1:Id}(\'${2}\')${3}\n# console.log (Firebug)\nsnippet cl\n  console.log(${1});\n# return\nsnippet ret\n  return ${1:result}\n# for (property in object ) { ... }\nsnippet fori\n  for (var ${1:prop} in ${2:Things}) {\n    ${0:$2[$1]}\n  }\n# hasOwnProperty\nsnippet has\n  hasOwnProperty(${1})\n# docstring\nsnippet /**\n  /**\n   * ${1:description}\n   *\n   */\nsnippet @par\nregex /^\\s*\\*\\s*/@(para?m?)?/\n  @param {${1:type}} ${2:name} ${3:description}\nsnippet @ret\n  @return {${1:type}} ${2:description}\n# JSON.parse\nsnippet jsonp\n  JSON.parse(${1:jstr});\n# JSON.stringify\nsnippet jsons\n  JSON.stringify(${1:object});\n# self-defining function\nsnippet sdf\n  var ${1:function_name} = function(${2:argument}) {\n    ${3:// initial code ...}\n\n    $1 = function($2) {\n      ${4:// main code}\n    };\n  }\n# singleton\nsnippet sing\n  function ${1:Singleton} (${2:argument}) {\n    // the cached instance\n    var instance;\n\n    // rewrite the constructor\n    $1 = function $1($2) {\n      return instance;\n    };\n    \n    // carry over the prototype properties\n    $1.prototype = this;\n\n    // the instance\n    instance = new $1();\n\n    // reset the constructor pointer\n    instance.constructor = $1;\n\n    ${3:// code ...}\n\n    return instance;\n  }\n# class\nsnippet class\nregex /^\\s*/clas{0,2}/\n  var ${1:class} = function(${20}) {\n    $40$0\n  };\n  \n  (function() {\n    ${60:this.prop = ""}\n  }).call(${1:class}.prototype);\n  \n  exports.${1:class} = ${1:class};\n# \nsnippet for-\n  for (var ${1:i} = ${2:Things}.length; ${1:i}--; ) {\n    ${0:${2:Things}[${1:i}];}\n  }\n# for (...) {...}\nsnippet for\n  for (var ${1:i} = 0; $1 < ${2:Things}.length; $1++) {\n    ${3:$2[$1]}$0\n  }\n# for (...) {...} (Improved Native For-Loop)\nsnippet forr\n  for (var ${1:i} = ${2:Things}.length - 1; $1 >= 0; $1--) {\n    ${3:$2[$1]}$0\n  }\n\n\n#modules\nsnippet def\n  define(function(require, exports, module) {\n  "use strict";\n  var ${1/.*\\///} = require("${1}");\n  \n  $TM_SELECTED_TEXT\n  });\nsnippet req\nguard ^\\s*\n  var ${1/.*\\///} = require("${1}");\n  $0\nsnippet requ\nguard ^\\s*\n  var ${1/.*\\/(.)/\\u$1/} = require("${1}").${1/.*\\/(.)/\\u$1/};\n  $0\n'

  // editor.resize(true)
  // editor.renderer.updateFull()
  /* ace.config.loadModule('ace/snippets/javascript', function (ba) {
    console.log('boo', ba)
  })
  ace.config.loadModule('ace/ext/language_tools', function () {
    console.log('gna')
    const bla = require('brace/snippets/javascript')
    console.log('foo', bla)
    editor.insertSnippet(bli);
  }) */
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
  })

  const source = `
  const main = (params) => {

  }
  module.exports = {main}
  `
  // state.design.source

  putSourceInEditor(editor, source)
  return el
}

module.exports = {
  editorWrapper,
  setUpEditor,
  putSourceInEditor,
  getSourceFromEditor
}
