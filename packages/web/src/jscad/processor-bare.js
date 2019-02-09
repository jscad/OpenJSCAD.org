/**
 * @prettier
 */
// const log = require('./log')
const getParameterDefinitions = require('@jscad/core/parameters/getParameterDefinitions')
const getParameterValues = require('@jscad/core/parameters/getParameterValuesFromUIControls')
const {
  rebuildSolids,
  rebuildSolidsInWorker,
} = require('@jscad/core/code-evaluation/rebuildSolids')
const { mergeSolids } = require('@jscad/core/utils/mergeSolids')

// output handling
const { generateOutputFile } = require('../io/generateOutputFile')
const { prepareOutput } = require('@jscad/core/io/prepareOutput')
const { convertToBlob } = require('@jscad/core/io/convertToBlob')
const {
  formats,
  supportedFormatsForObjects,
} = require('@jscad/core/io/formats')
const { revokeBlobUrl } = require('../io/utils')

const Viewer = require('../ui/viewer/jscad-viewer')

function Processor(containerdiv, options) {
  if (options === undefined) options = {}
  // the default options
  this.opts = {
    debug: false,
    libraries: [],
    openJsCadPath: '',
    useAsync: true,
    useSync: true,
    viewer: {},
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

  this.hasOutputFile = false
  this.hasError = false
  this.paramDefinitions = []
  this.paramControls = []
  this.script = null
  this.formats = formats

  this.baseurl = document.location.href
  this.baseurl = this.baseurl.replace(/#.*$/, '') // remove remote URL
  this.baseurl = this.baseurl.replace(/\?.*$/, '') // remove parameters
  if (this.baseurl.lastIndexOf('/') !== this.baseurl.length - 1) {
    this.baseurl = this.baseurl.substring(0, this.baseurl.lastIndexOf('/') + 1)
  }

  /**
   * Processor state:
   *
   * 0 - initialized - no viewer, no parameters, etc;
   * 1 - processing  - processing JSCAD script;
   * 2 - complete    - completed processing;
   * 3 - incomplete  - incompleted due to errors in processing;
   *
   * @typedef {number} ProcessorState
   */

  /** @type {ProcessorState} state - the current processor state */
  this.state = 0 // initialized

  try {
    console.log('options', options)
    /**
     * Copy `init` options to this if the value does not
     * already exist.
     */
    for (var e in options.processor) {
      if (!this[e]) this[e] = options.processor[e]
    }

    this.viewer = new Viewer(options.processor.viewerdiv, this.opts.viewer)
  } catch (e) {
    console.error('viewer error', e)
    if (options.init.onUpdate) {
      options.init.onUpdate('error', e)
    } else {
      throw e
    }
  }
}

Processor.mergeSolids = mergeSolids

Processor.prototype = {
  setCurrentObjects: function(objs) {
    this.currentObjects = objs // list of CAG or CSG objects
    this.updateView()
    if (this.onchange) this.onchange(this)
  },

  updateView: function() {
    var objs = this.currentObjects.slice()
    this.viewedObject = mergeSolids(objs)

    if (this.viewer) {
      this.viewer.setCsg(this.viewedObject)
    }
  },

  clearViewer: function() {
    this.clearOutputFile()
    if (this.viewedObject) {
      this.viewer.clear()
      this.viewedObject = null
      if (this.onchange) this.onchange(this)
    }
    this.enableItems()
  },

  abort: function() {
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

  /**
   * enableItems is used to send an `onUpdate` with curent information
   * like formats and the outputFile
   */
  enableItems: function() {
    this.onUpdate({
      formats: supportedFormatsForObjects(this.currentObjects.slice())
        .filter(x => x !== 'stl')
        .reduce((formats, ext) => {
          formats[ext] = this.formatInfo(ext)
          return formats
        }, {}), // exclude 'stl' since it is an alias for stl(ascii) or stl(binary)
      outputFile: this.outputFile,
    })
  },

  // script: javascript code
  // filename: optional, the name of the .jscad file
  setJsCad: function(script, filename, includePathBaseUrl) {
    // console.log('setJsCad', script, filename)
    if (!filename) filename = 'openjscad.jscad'

    var prevParamValues = {}
    // this will fail without existing form
    try {
      prevParamValues = getParameterValues(
        this.paramControls,
        /* onlyChanged */ true
      )
    } catch (e) {}

    this.abort()
    this.paramDefinitions = []

    this.script = null
    // this.setError('')

    var scripthaserrors = false
    try {
      this.paramDefinitions = getParameterDefinitions(script)
      this.paramControls = []
      this.createParamControls(prevParamValues)
    } catch (e) {
      this.setStatus('error', e)
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

  rebuildSolids: function() {
    // clear previous solid and settings
    this.abort()
    //this clears output file cache
    this.clearOutputFile()

    this.setStatus('rendering')

    // rebuild the solid

    // prepare all parameters
    const parameters = getParameterValues(this.paramControls)
    const script = this.script
    const fullurl = this.includePathBaseUrl
      ? this.includePathBaseUrl + this.filename
      : this.filename
    const options = { memFs: this.memFs }

    this.state = 1 // processing
    let that = this
    function callback(err, objects) {
      if (err) {
        that.clearViewer()

        if (err.stack) {
          let errtxt = ''
          errtxt += '\nStack trace:\n' + err.stack
          //    var errtxt = err.toString()
        }
        that.setStatus('error', err) // 'Error.'
        that.state = 3 // incomplete
      } else {
        that.setCurrentObjects(objects)
        that.setStatus('ready')
        that.state = 2 // complete
      }
      that.enableItems()
    }

    if (this.opts.useAsync) {
      this.builder = rebuildSolidsInWorker(
        script,
        fullurl,
        parameters,
        (err, objects) => {
          if (err && that.opts.useSync) {
            this.builder = rebuildSolids(
              script,
              fullurl,
              parameters,
              callback,
              options
            )
          } else callback(undefined, objects)
        },
        options
      )
    } else if (this.opts.useSync) {
      this.builder = rebuildSolids(
        script,
        fullurl,
        parameters,
        callback,
        options
      )
    }
  },

  /**
   * Return the current processor state.
   * @returns {ProcessorState}
   */
  getState: function() {
    return this.state
  },

  clearOutputFile: function() {
    if (this.hasOutputFile) {
      this.hasOutputFile = false
      this.outputFile = undefined
      if (this.outputFileDirEntry) {
        this.outputFileDirEntry.removeRecursively(function() {})
        this.outputFileDirEntry = null
      }
      if (this.outputFileBlobUrl) {
        revokeBlobUrl(this.outputFileBlobUrl)
        this.outputFileBlobUrl = null
      }
      this.enableItems()
    }
  },

  /**
   * Generate a output file.  Read the resulting OutputFile in the `onUpdate` hook.
   * @param {FormatInfo} format
   */
  generateOutputFile: function(format) {
    this.clearOutputFile()
    const blob = this.currentObjectsToBlob(format)

    function onDone(data, downloadAttribute, blobMode, noData) {
      this.hasOutputFile = true
      this.outputFile = { data, downloadAttribute, blobMode, noData }
      this.enableItems()
    }

    if (this.viewedObject) {
      generateOutputFile(format.extension, blob, onDone, this)
      if (this.ondownload) this.ondownload(this)
    }
  },

  currentObjectsToBlob: function(format) {
    // if output format is jscad or js , use that, otherwise use currentObjects
    const objects =
      format.mimetype === 'application/javascript'
        ? this.script
        : this.currentObjects.slice()

    return convertToBlob(prepareOutput(objects, { format: format.name }))
  },

  formatInfo: function(format) {
    return this.formats[format]
  },

  /**
   * Original control creation methods.
   */

  createGroupControl: function(definition) {
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

  createChoiceControl: function(definition, prevValue) {
    if (!('values' in definition)) {
      throw new Error(
        'Definition of choice parameter (' +
          definition.name +
          ") should include a 'values' parameter"
      )
    }
    var control = document.createElement('select')
    control.paramName = definition.name
    control.paramType = definition.type
    var values = definition.values
    var captions
    if ('captions' in definition) {
      captions = definition.captions
      if (captions.length != values.length) {
        throw new Error(
          'Definition of choice parameter (' +
            definition.name +
            ") should have the same number of items for 'captions' and 'values'"
        )
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

  createControl: function(definition, prevValue) {
    var control_list = [
      {
        type: 'text',
        control: 'text',
        required: ['index', 'type', 'name'],
        initial: '',
      },
      {
        type: 'int',
        control: 'number',
        required: ['index', 'type', 'name'],
        initial: 0,
      },
      {
        type: 'float',
        control: 'number',
        required: ['index', 'type', 'name'],
        initial: 0.0,
      },
      {
        type: 'number',
        control: 'number',
        required: ['index', 'type', 'name'],
        initial: 0.0,
      },
      {
        type: 'checkbox',
        control: 'checkbox',
        required: ['index', 'type', 'name', 'checked'],
        initial: '',
      },
      {
        type: 'radio',
        control: 'radio',
        required: ['index', 'type', 'name', 'checked'],
        initial: '',
      },
      {
        type: 'color',
        control: 'color',
        required: ['index', 'type', 'name'],
        initial: '#000000',
      },
      {
        type: 'date',
        control: 'date',
        required: ['index', 'type', 'name'],
        initial: '',
      },
      {
        type: 'email',
        control: 'email',
        required: ['index', 'type', 'name'],
        initial: '',
      },
      {
        type: 'password',
        control: 'password',
        required: ['index', 'type', 'name'],
        initial: '',
      },
      {
        type: 'url',
        control: 'url',
        required: ['index', 'type', 'name'],
        initial: '',
      },
      {
        type: 'slider',
        control: 'range',
        required: ['index', 'type', 'name', 'min', 'max'],
        initial: 0,
        label: true,
      },
    ]
    // check for required parameters
    if (!('type' in definition)) {
      throw new Error(
        'Parameter definition (' +
          definition.index +
          ") must include a 'type' parameter"
      )
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
            if (p_name === 'checked') {
              // setAttribute() only accepts strings
              control.checked = definition.checked
            } else {
              control.setAttribute(p_name, definition[p_name])
            }
          } else {
            throw new Error(
              'Parameter definition (' +
                definition.index +
                ") must include a '" +
                p_name +
                "' parameter"
            )
          }
        }
        break
      }
    }
    if (i === control_list.length) {
      throw new Error(
        'Parameter definition (' + definition.index + ") is not a valid 'type'"
      )
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

  createParamControls: function(prevParamValues) {
    this.parameterstable.innerHTML = ''
    this.paramControls = []

    for (var i = 0; i < this.paramDefinitions.length; i++) {
      var paramdef = this.paramDefinitions[i]
      paramdef.index = i + 1

      var control = null
      var type = paramdef.type.toLowerCase()
      switch (type) {
        case 'choice':
          control = this.createChoiceControl(
            paramdef,
            prevParamValues[paramdef.name]
          )
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
        control.onchange = function(e) {
          var l = e.currentTarget.nextElementSibling
          if (l !== null && l.nodeName === 'LABEL') {
            l.innerHTML = e.currentTarget.value
          }
          // if (document.getElementById('instantUpdate').checked === true) {
          if (that.instantUpdate) {
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
  },
}

module.exports = Processor

/**
 * Object returned by `onUpdate`.
 * @typedef {Object} updateInfo
 * @property {Formats} formats - Object of download formats and info
 * @property {OutputFile} outputFIle - Output file information
 */

/**
 * @typedef {Object<string, FormatInfo} Formats
 */

/**
 * Format information.
 * @typedef {Object} FormatInfo
 * @property {boolean} convertCAG
 * @property {boolean} convertCSG
 * @property {string} description
 * @property {string} displayName
 * @property {string} extension
 * @property {string} mimetype
 * @property {string} name - The name of the key for this format. (eg. '.stla')
 */

/**
 * Output file informaiton object.
 * @typedef {Object} OutputFile
 * @property {string} data - Filesystem path to temoprary otuput file
 * @property {string} downloadAttribute - Filename for the download, currently always 'output.{extension}'
 * @property {boolean} noData - True if no data returned.
 * @property {boolean} blobMode - True if blob mode was used to generate the file.
 */
