import { CSGToBuffers } from './util/CsgToBuffers'

/*

0

You should use event.dataTransfer.files to get the FileList. then you can post that directly to the worker:

var files=e.dataTransfer.files || e.target.files; // Cross browser FileList
var worker=new Worker(...);
worker.postMessage({files: files});
*/

let workerBaseURI, main

function require (url) {
  url = require.alias[url] || url
  if (url[0] != '/' && url.substr(0, 2) != './' && url.substr(0, 4) != 'http') url = 'https://unpkg.com/' + url
  let exports = require.cache[url] // get from cache
  if (!exports) { // not cached
    const module = requireModule(url)
    require.cache[url] = exports = module.exports // cache obj exported by module
  }
  return exports // require returns object exported by module
}

function requireFile (url) {
  try {
    const X = new XMLHttpRequest()
    X.open('GET', new URL(url, workerBaseURI), 0) // sync
    X.send()
    if (X.status && X.status !== 200) throw new Error(X.statusText)
    return X.responseText
  } catch (e) {
    console.log('problem loading url ', url, 'base', workerBaseURI, ' error:', e.message)
    throw e
  }
}

function requireModule (url, source) {
  try {
    const exports = {}
    if (!source) source = requireFile(url)
    const module = { id: url, uri: url, exports: exports, source } // according to node.js modules
    // fix, add comment to show source on Chrome Dev Tools
    source = '//@ sourceURL=' + url + '\n' + source
    // ------
    const anonFn = new Function('require', 'exports', 'module', source) // create a Fn with module code, and 3 params: require, exports & module
    anonFn(require, exports, module) // call the Fn, Execute the module
    return module
  } catch (err) {
    console.error('Error loading module ' + url, err.message)
    throw err
  }
}

require.cache = {}
require.alias = {}

function runMain (params = {}) {
  const transferable = []

  let time = Date.now()
  const solids = main(params)
  const solidsTime = Date.now() - time

  time = Date.now()
  CSGToBuffers.clearCache()
  const entities = CSGToBuffers(solids, transferable)

  sendCmd({ action: 'entities', entities, solidsTime, entitiesTime: Date.now() - time }, transferable)
}

let initialized = false
const handlers = {
  fileDropped: ({dataTransfer}) => {
    console.log('File(s) dropped ddd', dataTransfer)
    let file
    if (dataTransfer.items) {
      console.log('dataTransfer items', dataTransfer)
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (dataTransfer.items[i].kind === 'file') {
          file = dataTransfer.items[i]
          if (file.webkitGetAsEntry) file = file.webkitGetAsEntry()
          else if (file.getAsEntry) file = file.getAsEntry()
          else file = file.webkitGetAsFile()
          console.log('... item file[' + i + '].name = ' + file.name)
          break;
        }
      }
    } else {
      console.log('dataTransfer files', dataTransfer)
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < dataTransfer.files.length; i++) {
        file = dataTransfer.files[i]
        console.log('... file[' + i + '].name = ' + file.name, file)
      }
    }
  },
  runScript: ({ script, url, params = {} }) => {
    if (!initialized) {
      console.log('worker not initialized')
      return
    }
    const scriptModule = requireModule(url, script)
    main = scriptModule.exports.main
    const gp = scriptModule.exports.getParameterDefinitions
    if (gp) {
      sendCmd({ action: 'parameterDefinitions', data: gp() })
    }
    runMain(params)
  },
  updateParams: ({ params = {} }) => {
    runMain(params)
  },
  init: (params) => {
    console.log('init worker', params)
    let { baseURI, alias = [] } = params
    if (!baseURI && typeof document !== 'undefined' && document.baseURI) {
      baseURI = document.baseURI
    }

    if (baseURI) workerBaseURI = baseURI.toString()

    alias.forEach((arr) => {
      const [orig, ...aliases] = arr
      aliases.forEach((a) => {
        require.alias[a] = orig
        if (a.toLowerCase().substr(-3) !== '.js')
          {require.alias[a + ".js"] = orig;}
      })
    })
    initialized = true
  }
}

function sendCmd (cmd, trans) {
  self.postMessage(cmd, trans)
}

function receiveCmd (cmd) {
  const fn = handlers[cmd.action]
  if (!fn) {
    throw new Error('no handler for type: ' + cmd.action)
  }
  fn(cmd)
}

console.log('WORKER started', self.addEventListener, self)
self.addEventListener('message', (e) => receiveCmd(e.data))
