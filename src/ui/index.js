// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
import { setUpEditor } from './editor'
import { setupDragDrop } from './dragDrop/ui-drag-drop' // toggleAutoReload

import { detectBrowser } from './detectBrowser'
import { getUrlParams } from './urlHelpers'
import { createExamples, fetchExample, loadInitialExample } from './examples'
import { createOptions, getOptions } from './options'
import AlertUserOfUncaughtExceptions from './errorDispatcher'

import { version } from '../jscad/version'
import Processor from '../jscad/processor'

const me = document.location.toString().match(/^file:/) ? 'web-offline' : 'web-online'
const browser = detectBrowser()

var showEditor = true
var remoteUrl = './remote.pl?url='
// var remoteUrl = './remote.php?url='
var gProcessor = null
var gEditor = null

var gMemFs = [] // associated array, contains file content in source gMemFs[i].{name,source}
var gCurrentFiles = [] // linear array, contains files (to read)

let state = {
  memFs: [],
  currentFiles: []
}

function getElementHeight (element) {
  return parseInt(getComputedStyle(element).height)
}

function getElementWidth (element) {
  return parseInt(getComputedStyle(element).width)
}

function setElementHeight (element, height) {
  element.style.height = `${height}`
}

function setElementWidth (element, width) {
  element.style.width = `${width}`
}

function addEventListenerList (list, event, callback) {
  Array
    .from(list)
    .forEach(element => element.addEventListener(event, callback))
}

function init () {
  // Show all exceptions to the user: // WARNING !! this is not practical at dev time
  AlertUserOfUncaughtExceptions()

  getUrlParams(document.URL)

  gProcessor = new Processor(document.getElementById('viewerContext'))
  gEditor = setUpEditor(undefined, gProcessor)
  // FIXME: temporary hack
  let {toggleAutoReload, reloadAllFiles} = setupDragDrop(me, {gMemFs, gProcessor, gEditor})
  createExamples(me)
  createOptions()
  getOptions()

  loadInitialExample(me, {gMemFs, gProcessor, gEditor, remoteUrl})

  let menu = document.getElementById('menu')
  let editFrame = document.getElementById('editFrame')
  let examples = document.getElementById('examples')
  let examplesTitle = document.getElementById('examplesTitle')
  let options = document.getElementById('options')
  let optionsTitle = document.getElementById('optionsTitle')
  let editHandle = document.getElementById('editHandle')
  let plate = document.getElementById('plate')

  setElementHeight(menu, window.innerHeight + 'px')
  setElementHeight(editFrame, window.innerHeight + 'px')

  window.addEventListener('resize', function () { // adjust the relevant divs
    setElementHeight(menu, window.innerHeight + 'px')
    menuHandle.style.top = '45%'
    setElementHeight(editFrame, window.innerHeight + 'px')
  })

  setTimeout(function () {
    menu.style.left = '-280px'
  }, 3000) // -- hide slide-menu after 3secs

  // mouseleave
  menu.addEventListener('mouseleave', function (e) {
    setElementHeight(examples, '0px')
    examples.style.display = 'none'
  // setElementHeight(options, 0)
  // options.style.display = 'none'
  })

  editHandle.addEventListener('click', function (e) {
    if (getElementWidth(editFrame) === 0) {
      setElementWidth(editFrame, '40%')
      editHandle.src = 'imgs/editHandleIn.png'
    } else {
      setElementWidth(editFrame, '0px')
      editFrame.src = 'imgs/editHandleOut.png'
    }
  })

  // -- Examples
  examplesTitle.addEventListener('click', function (e) {
    setElementHeight(examples, 'auto')
    examples.style.display = 'inline'
  // setElementHeight(options, 0)
  // options.style.display = 'none'
  })

  function onLoadExampleClicked (e) {
    if (showEditor) { // FIXME test for the element
      editor.style.display = 'inline'
    } else {
      editor.style.display = 'none'
    }
    const examplePath = e.currentTarget.dataset.path
    fetchExample(examplePath, undefined, {gMemFs, gProcessor, gEditor})
  }
  var list = examples.querySelectorAll('.example')
  for (var i = 0; i < list.length; i++) {
      list[i].addEventListener('click', onLoadExampleClicked)
  }

  // -- Options
    // FIXME: these don't exist ??? where are options handled in the first place ?
    /*optionsTitle.addEventListener('click', function (e) {
      setElementHeight(options, 'auto')
      editor.style.display = 'inline'
      setElementHeight(examples, '0px')
      editor.style.display = 'none'
    })

    options.addEventListener('mouseleave', function (e) {
      setElementHeight(options, 0)
      options.style.display = 'none'
    })

    optionsForm.addEventListener('change', saveOptions())
    plate.addEventListener('change', function () {
      if (plate.value === 'custom') {
        plate.style.display = 'inline'
      } else {
        plate.style.display = 'none'
      }
    })*/

  // about/ licence section
  addEventListenerList(document.getElementsByClassName('navlink about'), 'click', function () {
    about.style.display = 'inline'
    return false
  })

  document.querySelector('.okButton').addEventListener('click', function () {
    about.style.display = 'none'
    return false
  })

  // dropzone section
  const dropZoneText = browser === 'chrome' && me === 'web-online' ? ', or folder with jscad files ' : ''
  document.getElementById('filedropzone_empty')
    .innerHTML =
    `Drop one or more supported files
       ${dropZoneText}
       here (see <a style='font-weight: normal' href='https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#Maintaining_Larger_Projects' target=_blank>details</a>)
       <br>or directly edit OpenJSCAD or OpenSCAD code using the editor.`

  document.getElementById('reloadAllFiles').onclick = reloadAllFiles
  document.getElementById('autoreload').onclick = function (e) {
    const toggle = document.getElementById('autoreload').checked
    toggleAutoReload(toggle)
  }

  // version number displays
  const footerContent = `OpenJSCAD.org ${version}, MIT License, get your own copy/clone/fork from <a target=_blank href="https://github.com/Spiritdude/OpenJSCAD.org">GitHub: OpenJSCAD</a>`
  document.getElementById('footer').innerHTML = footerContent

  const versionText = `Version ${version}`
  document.getElementById('menuVersion').innerHTML = versionText
  document.getElementById('aboutVersion').innerHTML = versionText
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})
