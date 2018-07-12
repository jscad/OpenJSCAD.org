const log = require('./log')
const getParameterDefinitions = require('@jscad/core/parameters/getParameterDefinitions')
const getParameterValues = require('@jscad/core/parameters/getParameterValuesFromUIControls')
const { rebuildSolids, rebuildSolidsInWorker } = require('@jscad/core/code-evaluation/rebuildSolids')
const { mergeSolids } = require('@jscad/core/utils/mergeSolids')

// output handling
const { generateOutputFile } = require('../io/generateOutputFile')
const { prepareOutput } = require('@jscad/core/io/prepareOutput')
const { convertToBlob } = require('@jscad/core/io/convertToBlob')
const { formats, supportedFormatsForObjects } = require('@jscad/core/io/formats')
const { revokeBlobUrl } = require('../io/utils')

const Viewer = require('../ui/viewer/jscad-viewer')

function Processor (containerdiv, options) {
  if (options === undefined) options = {}
  // the default options
  this.opts = {
    debug: false,
    libraries: [],
    openJsCadPath: '',
    useAsync: true,
    useSync: true,
    viewer: {}
  }
  // apply all options found
  for (var x in this.opts) {
    if (x in options) this.opts[x] = options[x]
  }

  this.containerdiv = containerdiv

  this.viewer = null
  this.builder = null
  this.zoomControl = null

  // callbacks
  this.onchange = null // function(Processor) for callback
  this.ondownload = null // function(Processor) for callback

  this.currentObjects = [] // list of objects returned from rebuildObject*
  this.viewedObject = null // the object being rendered

  this.selectStartPoint = 0
  this.selectEndPoint = 0

  this.hasOutputFile = false
  this.hasError = false
  this.paramDefinitions = []
  this.paramControls = []
  this.script = null
  this.formats = formats

  this.baseurl = document.location.href
  this.baseurl = this.baseurl.replace(/#.*$/, '') // remove remote URL
  this.baseurl = this.baseurl.replace(/\?.*$/, '') // remove parameters
  if (this.baseurl.lastIndexOf('/') !== (this.baseurl.length - 1)) {
    this.baseurl = this.baseurl.substring(0, this.baseurl.lastIndexOf('/') + 1)
  }

  // state of the processor
  // 0 - initialized - no viewer, no parameters, etc
  // 1 - processing  - processing JSCAD script
  // 2 - complete    - completed processing
  // 3 - incomplete  - incompleted due to errors in processing
  this.state = 0 // initialized

  // FIXME: UI only, seperate
  this.createElements()
}

Processor.mergeSolids = mergeSolids

Processor.prototype = {
  createElements: function () {
    var that = this // for event handlers

    while (this.containerdiv.children.length > 0) {
      this.containerdiv.removeChild(0)
    }

    var viewerdiv = document.createElement('div')
    viewerdiv.className = 'viewer'
    viewerdiv.style.width = '100%'
    viewerdiv.style.height = '100%'
    this.containerdiv.appendChild(viewerdiv)
    try {
      this.viewer = new Viewer(viewerdiv, this.opts.viewer)
    } catch (e) {
      viewerdiv.innerHTML = '<b><br><br>Error: ' + e.toString() + '</b><br><br>A browser with support for WebGL is required'
    }
    // Zoom control
    if (0) { // FIXME: what the heck ?
      var div = document.createElement('div')
      this.zoomControl = div.cloneNode(false)
      this.zoomControl.style.width = this.viewerwidth + 'px'
      this.zoomControl.style.height = '20px'
      this.zoomControl.style.backgroundColor = 'transparent'
      this.zoomControl.style.overflowX = 'scroll'
      div.style.width = this.viewerwidth * 11 + 'px'
      div.style.height = '1px'
      this.zoomControl.appendChild(div)
      this.zoomChangedBySlider = false
      this.zoomControl.onscroll = function (event) {
        var zoom = that.zoomControl
        var newzoom = zoom.scrollLeft / (10 * zoom.offsetWidth)
        that.zoomChangedBySlider = true // prevent recursion via onZoomChanged
        that.viewer.setZoom(newzoom)
        that.zoomChangedBySlider = false
      }
      this.viewer.onZoomChanged = function () {
        if (!that.zoomChangedBySlider) {
          var newzoom = that.viewer.getZoom()
          that.zoomControl.scrollLeft = newzoom * (10 * that.zoomControl.offsetWidth)
        }
      }

      this.containerdiv.appendChild(this.zoomControl)
      this.zoomControl.scrollLeft = this.viewer.viewpointZ / this.viewer.camera.clip.max *
        (this.zoomControl.scrollWidth - this.zoomControl.offsetWidth)

    // end of zoom control
    }

    this.selectdiv = this.containerdiv.parentElement.querySelector('div#selectdiv')
    if (!this.selectdiv) {
      this.selectdiv = document.createElement('div')
      this.selectdiv.id = 'selectdiv'
      this.containerdiv.parentElement.appendChild(this.selectdiv)
    }
    var element = document.createElement('input')
    element.setAttribute('type', 'range')
    element.id = 'startRange'
    element.min = 0
    element.max = 100
    element.step = 1
    element.oninput = function (e) {
      if (that.state === 2) {
        that.updateView()
        that.updateFormatsDropdown()
        that.updateDownloadLink()
      }
    }
    this.selectdiv.appendChild(element)
    element = document.createElement('input')
    element.setAttribute('type', 'range')
    element.id = 'endRange'
    element.min = 0
    element.max = 100
    element.step = 1
    element.oninput = function (e) {
      if (that.state === 2) {
        that.updateView()
        that.updateFormatsDropdown()
        that.updateDownloadLink()
      }
    }
    this.selectdiv.appendChild(element)

    this.errordiv = this.containerdiv.parentElement.querySelector('div#errordiv')
    if (!this.errordiv) {
      this.errordiv = document.createElement('div')
      this.errordiv.id = 'errordiv'
      this.containerdiv.parentElement.appendChild(this.errordiv)
    }
    this.errorpre = document.createElement('pre')
    this.errordiv.appendChild(this.errorpre)

    this.statusdiv = this.containerdiv.parentElement.querySelector('div#statusdiv')
    if (!this.statusdiv) {
      this.statusdiv = document.createElement('div')
      this.statusdiv.id = 'statusdiv'
      this.containerdiv.parentElement.appendChild(this.statusdiv)
    }
    this.statusspan = document.createElement('span')
    this.statusspan.id = 'statusspan'
    this.statusbuttons = document.createElement('span')
    this.statusbuttons.id = 'statusbuttons'
    this.statusdiv.appendChild(this.statusspan)
    this.statusdiv.appendChild(this.statusbuttons)
    this.abortbutton = document.createElement('button')
    this.abortbutton.innerHTML = 'Abort'
    this.abortbutton.onclick = function (e) {
      that.abort()
    }
    this.statusbuttons.appendChild(this.abortbutton)
    this.formatDropdown = document.createElement('select')
    this.formatDropdown.onchange = function (e) {
      that.currentFormat = that.formatDropdown.options[that.formatDropdown.selectedIndex].value
      that.updateDownloadLink()
    }
    this.statusbuttons.appendChild(this.formatDropdown)
    this.generateOutputFileButton = document.createElement('button')
    this.generateOutputFileButton.onclick = function (e) {
      that.generateOutputFile()
    }
    this.statusbuttons.appendChild(this.generateOutputFileButton)
    this.downloadOutputFileLink = document.createElement('a')
    this.downloadOutputFileLink.className = 'downloadOutputFileLink' // so we can css it
    this.statusbuttons.appendChild(this.downloadOutputFileLink)

    this.parametersdiv = this.containerdiv.parentElement.querySelector('div#parametersdiv')
    if (!this.parametersdiv) {
      this.parametersdiv = document.createElement('div')
      this.parametersdiv.id = 'parametersdiv'
      this.containerdiv.parentElement.appendChild(this.parametersdiv)
    }
    this.parameterstable = document.createElement('table')
    this.parameterstable.className = 'parameterstable'
    this.parametersdiv.appendChild(this.parameterstable)

    element = this.parametersdiv.querySelector('button#updateButton')
    if (element === null) {
      element = document.createElement('button')
      element.innerHTML = 'Update'
      element.id = 'updateButton'
    }
    element.onclick = function (e) {
      that.rebuildSolids()
    }
    this.parametersdiv.appendChild(element)

    // implementing instantUpdate
    var instantUpdateCheckbox = document.createElement('input')
    instantUpdateCheckbox.type = 'checkbox'
    instantUpdateCheckbox.id = 'instantUpdate'
    this.parametersdiv.appendChild(instantUpdateCheckbox)

    element = document.getElementById('instantUpdateLabel')
    if (element === null) {
      element = document.createElement('label')
      element.innerHTML = 'Instant Update'
      element.id = 'instantUpdateLabel'
    }
    element.setAttribute('for', instantUpdateCheckbox.id)
    this.parametersdiv.appendChild(element)

    this.enableItems()
    this.clearViewer()
  },

  setCurrentObjects: function (objs) {
    this.currentObjects = objs // list of CAG or CSG objects

    this.updateSelection()
    this.selectStartPoint = -1 // force view update
    this.updateView()
    this.updateFormatsDropdown()
    this.updateDownloadLink()

    if (this.onchange) this.onchange(this)
  },

  selectedFormat: function () {
    return this.formatDropdown.options[this.formatDropdown.selectedIndex].value
  },

  selectedFormatInfo: function () {
    return this.formatInfo(this.selectedFormat())
  },

  updateDownloadLink: function () {
    var info = this.selectedFormatInfo()
    var ext = info.extension
    this.generateOutputFileButton.innerHTML = 'Generate ' + ext.toUpperCase()
  },

  updateSelection: function () {
    var range = document.getElementById('startRange')
    range.min = 0
    range.max = this.currentObjects.length - 1
    range.value = 0
    range = document.getElementById('endRange')
    range.min = 0
    range.max = this.currentObjects.length - 1
    range.value = this.currentObjects.length - 1
  },

  updateView: function () {
    var startpoint = parseInt(document.getElementById('startRange').value, 10)
    var endpoint = parseInt(document.getElementById('endRange').value, 10)
    if (startpoint === this.selectStartPoint && endpoint === this.selectEndPoint) { return }

    // build a list of objects to view
    this.selectStartPoint = startpoint
    this.selectEndPoint = endpoint
    if (startpoint > endpoint) { startpoint = this.selectEndPoint; endpoint = this.selectStartPoint }

    var objs = this.currentObjects.slice(startpoint, endpoint + 1)
    this.viewedObject = mergeSolids(objs)

    if (this.viewer) {
      this.viewer.setCsg(this.viewedObject)
    }
  },

  updateFormatsDropdown: function () {
    while (this.formatDropdown.options.length > 0) {
      this.formatDropdown.options.remove(0)
    }

    var that = this
    var startpoint = this.selectStartPoint
    var endpoint = this.selectEndPoint
    if (startpoint > endpoint) { startpoint = this.selectEndPoint; endpoint = this.selectStartPoint }
    const objects = this.currentObjects.slice(startpoint, endpoint + 1)

    this.formatInfo('stla') // make sure the formats are initialized
    const formats = supportedFormatsForObjects(objects)
      .filter(x => x !== 'stl')// exclude 'stl' since it is an alias for stl(ascii) or stl(binary)
    formats.forEach(function (format) {
      var option = document.createElement('option')
      var info = that.formatInfo(format)
      option.setAttribute('value', format)
      option.appendChild(document.createTextNode(info.displayName))
      that.formatDropdown.options.add(option)
    })
  },

  clearViewer: function () {
    this.clearOutputFile()
    if (this.viewedObject) {
      this.viewer.clear()
      this.viewedObject = null
      if (this.onchange) this.onchange(this)
    }
    this.enableItems()
  },

  abort: function () {
    // abort if state is processing
    if (this.state === 1) {
      // todo: abort
      this.setStatus('aborted')
      this.builder.cancel()
      this.state = 3 // incomplete
      this.enableItems()
      if (this.onchange) this.onchange(this)
    }
  },

  enableItems: function () {
    this.abortbutton.style.display = (this.state === 1) ? 'inline' : 'none'
    this.formatDropdown.style.display = ((!this.hasOutputFile) && (this.viewedObject)) ? 'inline' : 'none'
    this.generateOutputFileButton.style.display = ((!this.hasOutputFile) && (this.viewedObject)) ? 'inline' : 'none'
    this.downloadOutputFileLink.style.display = this.hasOutputFile ? 'inline' : 'none'
    this.parametersdiv.style.display = (this.paramControls.length > 0) ? 'inline-block' : 'none' // was 'block'
    this.errordiv.style.display = this.hasError ? 'block' : 'none'
    this.statusdiv.style.display = this.hasError ? 'none' : 'block'
    this.selectdiv.style.display = (this.currentObjects.length > 1) ? 'none' : 'none' // FIXME once there's a data model
  },

  setMemfs: function (memFs) {
    this.memFs = memFs
  },

  setDebugging: function (debugging) {
    this.opts.debug = debugging
  },

  addLibrary: function (lib) {
    this.opts['libraries'].push(lib)
  },

  setOpenJsCadPath: function (path) {
    this.opts['openJsCadPath'] = path
  },

  setError: function (txt) {
    this.hasError = (txt != '')
    this.errorpre.textContent = txt
    this.enableItems()
  },

  // set status and data to display
  setStatus: function (status, data) {
    if (typeof document !== 'undefined') {
      const statusMap = {
        error: data,
        ready: 'Ready',
        aborted: 'Aborted.',
        busy: `${data} <img id=busy src='imgs/busy.gif'>`,
        loading: `Loading ${data} <img id=busy src='imgs/busy.gif'>`,
        loaded: data,
        saving: data,
        saved: data,
        converting: `Converting ${data} <img id=busy src='imgs/busy.gif'>`,
        fetching: `Fetching ${data} <img id=busy src='imgs/busy.gif'>`,
        rendering: `Rendering. Please wait <img id=busy src='imgs/busy.gif'>`
      }
      const content = statusMap[status] ? statusMap[status] : data
      if (status === 'error') {
        this.setError(data)
      }

      this.statusspan.innerHTML = content
    } else {
      log(data)
    }
  },

  // script: javascript code
  // filename: optional, the name of the .jscad file
  setJsCad: function (script, filename, includePathBaseUrl) {
    // console.log('setJsCad', script, filename)
    if (!filename) filename = 'openjscad.jscad'

    var prevParamValues = {}
    // this will fail without existing form
    try {
      prevParamValues = getParameterValues(this.paramControls, /* onlyChanged */true)
    } catch (e) {}

    this.abort()
    this.paramDefinitions = []

    this.script = null
    this.setError('')

    var scripthaserrors = false
    try {
      this.paramDefinitions = getParameterDefinitions(script)
      this.paramControls = []
      this.createParamControls(prevParamValues)
    } catch (e) {
      this.setStatus('error', e.toString())
      scripthaserrors = true
    }
    if (!scripthaserrors) {
      this.script = script
      this.filename = filename
      this.includePathBaseUrl = includePathBaseUrl
      this.rebuildSolids()
    } else {
      this.enableItems()
    }
  },

  // FIXME: not needed anymore, file cache is handled elsewhere
  getFullScript: function () {
    return this.script
    /* var script = ''
    // add the file cache
     script += 'var gMemFs = ['
    if (typeof (this.memFs) === 'object') {
      var comma = ''
      for (var fn in this.memFs) {
        script += comma
        script += JSON.stringify(this.memFs[fn])
        comma = ','
      }
    }
    script += '];\n'
    script += '\n'
    // add the main script
    script += this.script
    return script */
  },

  rebuildSolids: function () {
    // clear previous solid and settings
    this.abort()
    //this clears output file cache
    this.clearOutputFile()
    this.enableItems()
    this.setError('')
    this.enableItems()
    this.setStatus('rendering')

    // rebuild the solid

    // prepare all parameters
    const parameters = getParameterValues(this.paramControls)
    const script = this.getFullScript()
    const fullurl = this.includePathBaseUrl ? this.includePathBaseUrl + this.filename : this.filename
    const options = {memFs: this.memFs}

    this.state = 1 // processing
    let that = this
    function callback (err, objects) {
      if (err) {
        that.clearViewer()

        if (err.stack) {
          let errtxt = ''
          errtxt += '\nStack trace:\n' + err.stack
        //    var errtxt = err.toString()
        }
        that.setStatus('error', err)// 'Error.'
        that.state = 3 // incomplete

      } else {
        that.setCurrentObjects(objects)
        that.setStatus('ready')
        that.state = 2 // complete
      }
      that.enableItems()
    }

    if (this.opts.useAsync) {
      this.builder = rebuildSolidsInWorker(script, fullurl, parameters, (err, objects) => {
        if (err && that.opts.useSync) {
          this.builder = rebuildSolids(script, fullurl, parameters, callback, options)
        } else (callback(undefined, objects))
      }, options)
    } else if (this.opts.useSync) {
      this.builder = rebuildSolids(script, fullurl, parameters, callback, options)
    }
  },

  getState: function () {
    return this.state
  },

  clearOutputFile: function () {
    if (this.hasOutputFile) {
      this.hasOutputFile = false
      if (this.outputFileDirEntry) {
        this.outputFileDirEntry.removeRecursively(function () {})
        this.outputFileDirEntry = null
      }
      if (this.outputFileBlobUrl) {
        revokeBlobUrl(this.outputFileBlobUrl)
        this.outputFileBlobUrl = null
      }
      this.enableItems()
    }
  },

  generateOutputFile: function () {
    this.clearOutputFile()
    const blob = this.currentObjectsToBlob()
    const extension = this.selectedFormatInfo().extension

    function onDone (data, downloadAttribute, blobMode, noData) {
      this.hasOutputFile = true
      this.downloadOutputFileLink.href = data
      if (blobMode) {
        this.outputFileBlobUrl = data
      } else {
        // FIXME: what to do with this one ?
        // that.outputFileDirEntry = dirEntry // save for later removal
      }
      this.downloadOutputFileLink.innerHTML = this.downloadLinkTextForCurrentObject()
      this.downloadOutputFileLink.setAttribute('download', downloadAttribute)
      if (noData) {
        this.downloadOutputFileLink.setAttribute('target', '_blank')
      }
      this.enableItems()
    }

    if (this.viewedObject) {
      generateOutputFile(extension, blob, onDone, this)
      if (this.ondownload) this.ondownload(this)
    }
  },

  currentObjectsToBlob: function () {
    var startpoint = this.selectStartPoint
    var endpoint = this.selectEndPoint
    if (startpoint > endpoint) { startpoint = this.selectEndPoint; endpoint = this.selectStartPoint }

    const format = this.selectedFormat()

    // if output format is jscad or js , use that, otherwise use currentObjects
    const objects = (format === 'jscad' || format === 'js') ? this.script : this.currentObjects.slice(startpoint, endpoint + 1)

    return convertToBlob(prepareOutput(objects, {format}))
  },

  formatInfo: function (format) {
    return this.formats[format]
  },

  downloadLinkTextForCurrentObject: function () {
    var ext = this.selectedFormatInfo().extension
    return 'Download ' + ext.toUpperCase()
  },

  createGroupControl: function (definition) {
    var control = document.createElement('title')
    control.paramName = definition.name
    control.paramType = definition.type
    if ('caption' in definition) {
      control.text = definition.caption
      control.className = 'caption'
    } else {
      control.text = definition.name
    }
    return control
  },

  createChoiceControl: function (definition, prevValue) {
    if (!('values' in definition)) {
      throw new Error('Definition of choice parameter (' + definition.name + ") should include a 'values' parameter")
    }
    var control = document.createElement('select')
    control.paramName = definition.name
    control.paramType = definition.type
    var values = definition.values
    var captions
    if ('captions' in definition) {
      captions = definition.captions
      if (captions.length != values.length) {
        throw new Error('Definition of choice parameter (' + definition.name + ") should have the same number of items for 'captions' and 'values'")
      }
    } else {
      captions = values
    }
    var selectedindex = 0
    for (var valueindex = 0; valueindex < values.length; valueindex++) {
      var option = document.createElement('option')
      option.value = values[valueindex]
      option.text = captions[valueindex]
      control.add(option)
      if (prevValue !== undefined) {
        if (prevValue === values[valueindex]) {
          selectedindex = valueindex
        }
      } else if ('default' in definition) {
        if (definition['default'] === values[valueindex]) {
          selectedindex = valueindex
        }
      } else if ('initial' in definition) {
        if (definition.initial === values[valueindex]) {
          selectedindex = valueindex
        }
      }
    }
    if (values.length > 0) {
      control.selectedIndex = selectedindex
    }
    return control
  },

  createControl: function (definition, prevValue) {
    var control_list = [
      {type: 'text', control: 'text', required: ['index', 'type', 'name'], initial: ''},
      {type: 'int', control: 'number', required: ['index', 'type', 'name'], initial: 0},
      {type: 'float', control: 'number', required: ['index', 'type', 'name'], initial: 0.0},
      {type: 'number', control: 'number', required: ['index', 'type', 'name'], initial: 0.0},
      {type: 'checkbox', control: 'checkbox', required: ['index', 'type', 'name', 'checked'], initial: ''},
      {type: 'radio', control: 'radio', required: ['index', 'type', 'name', 'checked'], initial: ''},
      {type: 'color', control: 'color', required: ['index', 'type', 'name'], initial: '#000000'},
      {type: 'date', control: 'date', required: ['index', 'type', 'name'], initial: ''},
      {type: 'email', control: 'email', required: ['index', 'type', 'name'], initial: ''},
      {type: 'password', control: 'password', required: ['index', 'type', 'name'], initial: ''},
      {type: 'url', control: 'url', required: ['index', 'type', 'name'], initial: ''},
      {type: 'slider', control: 'range', required: ['index', 'type', 'name', 'min', 'max'], initial: 0, label: true}
    ]
    // check for required parameters
    if (!('type' in definition)) {
      throw new Error('Parameter definition (' + definition.index + ") must include a 'type' parameter")
    }
    var control = document.createElement('input')
    var i, j, c_type, p_name
    for (i = 0; i < control_list.length; i++) {
      c_type = control_list[i]
      if (c_type.type === definition.type) {
        for (j = 0; j < c_type.required.length; j++) {
          p_name = c_type.required[j]
          if (p_name in definition) {
            if (p_name === 'index') continue
            if (p_name === 'type') continue
            if (p_name === 'checked') { // setAttribute() only accepts strings
              control.checked = definition.checked
            } else {
              control.setAttribute(p_name, definition[p_name])
            }
          } else {
            throw new Error('Parameter definition (' + definition.index + ") must include a '" + p_name + "' parameter")
          }
        }
        break
      }
    }
    if (i === control_list.length) {
      throw new Error('Parameter definition (' + definition.index + ") is not a valid 'type'")
    }
    // set the control type
    control.setAttribute('type', c_type.control)
    // set name and type for obtaining values
    control.paramName = definition.name
    control.paramType = definition.type
    // determine initial value of control
    if (prevValue !== undefined) {
      control.value = prevValue
    } else if ('initial' in definition) {
      control.value = definition.initial
    } else if ('default' in definition) {
      control.value = definition.default
    } else {
      control.value = c_type.initial
    }
    // set generic HTML attributes
    for (var property in definition) {
      if (definition.hasOwnProperty(property)) {
        if (c_type.required.indexOf(property) < 0) {
          control.setAttribute(property, definition[property])
        }
      }
    }
    // add a label if necessary
    if ('label' in c_type) {
      control.label = document.createElement('label')
      control.label.innerHTML = control.value
    }
    return control
  },

  createParamControls: function (prevParamValues) {
    this.parameterstable.innerHTML = ''
    this.paramControls = []

    for (var i = 0; i < this.paramDefinitions.length; i++) {
      var paramdef = this.paramDefinitions[i]
      paramdef.index = i + 1

      var control = null
      var type = paramdef.type.toLowerCase()
      switch (type) {
        case 'choice':
          control = this.createChoiceControl(paramdef, prevParamValues[paramdef.name])
          break
        case 'group':
          control = this.createGroupControl(paramdef)
          break
        default:
          control = this.createControl(paramdef, prevParamValues[paramdef.name])
          break
      }
      // add the appropriate element to the table
      var tr = document.createElement('tr')
      if (type === 'group') {
        var th = document.createElement('th')
        if ('className' in control) {
          th.className = control.className
        }
        th.innerHTML = control.text
        tr.appendChild(th)
      } else {
        // implementing instantUpdate
        var that = this
        control.onchange = function (e) {
          var l = e.currentTarget.nextElementSibling
          if (l !== null && l.nodeName === 'LABEL') {
            l.innerHTML = e.currentTarget.value
          }
          if (document.getElementById('instantUpdate').checked === true) {
            that.rebuildSolids()
          }
        }
        this.paramControls.push(control)

        var td = document.createElement('td')
        var label = paramdef.name + ':'
        if ('caption' in paramdef) {
          label = paramdef.caption
          td.className = 'caption'
        }
        td.innerHTML = label
        tr.appendChild(td)
        td = document.createElement('td')
        td.appendChild(control)
        if ('label' in control) {
          td.appendChild(control.label)
        }
        tr.appendChild(td)
      }
      this.parameterstable.appendChild(tr)
    }
  }
}

module.exports = Processor
