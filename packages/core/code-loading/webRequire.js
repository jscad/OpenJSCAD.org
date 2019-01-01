const getFileExtensionFromString = require('../utils/getFileExtensionFromString')

/** find matching path in inputs
 * @param  {} path
 * @param  {} inputs=filesAndFolders
 */
const findMatch = (path, inputs) => {
  for (let i = 0; i < inputs.length; i++) {
    const entry = inputs[i]
    if (path === entry.fullPath || ('/' + path) === entry.fullPath) {
      return entry
    }
    if (entry.children) {
      const res = findMatch(path, entry.children)
      if (res !== undefined) {
        return res
      }
    }
  }
  return undefined
}

/** adapt module paths
 * @param  {} entry
 */
const updatePaths = (entry) => {
  entry.fullPath = entry.fullPath.includes('node_modules/') ? entry.fullPath.split('node_modules/')[1] : entry.fullPath
  if (entry.children) {
    entry.children.forEach(function (child) {
      child.fullPath = child.fullPath.includes('node_modules/') ? child.fullPath.split('node_modules/')[1] : child.fullPath
      updatePaths(child)
    })
  }
}

/** register a node module
 * @param  {} inputs
 * @param  {} isInNodeModules=false
 * @param  {} isScoped=false
 */
const registerFilesAndFolders = (filesAndFolders, inputs, isInNodeModules = false, isScoped = false) => {
  // console.log('registerFilesAndFolders', filesAndFolders)
  for (let i = 0; i < inputs.length; i++) {
    const entry = inputs[i]
    if (isInNodeModules) {
      // console.log('insertingNodeModule', entry.name, entry.fullPath)
      const alreadyExists = filesAndFolders.filter(x => x.fullPath === entry.fullPath).length > 0
      if (!alreadyExists) {
        entry.fullPath = entry.fullPath.includes('node_modules/') ? entry.fullPath.split('node_modules/')[1] : entry.fullPath
        filesAndFolders.push(entry)
        updatePaths(entry)
      }
    } else if (entry.children && (isInNodeModules === false || entry.name.startsWith('@'))) {
      if (entry.name === 'node_modules') {
        registerFilesAndFolders(filesAndFolders, entry.children, true)
      } else if (entry.name.startsWith('@')) {
        registerFilesAndFolders(filesAndFolders, entry.children, true, true)
      } else {
        registerFilesAndFolders(filesAndFolders, entry.children)
      }
    }
  }
}

function WebModule (id, parent) {
  this.id = id
  this.parent = parent
  this.exports = {}
}

const registerJsExtension = (fs, _require) => {
  const stripBom = require('strip-bom')
  _require.extensions['.js'] = (module, filename) => {
    // console.log('module', module)
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}

const registerJsonExtension = (fs, _require) => {
  _require.extensions['.json'] = (module, filename) => {
    // FIXME: not sure
    const content = fs.readFileSync(filename, 'utf8')
    module.exports = JSON.parse(content)
  }
}

const makeWebRequire = (filesAndFolders, options) => {
  const defaults = {
    apiMainPath: '@jscad/csg/api',
    fakeFs: require('./makeFakeFs')(filesAndFolders)
  }
  const { apiMainPath, fakeFs } = Object.assign({}, defaults, options)
  const apiModule = apiMainPath === '@jscad/csg/api' ? require('@jscad/csg/api') : require('./vtreeApi')

  // preset modules
  let modules = {
    '@jscad/csg/api': {
      exports: apiModule
    },
    '@jscad/io': {
      exports: require('@jscad/io')
    },
    // ALIAS for now !!
    '@jscad/api': {
      exports: apiModule
    },
    // fake fs module ! only useable with the currently available files & folders
    // that have been drag & dropped / created
    'fs': {
      exports: fakeFs
    }
  }
  registerFilesAndFolders(filesAndFolders, filesAndFolders)

  const extensions = {}

  const _require = (curPath, reqPath) => {
    console.log('require-ing module', reqPath, extensions)
    // resolve to entry
    const path = require('path')
    // relative paths
    if (curPath && reqPath.startsWith('.')) {
      reqPath = path.resolve(path.dirname(curPath), reqPath)
      if (reqPath.startsWith('/')) {
        reqPath = reqPath.slice(1)
      }
    }

    const baseExt = getFileExtensionFromString(reqPath)
    let entry
    if (baseExt === undefined) { // when there is no extension specified
      const fileExtensions = Object.keys(extensions)// not quite reliable, do we need to enforce .js first ?
      for (let i = 0; i < fileExtensions.length; i++) {
        entry = findMatch(reqPath + fileExtensions[i], filesAndFolders)
        if (entry) { break }
      }
    }
    if (!entry) {
      entry = findMatch(reqPath, filesAndFolders)
    }
    // still no result, look for preset modules
    if (!entry) {
      const directModule = modules[reqPath]
      if (directModule) {
        return directModule.exports
      }
    }

    if (!entry) {
      throw new Error(`No file ${reqPath} found`)
    }

    // now do the actual module loading
    const ext = getFileExtensionFromString(entry.name)
    let result

    const fullExt = '.' + ext
    if (fullExt in extensions) {
      console.log('extension found', fullExt)
      let matchingModule
      if (modules[entry.fullPath]) {
        matchingModule = modules[entry.fullPath]
      } else {
        let newModule = {
          exports: {},
          _compile: (content, fileName) => {
            console.log('compile', fileName)
            // setup the module
            // entry.source
            const moduleMakerFunction = new Function('require', 'module', content)
            moduleMakerFunction(_require.bind(null, entry.fullPath), newModule)
            modules[entry.fullPath] = newModule.exports
            matchingModule = newModule
            result = matchingModule
          }
        }
        extensions[fullExt](newModule, entry.fullPath)
      }
    }
    /*
    if (ext === 'jscad' || ext === 'js' || ext === 'stl') {
      console.log('requiring from here', ext)
      if (modules[entry.fullPath]) {
        result = modules[entry.fullPath]
      } else {
        const moduleMakerFunction = new Function('require', 'module', entry.source)
        let newModule = {}
        moduleMakerFunction(_require.bind(null, entry.fullPath), newModule)
        modules[entry.fullPath] = newModule.exports
        result = newModule
      }
    } */
    console.log('result', result)
    return result.exports ? result.exports : result
  }

  const _resolve = () => {
  }

  const req = _require.bind(null, '')
  req.extensions = extensions

  registerJsExtension(fakeFs, req)
  registerJsonExtension(fakeFs, req)

  return req
  /* return {
    _require: _require.bind(null, '') // (path)
  } */
}

module.exports = makeWebRequire
