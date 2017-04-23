// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
import { setUpEditor } from './editor'
import { setupDragDrop } from './dragDrop/ui-drag-drop' // toggleAutoReload

import { detectBrowser } from './detectBrowser'
import { getUrlParams } from './urlHelpers'
import { appendExampleList, fetchExample, loadInitialExample } from './examples'
import AlertUserOfUncaughtExceptions from './errorDispatcher'

import Processor from '../jscad/processor'

const me = document.location.toString().match(/^file:/) ? 'web-offline' : 'web-online'
const browser = detectBrowser()

var showEditor = true
var remoteUrl = './remote.pl?url='
// var remoteUrl = './remote.php?url='
var gProcessor = null
var gEditor = null

var memFs = [] // associated array, contains file content in source memFs[i].{name,source}
var currentFiles = [] // linear array, contains files (to read)

function getElementHeight (element) {
  return parseInt(getComputedStyle(element).height)
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

  let menu = document.getElementById('menu');
  let tail = document.getElementById('tail');

  if (menu) {
    let examples = document.getElementById('examples');
    if (examples) {
      appendExampleList(me)
      loadInitialExample(me, {memFs, gProcessor, gEditor, remoteUrl})

      // -- Examples
      function onLoadExampleClicked (e) {
        const examplePath = e.currentTarget.dataset.path
        fetchExample(examplePath, undefined, {memFs, gProcessor, gEditor})
      }
      var list = examples.querySelectorAll('.example')
      for (var i = 0; i < list.length; i++) {
        list[i].addEventListener('click', onLoadExampleClicked)
      }
    }
  }

  // dropzone section
  if (tail) {
    let dropZone = document.getElementById('filedropzone')
    if (dropZone) {
      const dropZoneText = browser === 'chrome' && me === 'web-online' ? ', or folder with jscad files ' : ''
      document.getElementById('filedropzone_empty')
        .innerHTML =
        `Drop one or more supported files
           ${dropZoneText}
           here (see <a style='font-weight: normal' href='https://en.wikibooks.org/wiki/OpenJSCAD_User_Guide#Maintaining_Larger_Projects' target=_blank>details</a>)
           <br>or directly edit OpenJSCAD or OpenSCAD code using the editor.`

      let {toggleAutoReload, reloadAllFiles} = setupDragDrop(me, {memFs, gProcessor, gEditor})
      document.getElementById('reloadAllFiles').onclick = reloadAllFiles
      document.getElementById('autoreload').onclick = function (e) {
        const toggle = document.getElementById('autoreload').checked
        toggleAutoReload(toggle)
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})
