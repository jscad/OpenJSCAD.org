const {walkFileTree} = require('./exp/walkFileTree')
  const isCommonJsModule = require('@jscad/core/code-loading/isCommonJsModule')
  const getFileExtensionFromString = input => {
    if (input.indexOf('.') === -1) {
      return undefined
    }
    return (input.substring(input.lastIndexOf('.') + 1)).toLowerCase()
  }

  const makeFakeFs = (filesAndFolders) => {
    const findMatch = (path, inputs = filesAndFolders) => {
      let result
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
      // return filesAndFolders
    }
    const fakeFs = {
      statSync: path => {
        const entry = findMatch(path)
        return {
          isFile: _ => {
            return entry && ('source' in entry && !('children' in entry))
          },
          isDirectory: _ => {
            return entry && (!('source' in entry) && ('children' in entry))
          }
        }
      },
      existsSync: (path) => {
        const entry = findMatch(path)
        console.log('does ', path, 'exist ?', entry !== undefined)
        return entry !== undefined
      },
      readdirSync: (path) => {
        const entry = findMatch(path)
        return entry.children.map(x => x.name)
         // filesAndFolders
      }
    }
    return fakeFs
  }
  const makeFakeRequire = (options, filesAndFolders) => {
    let modules = {
      '@jscad/api': {
        exports: require('@jscad/csg/api')// {cube: () => console.log('you asked for a cube')}
      }
      // '@jscad/csg/api'
    }

    const updatePaths = (entry) => {
      entry.fullPath = entry.fullPath.includes('node_modules/') ? entry.fullPath.split('node_modules/')[1] : entry.fullPath
      if (entry.children) {
        entry.children.forEach(function (child) {
          child.fullPath = child.fullPath.includes('node_modules/') ? child.fullPath.split('node_modules/')[1] : child.fullPath
          updatePaths(child)
        })
      }
    }

    const registerNodeModules = (inputs, isInNodeModules = false, isScoped = false) => {
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
        }
        if (entry.children && (isInNodeModules === false || entry.name.startsWith('@'))) {
          if (entry.name === 'node_modules') {
            registerNodeModules(entry.children, true)
          } else if (entry.name.startsWith('@')) {
            registerNodeModules(entry.children, true, true)
          } else {
            registerNodeModules(entry.children)
          }
          // console.log('here')
          // filesAndFolders[]
        }
      }
    }
    registerNodeModules(filesAndFolders)

    const findMatch = (path, inputs = filesAndFolders) => {
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
    // const rootModule = new Function('require', 'module', script)

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

      const baseExt = getFileExtensionFromString(reqPath)
      let entry
      if (baseExt === undefined) {
        const commonExtensions = ['js', 'jscad', 'json']
        entry = findMatch(reqPath + '.js')
        if (!entry) {
          entry = findMatch(reqPath + '.jscad')
        }
        if (!entry) {
          entry = findMatch(reqPath + '.json')
        }
      }
      if (!entry) {
        entry = findMatch(reqPath)
      }

      if (!entry) {
        throw new Error(`No file ${reqPath} found`)
      }
      const ext = getFileExtensionFromString(entry.name)
      let result
      if (ext === 'json') {
        result = JSON.parse(entry.source)
        modules[entry.fullPath] = result
      }
      if (ext === 'jscad' || ext === 'js') {
        if (modules[entry.fullPath]) {
          result = modules[entry.fullPath]
        } else {
          const __module = new Function('require', 'module', entry.source)
          let __exports = {}
          __module(_require.bind(null, entry.fullPath), __exports)
          modules[entry.fullPath] = __exports
          result = __exports // modules[entry.fullPath]
        }
      }

      console.log('found entry', entry)
      return result.exports ? result.exports : result
    }

    const _resolve = () => {
    }

    return {
      _require: _require.bind(null, '') // (path)
    }
  }

  const {getDesignEntryPoint} = require('./exp/requireDesignUtilsFs')