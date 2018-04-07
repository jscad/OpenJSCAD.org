// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
const { setUpEditor } = require('./editor')
const { setupDragDrop } = require('./dragDrop/ui-drag-drop') // toggleAutoReload

const { detectBrowser } = require('./detectBrowser')
const { getUrlParams } = require('./urlHelpers')
const { createExamples, fetchExample, loadInitialExample } = require('./examples')
const { createOptions, getOptions } = require('./options')
const AlertUserOfUncaughtExceptions = require('./errorDispatcher')

const version = require('../../package.json').version
const Processor = require('../jscad/processor')

const me = document.location.toString().match(/^file:/) ? 'web-offline' : 'web-online'
const browser = detectBrowser()

const showEditor = true
const proxyUrl = './remote.pl?url='
// const proxyUrl = './remote.php?url='

var gProcessor = null
var gEditor = null

var memFs = [] // associated array, contains file content in source memFs[i].{name,source}
var currentFiles = [] // linear array, contains files (to read)

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

// major DIVs expected
  let about = document.getElementById('about');
  let header = document.getElementById('header');
  let menu = document.getElementById('menu');
  let tail = document.getElementById('tail');
  let footer = document.getElementById('footer');
  let editFrame = document.getElementById('editFrame');

  //createOptions()
  //getOptions()

  let options = document.getElementById('options')
  let optionsTitle = document.getElementById('optionsTitle')
  let plate = document.getElementById('plate')

  window.addEventListener('resize', function () {
  // adjust the relevant divs
    if (menu) {
      setElementHeight(menu, window.innerHeight + 'px')
      menuHandle.style.top = '45%'
    }
    if (editFrame) {
      setElementHeight(editFrame, window.innerHeight + 'px')
    }
  })

  if (menu) {
    const versionText = `Version ${version}`
    document.getElementById('menuVersion').innerHTML = versionText

    let initialMenuHidingTimeoutID = setTimeout(function () {
      initialMenuHidingTimeoutID = null
      menu.style.left = '-280px'
      menuHandle.src = 'imgs/menuHandleVLOut.png'
      if (examples) {
        setElementHeight(examples, '0px')
        examples.style.display = 'none'
      }
    }, 3000) // -- hide slide-menu after 3secs

    let examples = document.getElementById('examples');
    if (examples) {
      createExamples(me)
      loadInitialExample(me, {memFs, gProcessor, gEditor, proxyUrl})

      // -- Examples
      examplesTitle.addEventListener('click', function (e) {
        if (initialMenuHidingTimeoutID !== null) {
          clearTimeout(initialMenuHidingTimeoutID)
          initialMenuHidingTimeoutID = null
        }
        // When closed, examples.style.display may be '' or 'none'.
        // When open, it's reliably 'inline', so test against that.
        if (examples.style.display === 'inline') {
          setElementHeight(examples, '0px')
          examples.style.display = 'none'
        } else {
          setElementHeight(examples, 'auto')
          examples.style.display = 'inline'
        }
      })

      function onLoadExampleClicked (e) {
        // Don't need to cancel initial menu-hiding timeout, because in order
        // to get here, user must have clicked on Examples which canceled it
        // already.
        if (showEditor) { // FIXME test for the element
          editor.style.display = 'inline'
        } else {
          editor.style.display = 'none'
        }
        const examplePath = e.currentTarget.dataset.path
        fetchExample(examplePath, undefined, {memFs, gProcessor, gEditor})
      }
      var list = examples.querySelectorAll('.example')
      for (var i = 0; i < list.length; i++) {
          list[i].addEventListener('click', onLoadExampleClicked)
      }
    }

    let menuHandle = document.getElementById('menuHandle')
    menuHandle.addEventListener('click', function (e) {
      if (initialMenuHidingTimeoutID !== null) {
        clearTimeout(initialMenuHidingTimeoutID)
        initialMenuHidingTimeoutID = null
      }
      // When open, left may be '' or '0' or '0px'.  When closed, it's reliably
      // '-280px', so test against that.
      if (menu.style.left === '-280px') {
        // It's closed; open it.
        menu.style.left = '0'
        menuHandle.src = 'imgs/menuHandleVLIn.png'
      } else {
        // It's open; close it, and close Examples with it.
        menu.style.left = '-280px'
        menuHandle.src = 'imgs/menuHandleVLOut.png'
        if (examples) {
          setElementHeight(examples, '0px')
          examples.style.display = 'none'
        }
      }
    })
  }

  if (editFrame) {
    let editHandle = document.getElementById('editHandle')
    editHandle.addEventListener('click', function (e) {
      if (getElementWidth(editFrame) === 0) {
        setElementWidth(editFrame, '40%')
        editHandle.src = 'imgs/editHandleIn.png'
      } else {
        setElementWidth(editFrame, '0px')
        editHandle.src = 'imgs/editHandleOut.png'
      }
    })
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
  if (about) {
    const versionText = `Version ${version}`
    document.getElementById('aboutVersion').innerHTML = versionText

    addEventListenerList(document.getElementsByClassName('navlink about'), 'click', function () {
      about.style.display = 'inline'
      return false
    })

    document.querySelector('.okButton').addEventListener('click', function () {
      about.style.display = 'none'
      return false
    })
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
           here (see <a style='font-weight: normal' href='https://openjscad.org/dokuwiki/doku.php' target=_blank>details</a>)
           <br>or directly edit OpenJSCAD or OpenSCAD code using the editor.`

      let {toggleAutoReload, reloadAllFiles} = setupDragDrop(me, {memFs, gProcessor, gEditor})
      document.getElementById('reloadAllFiles').onclick = reloadAllFiles
      document.getElementById('autoreload').onclick = function (e) {
        const toggle = document.getElementById('autoreload').checked
        toggleAutoReload(toggle)
      }
    }
  }

  // version number displays
  if (footer) {
    const footerContent = `OpenJSCAD.org ${version}, MIT License, get your own copy/clone/fork from <a target=_blank href="https://github.com/jscad/OpenJSCAD.org">GitHub: OpenJSCAD</a>`
    document.getElementById('footer').innerHTML = footerContent
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})
