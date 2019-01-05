// == OpenJSCAD.org, Copyright (c) 2017, Licensed under MIT License
const AlertUserOfUncaughtExceptions = require('./errorDispatcher')

const version = require('../../package.json').version
const Processor = require('../jscad/processor')

var gProcessor = null

function init () {
  const versionText = 'OpenJSCAD.org Version ' + version
  console.log(versionText)

  // Show all exceptions to the user: // WARNING !! this is not practical at dev time
  AlertUserOfUncaughtExceptions()

  let viewer = document.getElementById('viewerContext')
  let design = viewer.getAttribute('design-url')

  gProcessor = new Processor(viewer)

  // load the given design
  if (design) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', design, true)
    gProcessor.setStatus('Loading ' + design + " <img id=busy src='imgs/busy.gif'>")

    xhr.onload = function () {
      var source = this.responseText
      // console.log(source);

      if (design.match(/\.jscad$/i) || design.match(/\.js$/i)) {
        gProcessor.setStatus('Processing ' + design + " <img id=busy src='imgs/busy.gif'>")
        gProcessor.setJsCad(source, design)
      }
    }
    xhr.send()
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  init()
})
