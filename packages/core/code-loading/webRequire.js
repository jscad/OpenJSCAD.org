const path = require('path')

// use posix versions of path, even in the browser
const posix = path.posix ? path.posix : path

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
  const coreModules = {
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
    fs: {
      exports: fakeFs
    }
  }

  // console.log('*****\n',filesAndFolders,'\n*****')

  const extensions = {}

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
        // evaluate the content
        const matchingModule = {
          exports: {},
          _compile: (content, fileName) => {
            const moduleMakerFunction = new Function('require', 'module', content)
            moduleMakerFunction(_require.bind(null, entry.fullPath), matchingModule)
            // add to core to resolve later references
            // FIXME coreModules[entry.fullPath] = matchingModule.exports
          }
        }
        extensions[baseExt](matchingModule, entry.fullPath)
        return matchingModule.exports
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
          const mainPath = requirePath + '/' + main
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
