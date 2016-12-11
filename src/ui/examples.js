import $ from 'jquery'

const ex = [
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
  { file: 'lookup.jscad', title: 'Lookup()', spacing: true },
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

  { file: 'babypanda2.svg', title: 'SVG Image: Baby Panda', spacing: true, new: true },

  { file: '3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
  { file: 'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },
  { file: 'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },
  { file: 'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' },
  { file: 'feathers_mcgraw.stl', title: '3D Model: Feathers Mcgraw (q1g0ng)', type: 'STL', new: true },
]

export function createExamples (me, fetchExampleParams) {
  if (me === 'web-online') {
    var wrap = 26
    var colp = 100 / Math.floor(ex.length / wrap + 1) + '%'
    var src = '<table width=100%><tr><td widthx=' + colp + ' valign=top>'
    for (var i = 0; i < ex.length; i++) {
      if (ex[i].wrap) {
        src += '</td><td class="examplesSeparator" widthx=' + colp + ' valign=top>'
      }
      if (ex[i].spacing) src += '<p/>'
      //src += '<li><a href=\'#\' onclick=\'fetchExample("examples/' + ex[i].file + '"); return false;\'>' + ex[i].title + '</a>\n'
        src += `<li><a class='example' data-path=${'examples/' + ex[i].file} href='#'> + ${ex[i].title} </a>\n`
      if (ex[i].type) src += ' <span class=type>(' + ex[i].type + ')</span></a>'
      if (ex[i].new) src += ' <span class=newExample>new</span></a>'
    }
    src += '</td></tr></table>'
    $('#examples').html(src)

    $('.example').click(function (e) {
      //console.log('example clicked',)
      const examplePath = e.currentTarget.dataset.path
      fetchExample(examplePath, undefined, fetchExampleParams)
    })
  } else {
    // examples off-line won't work yet as XHR is used
    $('#examples').html("You are offline, drag'n'drop the examples from your installation")
  }
}

export function fetchExample (filename, url, {gMemFs, showEditor, gProcessor}) {
  console.log('fetchExample')
  gMemFs = []

  if (showEditor) { // FIXME test for the element
    $('#editor').show()
  } else {
    $('#editor').hide()
  }

  if (filename.match(/\.[^\/]+$/)) { // -- has extension
    // -- we could already check if valid extension (later)
  } else { // -- folder referenced
    if (!filename.match(/\/$/))
      filename += '/' // add tailing /
    filename += 'main.jscad'
  }

  if (1) { // doesn't work off-line yet
    var xhr = new XMLHttpRequest()
    xhr.open('GET', filename, true)
    if (filename.match(/\.(stl|gcode)$/i)) {
      xhr.overrideMimeType('text/plain; charset=x-user-defined') // our pseudo binary retrieval (works with Chrome)
    }
    gProcessor.setStatus('Loading ' + filename + " <img id=busy src='imgs/busy.gif'>")

    xhr.onload = function () {
      var source = this.responseText
      var editorSource = source
      var path = filename

      const _includePath = path.replace(/\/[^\/]+$/, '/')

      //FIXME: refactor : same code as ui/drag-drop
      gProcessor.setStatus('Converting ' + filename + " <img id=busy src='imgs/busy.gif'>")
      const worker = OpenJsCad.createConversionWorker()
      const baseurl = gProcessor.baseurl
      // NOTE: cache: false is set to allow evaluation of 'include' statements
      worker.postMessage({baseurl, source, filename, cache: false})
    }
    xhr.send()
  }
}


function loadExample (me) {
  if (me === 'web-online') { // we are online, fetch first example
    params = {}
    docTitle = ''
    if ((!docUrl.match(/#(https?:\/\/\S+)$/)) && (!docUrl.match(/#(examples\/\S+)$/))) {
      if (possibleParams = docUrl.split('&')) {
        // console.log(possibleParams)
        for (i = 0; i < possibleParams.length; ++i) {
          // console.log("looping over: "+possibleParams[i])
          if (match = possibleParams[i].match(/^.*#?param\[([^\]]+)\]=(.*)$/i)) {
            // console.log("matched parameter: key="+decodeURIComponent(match[1])+", val="+decodeURIComponent(match[2])+"")
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2])
          }
          else if (match = possibleParams[i].match(/^.*#?showEditor=false$/i)) {
            // console.log("not showing editor.")
            showEditor = false
            $('#editor').hide()
          }
          else if (match = possibleParams[i].match(/^.*#?fetchUrl=(.*)$/i)) {
            // console.log("matched fetchUrl="+match[1])
            urlParts = document.URL.match(/^([^#]+)#/)
            // derive an old-style URL for compatibility's sake
            docUrl = urlParts[1] + '#' + decodeURIComponent(match[1])
          }
          else if (match = possibleParams[i].match(/^.*#?title=(.*)$/i)) {
            // console.log("matched title="+decodeURIComponent(match[1]))
            docTitle = decodeURIComponent(match[1])
          }
        }
      // console.log(params,docUrl,docTitle)
      }
    }
    if (docUrl.match(/#(https?:\/\/\S+)$/)) { // remote file referenced, e.g. http://openjscad.org/#http://somewhere/something.ext
      var u = RegExp.$1
      var xhr = new XMLHttpRequest()
      xhr.open('GET', remoteUrl + u, true)
      if (u.match(/\.(stl|gcode)$/i)) {
        xhr.overrideMimeType('text/plain; charset=x-user-defined'); // our pseudo binary retrieval (works with Chrome)
      }
      gProcessor.setStatus('Fetching ' + u + " <img id=busy src='imgs/busy.gif'>")
      xhr.onload = function () {
        var data = JSON.parse(this.responseText)
        fetchExample(data.file, data.url)
        document.location = docUrl.replace(/#.*$/, '#'); // this won't reload the entire web-page
      }
      xhr.send()
    }
    else if (docUrl.match(/#(examples\/\S+)$/)) { // local example, e.g. http://openjscad.org/#examples/example001.jscad
      var filename = RegExp.$1
      fetchExample(filename)
      document.location = docUrl.replace(/#.*$/, '#')
    } else {
      // load content from local storage if found
      if (localStorage.editorContent && localStorage.editorContent.length) {
        putSourceInEditor(localStorage.editorContent, 'MyDesign.jscad')
        gProcessor.setJsCad(localStorage.editorContent, 'MyDesign.jscad')
      } else {
        fetchExample('examples/' + ex[0].file)
      }
    }
  } else {
    // load content from local storage if found
    if (localStorage.editorContent && localStorage.editorContent.length) {
      putSourceInEditor(localStorage.editorContent, 'MyDesign.jscad')
      gProcessor.setJsCad(localStorage.editorContent, 'MyDesign.jscad')
    } else {
      gProcessor.setJsCad(getSourceFromEditor(), 'example.jscad')
    }
  }
}
