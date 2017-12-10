const makeCsgViewer = require('../csg-viewer/src/index')
const {cube} = require('@jscad/scad-api').primitives3d
const {color} = require('@jscad/scad-api').color

const viewerOptions = {
  background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
  meshColor: [0.4, 0.6, 0.5, 1],
  gridColor: [1, 1, 1, 0.1],
  singleton: true, // ensures that no matter how many times you call the creator function, you still only get a single instance
  lighting: {
    smooth: true,
  },
  camera: {
    position: [450, 550, 700],
    target: [0, 0, 0],
    limits: {
      maxDistance: 16000,
      minDistance: 0.01
    },
    far: 18000
  },
  controls: {
    zoomToFit: 'all'
  }
}

const initializeData = function () {
  return color([1, 0, 0, 1], cube({size: 100}))
}

let csg = initializeData()
const element = document.getElementById('renderTarget')
const csgViewer = makeCsgViewer(element, viewerOptions)
csgViewer(viewerOptions, {csg})

const fs = require('fs')
const {remote} = require('electron')
const {dialog} = remote

function getParameterDefinitionsCLI (getParameterDefinitions, param) {
  console.log('foo')
  if (typeof getParameterDefinitions !== 'undefined') {
    var p = {}
    var pa = getParameterDefinitions()
    for (var a in pa) { // defaults, given by getParameterDefinitions()
      var x = pa[a]
      if ('default' in x) {
        p[pa[a].name] = pa[a].default
      } else if ('initial' in x) {
        p[pa[a].name] = pa[a].initial
      } else if ('checked' in x) {
        p[pa[a].name] = pa[a].checked
      }
    }
    for (var a in param) { // given by command-line
      p[a] = param[a]
    }
    if (0) {
      for (var a in p) {
        echo('param=', a, p[a])
      }
    }
    return p
  } else {
    return param
  }
}


document.getElementById('fileLoader').addEventListener('click', function () {
  dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}, function (fileNames) {
    console.log('loading', fileNames)
    const jscadScript = require(fileNames[0])
    console.log(jscadScript.getParameterDefinitions)
    let params = {}
    if(jscadScript && 'getParameterDefinitions' in jscadScript){
      console.log('getParamDefinitions provided')
      params = getParameterDefinitionsCLI(jscadScript.getParameterDefinitions())//jscadScript.getParameterDefinitions()
    }

    console.log('script fetched')
    const start = performance.now()
    csg = jscadScript(params)
    const time = ( performance.now() - start) /1000
    console.log(`jscad script executed in ${time} s, putting data into viewer`)
    csgViewer({}, {csg})
  })
})
