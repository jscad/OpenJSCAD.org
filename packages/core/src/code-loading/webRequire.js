const path = require('path')

// use posix versions of path, even in the browser
const posix = path.posix ? path.posix : path

const getFileExtensionFromString = require('../utils/getFileExtensionFromString')
const { combineParameterDefinitions, getParameterDefinitionsFromSource } = require('../parameters/getParameterDefinitionsFromSource')

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
  const apiModule = apiMainPath === '@jscad/modeling' ? require('@jscad/modeling') : require(apiMainPath)

  // preset core modules
  // FIXME this list of modules should be an option, replacing apiMainPath
  const coreModules = {
    '@jscad/io': {
      exports: require('@jscad/io')
    },
    '@jscad/array-utils': {
      exports: require('@jscad/array-utils')
    },
    '@jscad/modeling': {
      exports: apiModule
    },
    // expose the fake fs module
    fs: {
      exports: fakeFs
    }
  }

  // console.log('*****\n',filesAndFolders,'\n*****')

  const extensions = {}
  const moduleCache = {}

  /* Require (obtain) the exports for the given require path, relative to the given current path.
   * The logic is based on the original NODE require() function.
   * @see https://nodejs.org/dist/latest-v12.x/docs/api/modules.html#modules_all_together
   */
  const _require = (currentPath, requirePath) => {
    // console.log('***** require: cur:', currentPath, ' req:', requirePath)

    // core modules
    const directModule = coreModules[requirePath]
    if (directModule) {
      return directModule.exports
    }

    if (!currentPath || requirePath.startsWith('/')) {
      currentPath = '/'
    }

    const loadAsFile = (requirePath) => {
      // console.log('***** load as file', requirePath)
      let baseExt = getFileExtensionFromString(requirePath)
      if (!baseExt) {
        baseExt = 'js' // for lookups
        requirePath = requirePath + '.js'
      }
      baseExt = '.' + baseExt

      const entry = findMatch(requirePath, filesAndFolders)
      if (!entry) return null

      if (entry.children) return null // directory

      if (extensions[baseExt]) {
        if (moduleCache[requirePath]) return moduleCache[requirePath]
        // evaluate the content
        const matchingModule = {
          exports: {},
          _compile: (content, fileName) => {
            try {
              const moduleMakerFunction = new Function('require', 'module', content) // eslint-disable-line no-new-func
              moduleMakerFunction(_require.bind(null, entry.fullPath), matchingModule)
            } catch (e) {
              // catch errors and build a context specific error, with file name and stack trace
              // the stack trace mimics the style of nodejs
              const message = e.message
              fileName = fileName.replace('/', '')
              // NOTE: only firefox provides line and column numbers
              const lineNumber = e.lineNumber ? e.lineNumber - 2 : 0 // the call to Function (above) adds two lines
              const columnNumber = e.columnNumber ? e.columnNumber : 0
              if (e.stack.startsWith('Object')) {
                e.stack = `${e.stack}\nObject.<anonymous> (${fileName}:${lineNumber}:${columnNumber})`
              } else {
                e = new SyntaxError(message, fileName, lineNumber)
                e.columnNumber = columnNumber
                e.stack = `Object.<anonymous> (${fileName}:${lineNumber}:${columnNumber})`
              }
              throw e
            }

            const paramDefFromSource = content.includes('@jscad-params') ? getParameterDefinitionsFromSource(content, fileName) : []
            const originalFunc = matchingModule.exports.getParameterDefinitions
            // replace getParameterDefinitions in the module, with version taht adds parsed definitions
            matchingModule.exports.getParameterDefinitions = () => combineParameterDefinitions(paramDefFromSource, originalFunc ? originalFunc() || [] : [])
          }
        }
        extensions[baseExt](matchingModule, entry.fullPath)
        moduleCache[requirePath] = matchingModule.exports
        return moduleCache[requirePath]
      }
      return null
    }

    const loadIndex = (requirePath) => {
      // console.log('***** load index', requirePath)
      const entry = findMatch(requirePath, filesAndFolders)
      if (!entry) return null

      if (requirePath === '/') requirePath = '' // FIXME hack for multiple file dragNdrop

      let indexPath = requirePath + '/index.js'
      let matchingModule = loadAsFile(indexPath)
      if (matchingModule) return matchingModule

      indexPath = requirePath + '/index.json'
      matchingModule = loadAsFile(indexPath)
      if (matchingModule) return matchingModule

      return null
    }

    const loadAsDirectory = (requirePath) => {
      // console.log('***** load as directory', requirePath)
      let entry = findMatch(requirePath, filesAndFolders)
      if (!entry) return null

      if (!entry.children) return null // file

      // load from main definition
      let matchingModule
      const jsonPath = requirePath + '/package.json'
      entry = findMatch(jsonPath, filesAndFolders)
      if (entry) {
        const main = JSON.parse(entry.source).main
        if (main) {
          const mainPath = posix.normalize(requirePath + '/' + main)
          matchingModule = loadAsFile(mainPath)
          if (matchingModule) return matchingModule

          matchingModule = loadIndex(mainPath)
          if (matchingModule) return matchingModule

          return null
        }
      }

      // load index
      matchingModule = loadIndex(requirePath)
      if (matchingModule) return matchingModule

      return null
    }

    // relative paths (POSIX style)
    if (requirePath.startsWith('./') || requirePath.startsWith('/') || requirePath.startsWith('../')) {
      requirePath = posix.normalize(posix.dirname(currentPath) + posix.sep + requirePath)
      // load as file
      let loadedModule = loadAsFile(requirePath)
      if (loadedModule) return loadedModule

      // load as directory
      loadedModule = loadAsDirectory(requirePath)
      if (loadedModule) return loadedModule

      throw new Error(`Cannot find relative path to module ${requirePath}`)
    }

    // TODO load self-reference

    const nodeModulesPaths = (basePath) => {
      const parts = basePath.split('/')
      const dirs = []
      for (let i = parts.length - 1; i > 0; i--) {
        if (parts[i] === 'node_modules') continue
        const dir = posix.sep + posix.join(...parts.slice(1, i + 1), 'node_modules')
        dirs.push(dir)
      }
      return dirs
    }

    const loadNodeModules = (requirePath, basePath) => {
      // console.log('loadNodeModules',requirePath, basePath)
      const dirs = nodeModulesPaths(basePath)
      for (let i = 0; i < dirs.length; i++) {
        const dir = dirs[i]
        const relPath = posix.join(dir, requirePath)
        // load as file
        let loadedModule = loadAsFile(relPath)
        if (loadedModule) return loadedModule
        // load as directory
        loadedModule = loadAsDirectory(relPath)
        if (loadedModule) return loadedModule
      }
      return null
    }

    // load node_module
    const loadedModule = loadNodeModules(requirePath, posix.dirname(currentPath))
    if (loadedModule) return loadedModule

    throw new Error(`Cannot find module ${requirePath}`)
  }

  // create a top level require for the whole file system
  const req = _require.bind(null, '/')
  req.extensions = extensions
  req.resolve = () => {}

  registerJsExtension(fakeFs, req)
  registerJsonExtension(fakeFs, req)
  return req
}

module.exports = makeWebRequire
