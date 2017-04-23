// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
import { setUpEditor } from './editor'

import { detectBrowser } from './detectBrowser'
import { getUrlParams } from './urlHelpers'
import { appendExampleList, fetchExample, loadInitialExample } from './examples'

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
  getUrlParams(document.URL)

  gProcessor = new Processor(document.getElementById('viewerContext'))
  gEditor = setUpEditor(undefined, gProcessor)
  // FIXME: temporary hack

  let menu = document.getElementById('menu');
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
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})
