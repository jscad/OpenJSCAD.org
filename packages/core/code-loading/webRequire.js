const path = require('path')

const getFileExtensionFromString = require('../utils/getFileExtensionFromString')

/* find matching path in inputs
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

const registerJsExtension = (fs, _require) => {
  const stripBom = require('strip-bom')
  _require.extensions['.js'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}

const registerJsonExtension = (fs, _require) => {
  _require.extensions['.json'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    module.exports = JSON.parse(content)
  }
}

/* Make require callback functions based on the given file system.
 */
const makeWebRequire = (filesAndFolders, options) => {
  const defaults = {
    apiMainPath: '@jscad/modeling',
    fakeFs: require('./makeFakeFs')(filesAndFolders)
  }
  const { apiMainPath, fakeFs } = Object.assign({}, defaults, options)
  const apiModule = apiMainPath === '@jscad/modeling' ? require('@jscad/modeling') : require('./vtreeApi')

  // preset core modules
  let core_modules = {
    '@jscad/io': {
      exports: require('@jscad/io')
    },
    // ALIAS for now !!
    '@jscad/api': {
      exports: apiModule
    },
    '@jscad/modeling': {
      exports: apiModule
    },
    // fake fs module ! only useable with the currently available files & folders
    // that have been drag & dropped / created
    'fs': {
      exports: fakeFs
    }
  }

  // console.log('*****\n',filesAndFolders,'\n*****')

  const extensions = {}

  /* Require (obtain) the exports for the given require path, relative to the given current path.
   * The logic is based on the original NODE require() function.
   * @see https://nodejs.org/dist/latest-v12.x/docs/api/modules.html#modules_all_together
   */
  const _require = (curPath, reqPath) => {
    // console.log('***** require: cur:', curPath, ' req:', reqPath)

    // core modules
    const directModule = core_modules[reqPath]
    if (directModule) {
      return directModule.exports
    }

    if (!curPath || reqPath.startsWith('/')) {
      curPath = ''
    }

    const load_as_file = (reqPath) => {
      // console.log('***** load as file', reqPath)
      let baseExt = getFileExtensionFromString(reqPath)
      if (!baseExt) {
        baseExt = 'js' // for lookups
        reqPath = reqPath + '.js'
      }
      baseExt = '.' + baseExt

      const entry = findMatch(reqPath, filesAndFolders)
      if (!entry) return null

      if (entry.children) return null // directory

      if (extensions[baseExt]) {
        let matchingModule
        // evaluate the content
        matchingModule = {
          exports: {},
          _compile: (content, fileName) => {
            const moduleMakerFunction = new Function('require', 'module', content)
            moduleMakerFunction(_require.bind(null, entry.fullPath), matchingModule)
            // add to core to resolve later references
            //core_modules[entry.fullPath] = matchingModule.exports
          }
        }
        extensions[baseExt](matchingModule, entry.fullPath)
        return matchingModule.exports
      }
      return null
    }

    const load_index = (reqPath) => {
      // console.log('***** load index', reqPath)
      const entry = findMatch(reqPath, filesAndFolders)
      if (!entry) return null

      if (reqPath === '/') reqPath = '' // FIXME hack for multiple file dragNdrop

      let indexPath = reqPath + '/index.js'
      let matchingModule = load_as_file(indexPath)
      if (matchingModule) return matchingModule

      indexPath = reqPath + '/index.json'
      matchingModule = load_as_file(indexPath)
      if (matchingModule) return matchingModule

      return null
    }

    const load_as_directory = (reqPath) => {
      // console.log('***** load as directory', reqPath)
      let entry = findMatch(reqPath, filesAndFolders)
      if (!entry) return null

      if (!entry.children) return null // file

      // load from main definition
      let matchingModule
      jsonPath = reqPath + '/package.json'
      entry = findMatch(jsonPath, filesAndFolders)
      if (entry) {
        const main = JSON.parse(entry.source).main
        if (main) {
          let mainPath = reqPath + '/' + main
          matchingModule = load_as_file(mainPath)
          if (matchingModule) return matchingModule

          matchingModule = load_index(mainPath)
          if (matchingModule) return matchingModule

          return null
        }
      }

      // load index
      matchingModule = load_index(reqPath)
      if (matchingModule) return matchingModule

      return null
    }

    // relative paths
    if (reqPath.startsWith('./') || reqPath.startsWith('/') || reqPath.startsWith('../')) {
      reqPath = path.resolve(path.dirname(curPath), reqPath)
      // load as file
      let loadedModule = load_as_file(reqPath)
      if (loadedModule) return loadedModule

      // load as directory
      loadedModule = load_as_directory(reqPath)
      if (loadedModule) return loadedModule

      throw new Error(`Cannot find relative path to module ${reqPath}`)
    }

    // TODO load self-reference

    const node_modules_paths = (basePath) => {
      let parts = basePath.split('/')
      let dirs = []
      for (let i = parts.length - 1; i > 0; i--) {
        if (parts[i] === 'node_modules') continue
        let dir = path.sep + path.join(...parts.slice(1, i + 1), 'node_modules')
        dirs.push(dir)
      }
      return dirs
    }

    const load_node_modules = (reqPath, basePath) => {
      // console.log('load_node_modules',reqPath, basePath)
      let dirs = node_modules_paths(basePath)
      for (let i = 0; i < dirs.length; i++) {
        let dir = dirs[i]
        let relPath = path.join(dir, reqPath)
        // load as file
        let loadedModule = load_as_file(relPath)
        if (loadedModule) return loadedModule
        // load as directory
        loadedModule = load_as_directory(relPath)
        if (loadedModule) return loadedModule
      }
      return null
    }

    // load node_module
    let loadedModule = load_node_modules(reqPath, path.dirname(curPath))
    if (loadedModule) return loadedModule

    throw new Error(`Cannot find module ${reqPath}`)
  }

  // create a top level require for the whole file system
  const req = _require.bind(null, '')
  req.extensions = extensions
  req.resolve = () => {}

  registerJsExtension(fakeFs, req)
  registerJsonExtension(fakeFs, req)
  return req
}

module.exports = makeWebRequire
