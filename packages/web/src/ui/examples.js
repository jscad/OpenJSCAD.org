const { createConversionWorker } = require('../io/createConversionWorker')
const { putSourceInEditor } = require('./editor') // FIXME : eeek! dependency on ui
const version = require('../../package.json').version

const examples = [
  { file: 'logo.jscad', title: 'OpenJSCAD.org Logo' },
  { file: 'logo.amf', title: 'OpenJSCAD.org Logo', type: 'AMF' },

  { file: 'example001.jscad', title: 'Sphere with cutouts', spacing: true },
  { file: 'example001.scad', title: 'Sphere with cutouts', type: 'OpenSCAD' },
  { file: 'example002.jscad', title: 'Cone with cutouts' },
  { file: 'example002.scad', title: 'Cone with cutouts', type: 'OpenSCAD' },
  { file: 'example003.jscad', title: 'Cube with cutouts' },
  { file: 'example003.scad', title: 'Cube with cutouts', type: 'OpenSCAD' },
  // { file:'example004.jscad', title: 'Cube minus sphere' },
  { file: 'example005.jscad', title: 'Pavillon' },

  // { file:'cnc-cutout.jscad', title: 'CNC Corner Cutouts', new: true, spacing: true },

  // { file:'bunch-cubes.jscad', title: 'Bunch of Cubes', new: true },
  { file: 'transformations.jscad', title: 'Transformations', spacing: true },
  { file: 'lookup.jscad', title: 'Lookup()'},
  { file: 'expand.jscad', title: 'Expand()' },
  { file: 'rectangular_extrude.jscad', title: 'Rectangular_extrude()' },
  { file: 'linear_extrude.jscad', title: 'Linear_extrude()' },
  { file: 'rotate_extrude.jscad', title: 'Rotate_extrude()' },
  { file: 'polyhedron.jscad', title: 'Polyhedron()' },
  { file: 'hull.jscad', title: 'Hull()' },
  { file: 'chain_hull.jscad', title: 'Chain_hull()' },
  { file: 'torus.jscad', title: 'Torus()' },

  { file: 'text.jscad', title: 'Vector_text()', spacing: true },

  { file: 'transparency.jscad', title: 'Transparency', spacing: true },
  { file: 'transparency.amf', title: 'Transparency', type: 'AMF' },
  { file: 'transparency2.jscad', title: 'Transparency 2' },

  { file: 'slices/double-screw.jscad', title: 'SolidFromSlices(): Double Screw', spacing: true },
  { file: 'slices/four2three.jscad', title: 'SolidFromSlices(): 4 to 3' },
  { file: 'slices/four2three-round.jscad', title: 'SolidFromSlices(): 4 to 3 round' },
  { file: 'slices/spring.jscad', title: 'SolidFromSlices(): Spring' },
  { file: 'slices/tor.jscad', title: 'SolidFromSlices(): Tor (multi-color)' },
  { file: 'slices/rose.jscad', title: 'SolidFromSlices(): Rose Curve' },

  { file: 'servo.jscad', title: 'Interactive Params: Servo Motor', wrap: true },
  { file: 'gear.jscad', title: 'Interactive Params: Gear' },
  { file: 's-hook.jscad', title: 'Interactive Params: S Hook' },
  { file: 'grille.jscad', title: 'Interactive Params: Grille' },
  { file: 'axis-coupler.jscad', title: 'Interactive Params: Axis Coupler' },
  { file: 'lamp-shade.jscad', title: 'Interactive Params: Lamp Shade' },
  { file: 'celtic-knot-ring.jscad', title: 'Interactive Params: Celtic Knot Ring' },
  { file: 'stepper-motor.jscad', title: 'Interactive Params: Stepper Motor' },
  { file: 'iphone4-case.jscad', title: 'Interactive Params: iPhone4 Case' },
  { file: 'name_plate.jscad', title: 'Interactive Params: Name Plate' },
  { file: 'balloons.jscad', title: 'Interactive Params: Balloons' },

  { file: 'globe.jscad', title: 'Include(): Globe', spacing: true },
  { file: 'platonics/', title: 'Recursive Include(): Platonics' },

  { file: 'babypanda2.svg', title: 'SVG Image: Baby Panda', spacing: true},

  { file: '3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
  { file: 'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },
  { file: 'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },
  { file: 'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' },
  { file: 'feathers_mcgraw.stl', title: '3D Model: Feathers Mcgraw (q1g0ng)', type: 'STL'}
]

function createExamples (me) {
  if (me === 'web-online') {
    var wrap = 26
    var colp = 100 / Math.floor(examples.length / wrap + 1) + '%'
    var src = '<table width=100%><tr><td widthx=' + colp + ' valign=top>'
    for (var i = 0; i < examples.length; i++) {
      if (examples[i].wrap) {
        src += '</td><td class="examplesSeparator" widthx=' + colp + ' valign=top>'
      }
      if (examples[i].spacing) src += '<p/>'
      src += `<li><a class='example' data-path=${'examples/' + examples[i].file} href='#'> + ${examples[i].title} </a>
`
      if (examples[i].type) src += ' <span class=type>(' + examples[i].type + ')</span></a>'
      if (examples[i].new) src += ' <span class=newExample>new</span></a>'
    }
    src += '</td></tr></table>'
    document.querySelector('#examples').innerHTML = src
  } else {
    // examples off-line won't work yet as XHR is used
    document.querySelector('#examples').innerHTML = "You are offline, drag'n'drop the examples from your installation"
  }
}

function fetchExample (filename, url, {memFs, gProcessor, gEditor}) {
  memFs = []
  const hasExtension = filename.match(/\.[^\/]+$/)
  if (!hasExtension) // -- has no extension, ie folder referenced
  {
    if (!filename.match(/\/$/)) {
      filename += '/' // add tailing /
    }
    filename += 'main.jscad'
  }

  // FIXME: same as in drag-drop !!
  function onConversionDone (data) {
    if ('filename' in data && 'source' in data) {
      // console.log("editor"+data.source+']')
      putSourceInEditor(gEditor, data.source, data.filename)
    }
    if ('filename' in data && 'converted' in data) {
      // console.log("processor: "+data.filename+" ["+data.converted+']')
      if ('cache' in data && data.cache === true) {
        // FIXME: cannot do it from here, bloody globals
        // saveScript(data.filename, data.converted)
      }
      gProcessor.setJsCad(data.converted, data.filename, data.baseurl)
    }
  }

  if (1) { // doesn't work off-line yet
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url || filename, true)
    if (filename.match(/\.(stl|gcode)$/i)) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined') // our pseudo binary retrieval (works with Chrome)
    }
    gProcessor.setStatus('loading', filename)
    xhr.onload = function () {
      const source = this.responseText
      const baseurl = url ? url.replace(/\/[^\/]+$/, '/') : gProcessor.baseurl
      filename = url ? url.replace(/^.+\//, '') : filename

      // FIXME: refactor : same code as ui/drag-drop
      gProcessor.setStatus('converting', filename)
      const worker = createConversionWorker(onConversionDone)
      // NOTE: cache: false is set to allow evaluation of 'include' statements
      worker.postMessage({version, baseurl, source, filename, cache: false})
    }
    xhr.send()
  }
}

const url = require('url')

function fetchUriParams (uri, paramName, defaultValue = undefined) {
  let params = url.parse(uri, true)
  let result = params.query
  if (paramName in result) return result[paramName]
  return defaultValue
}

// helper function to retrieve the nth element of an array
function nth (index, data) {
  if (!data) {
    return undefined
  }
  if (data.length < index) {
    return undefined
  }
  return data[index]
}

function loadViaProxy (url, {memFs, gProcessor, gEditor, proxyUrl}) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', proxyUrl + url, true)
  if (url.match(/\.(stl|gcode)$/i)) {
    xhr.overrideMimeType('text/plain; charset=x-user-defined') // our pseudo binary retrieval (works with Chrome)
  }
  gProcessor.setStatus('loading', url)
  xhr.onload = function () {
    const data = JSON.parse(this.responseText)
    const baseUrl = location.protocol + '//' + location.host + location.pathname
    const url = `${baseUrl}/${data.file}`
    fetchExample(data.file, url, {memFs, gProcessor, gEditor})
    // document.location = docUrl.replace(/#.*$/, '#') // this won't reload the entire web-page
  }
  xhr.send()
}

function loadInitialExample (me, params) {
  if (me === 'web-online') {
    const url = location.href

    // const proxyPath = fetchUriParams(url, 'proxyPath', undefined)
    const useProxy = params.proxyUrl !== undefined || document.URL.match(/#(https?:\/\/\S+)$/) !== null
    const documentUri = fetchUriParams(url, 'uri', undefined) || nth(1, document.URL.match(/#(https?:\/\/\S+)$/)) || nth(1, document.URL.match(/#(examples\/\S+)$/))
    const baseUrl = location.protocol + '//' + location.host + location.pathname

    const isRemote = documentUri ? documentUri.match(/(https?:\/\/\S+)$/) !== null : false
    const isLocal = documentUri ? documentUri.match(/(examples\/\S+)$/) !== null : false
    const isInLocalStorage = localStorage.editorContent && localStorage.editorContent.length

    // console.log('useProxy', useProxy, 'documentUri', documentUri, 'baseUrl', baseUrl)
    // console.log('isRemote', isRemote, 'isLocal', isLocal)

    function loadLocalStorage (content, {gProcessor, gEditor}) {
      // load content from local storage if found
      if (content && content.length) {
        putSourceInEditor(gEditor, content, 'MyDesign.jscad')
        gProcessor.setJsCad(content, 'MyDesign.jscad')
      } else {
        // gProcessor.setJsCad(getSourceFromEditor(), 'example.jscad')
      }
    }

    function loadLocal (filename, {memFs, gProcessor, gEditor}) {
      // console.log('loadLocal')
      fetchExample(filename, undefined, {memFs, gProcessor, gEditor})
      // document.location = docUrl.replace(/#.*$/, '#')
    }

    function loadRemote (url, {memFs, gProcessor, gEditor, proxyUrl}) {
      // console.log('loadRemote', url)
      gProcessor.setStatus('loading', url)
      if (useProxy) {
        loadViaProxy(url, {memFs, gProcessor, gEditor, proxyUrl})
      } else {
        fetchExample(url.replace(/^.+\//, ''), url, {memFs, gProcessor, gEditor})
      }
      // document.location = baseUrl// docUrl.replace(/#.*$/, '#') // this won't reload the entire web-page
    }

    if (isRemote) // remote file referenced, e.g. http://openjscad.org/#http://somewhere/something.ext
    {
      loadRemote(documentUri, params)
    } else if (isLocal) { // local example, e.g. http://openjscad.org/#examples/example001.jscad
      loadLocal(documentUri, params)
    } else if (isInLocalStorage) {
      loadLocalStorage(localStorage.editorContent, params)
    } else {
      fetchExample('examples/' + examples[0].file, undefined, params)
    }
  }
}

module.exports = {
  createExamples,
  fetchExample,
  loadInitialExample
}
