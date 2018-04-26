const getFileExtensionFromString = require('../../utils/getFileExtensionFromString')

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
const registerModules = (filesAndFolders, inputs, isInNodeModules = false, isScoped = false) => {
  console.log('registerModules', filesAndFolders)
  for (let i = 0; i < inputs.length; i++) {
    const entry = inputs[i]
    if (isInNodeModules) {
      console.log('insertingNodeModule', entry.name, entry.fullPath)
      const alreadyExists = filesAndFolders.filter(x => x.fullPath === entry.fullPath).length > 0
      if (!alreadyExists) {
        entry.fullPath = entry.fullPath.includes('node_modules/') ? entry.fullPath.split('node_modules/')[1] : entry.fullPath
        filesAndFolders.push(entry)
        /* if (entry.children) {
          entry.children.forEach(function (child) {
            child.fullPath = child.fullPath.includes('node_modules/') ? child.fullPath.split('node_modules/')[1] : child.fullPath
          })
        } */
        updatePaths(entry)
      }
    } else if (entry.children && (isInNodeModules === false || entry.name.startsWith('@'))) {
      if (entry.name === 'node_modules') {
        registerModules(entry.children, true)
      } else if (entry.name.startsWith('@')) {
        registerModules(entry.children, true, true)
      } else {
        registerModules(entry.children)
      }
      // console.log('here')
      // filesAndFolders[]
    }
  }
}

const makeWebRequire = (filesAndFolders, options) => {
  // preset modules
  let modules = {
    '@jscad/csg/api': {
      exports: require('@jscad/csg/api')
    },
    '@jscad/io': {
      exports: require('@jscad/io')
    }
  }
  registerModules(filesAndFolders, filesAndFolders)
  console.log('making web require', filesAndFolders)

  /* const rootModule = new Function('require', 'module', rootModuleSource)
  const mockRequire = function (pathToModule) {
    const foundModule = modules[pathToModule]
    // console.log('you asked for', pathToModule, 'and will get', foundModule, foundModule.exports)
    return foundModule.exports
  }
  let module = {}
  rootModule(mockRequire, module)
  // console.log('module', module)
  const designRootModule = module
  modules[rootModulePath] = designRootModule

  return mockRequire

  console.log('really registering module', entry)
      const newModuleFunction = new Function('require', 'module', entry.source)
      let newModule = {}
      newModuleFunction(mockRequire, module)
      // console.log('module', module)
      const designRootModule = module
      modules[rootModulePath] = designRootModule

  */
  const _require = (curPath, reqPath) => {
    console.log('require-ing module', reqPath)
    const path = require('path')
    // relative paths
    if (curPath && reqPath.startsWith('.')) {
      reqPath = path.resolve(path.dirname(curPath), reqPath)
      if (reqPath.startsWith('/')) {
        reqPath = reqPath.slice(1)
      }
    }
    console.log('path', reqPath)

    const baseExt = getFileExtensionFromString(reqPath)
    let entry
    if (baseExt === undefined) {
      console.log('no extension')
      const commonExtensions = ['js', 'jscad', 'json']
      entry = findMatch(reqPath + '.js', filesAndFolders)
      if (!entry) {
        entry = findMatch(reqPath + '.jscad', filesAndFolders)
      }
      if (!entry) {
        entry = findMatch(reqPath + '.json', filesAndFolders)
      }
    }
    if (!entry) {
      console.log('looking directly', reqPath, filesAndFolders)
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
    const ext = getFileExtensionFromString(entry.name)
    console.log('ext', ext)
    let result
    if (ext === 'json') {
      result = JSON.parse(entry.source)
      modules[entry.fullPath] = result
    }
    if (ext === 'jscad' || ext === 'js') {
      console.log('foo', modules)
      if (modules[entry.fullPath]) {
        result = modules[entry.fullPath]
      } else {
        const moduleMakerFunction = new Function('require', 'module', entry.source)
        let newModule = {}
        moduleMakerFunction(_require.bind(null, entry.fullPath), newModule)
        modules[entry.fullPath] = newModule.exports
        result = newModule
        console.log('modules', modules)
      }
    }

    console.log('found entry', entry, result)
    return result.exports ? result.exports : result
  }

  const _resolve = () => {
  }

  return _require.bind(null, '') // (path)

  /* return {
    _require: _require.bind(null, '') // (path)
  } */
}

module.exports = makeWebRequire
