function gnagna (scriptAsText) {
  const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
  const commonJsScriptText = `
    const {CSG, CAG} = require('${csgBasePath}').csg
    const {square, circle, polygon} = require('${csgBasePath}').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}').primitives3d
    const {color} = require('${csgBasePath}').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}').extrusions
    const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract} = require('${csgBasePath}').transformations
    const {union, difference, intersection} = require('${csgBasePath}').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}').maths
    const {hsl2rgb} = require('${csgBasePath}').color
    const {vector_text, vector_char} = require('${csgBasePath}').text
    const {OpenJsCad} = require('${csgBasePath}').OpenJsCad
    const {echo} = require('${csgBasePath}').debug
    
    ${scriptAsText}
    module.exports.main = main
    ${getParamsString}
    `
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

function blabla (core, api, scriptAsText) {
  // const csgBasePath = '@jscad/csg/api'
  /* const {CSG, CAG} = require('${csgBasePath}').csg
  const {square, circle, polygon} = require('${csgBasePath}').primitives2d
  const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}').primitives3d
  const {color} = require('${csgBasePath}').color
  const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}').extrusions
  const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract} = require('${csgBasePath}').transformations
  const {union, difference, intersection} = require('${csgBasePath}').booleanOps
  const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}').maths
  const {hsl2rgb} = require('${csgBasePath}').color
  const {vector_text, vector_char} = require('${csgBasePath}').text
  const {OpenJsCad} = require('${csgBasePath}').OpenJsCad
  const {echo} = require('${csgBasePath}').debug */
  let modules = {
    '@jscad/api': {
      exports: require('@jscad/csg/api')//{cube: () => console.log('you asked for a cube')}
    }
  }
  const script = `
    const {CSG, CAG} = api.csg
    const {square, circle, polygon} = api.primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = api.primitives3d
    const {color} = api.color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = api.extrusions
    const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract} = api.transformations
    const {union, difference, intersection} = api.booleanOps


    ${scriptAsText}

    module.exports = {main}
  `
  //console.log('script', script)
  const rootModule = new Function('require', 'module', 'api', script)
  const mockRequire = function (pathToModule) {
    //console.log('you asked for', pathToModule)
    const foundModule = modules[pathToModule]
    return foundModule.exports
  }
  let module = {}
  rootModule(mockRequire, module, api)
  // console.log('module', module)
  const params = {}
  const paramDefinitions = []
  const scriptRootModule = module.exports
  // return new function()
  return {scriptRootModule, params, paramDefinitions}
}

module.exports = function (self) {
  const makeBuildCachedGeometryFromTree = require('jscad-tree-experiment').buildCachedGeometry
  const { CAG, CSG } = require('@jscad/csg')

  const defaults = {vtreeMode: true}

  self.onmessage = function (event) {
    if (event.data instanceof Object) {
      // console.log('in web worker')
      const {data} = event
      if (data.cmd === 'render') {
        const {source, parameters, mainPath, options} = data
        const {vtreeMode, lookup, lookupCounts} = Object.assign({}, defaults, options)
        const apiMainPath = vtreeMode ? './vtreeApi' : '@jscad/csg/api'

        const {isCAG, isCSG} = require('@jscad/csg')
        const {toArray} = require('../../utils/utils')

        const {loadScript} = require('../code-loading/scriptLoading')
        // const requireUncached = require('../code-loading/requireUncached')
        // TODO: only uncache when needed
        // requireUncached(mainPath)

        // makeFakeRequire({fullPath: mainPath, source: source, })
        const api = require('@jscad/csg/api')
        const core = require('@jscad/csg/api').csg
        const {scriptRootModule, params, paramDefinitions} = blabla(core, api, source, mainPath)

        // const {scriptRootModule, params, paramDefinitions} = loadScript(source, mainPath, apiMainPath)

        const paramDefaults = params
        const paramValues = Object.assign({}, paramDefaults, parameters)
        let convertedLookup = {}

        // send back parameter definitions & values
        self.postMessage({'type': 'params', paramDefaults, paramValues, paramDefinitions})

        // deal with the actual solids generation
        let solids
        let rawResults = toArray(scriptRootModule.main(paramValues))
        const isSolidResult = (rawResults.length > 0 && (isCSG(rawResults[0]) || isCAG(rawResults[0])))
        if (isSolidResult) {
          solids = rawResults
        } else if (vtreeMode) {
          // TODO: optimise this !!
          Object.keys(lookup).forEach(function (key) {
            const object = lookup[key]
            let result
            if (object['class'] === 'CSG') {
              result = CSG.fromCompactBinary(object)
            }
            if (object['class'] === 'CAG') {
              result = CAG.fromCompactBinary(object)
            }
            convertedLookup[key] = result
          })

          const buildCachedGeometryFromTree = makeBuildCachedGeometryFromTree({passesBeforeElimination: 3, lookup: convertedLookup, lookupCounts})
          solids = buildCachedGeometryFromTree({}, rawResults)
        } else {
          throw new Error('Bad output from script: expected CSG/CAG objects')
        }
        solids = solids
          .map(object => {
            if (isCSG(object) || isCAG(object)) {
              return object.toCompactBinary()
            }
          })

        // FIXME: optimise this !!
        const compactLookup = {}
        Object.keys(convertedLookup).forEach(function (key) {
          const object = convertedLookup[key]
          let result = object
          // FIXME: isCSG/isCAG should not fail on arbitraty objects
          try {
            if (isCSG(object) || isCAG(object)) {
              result = object.toCompactBinary()
              compactLookup[key] = result
            }
          } catch (e) {}
        })
        // send back solids
        self.postMessage({'type': 'solids', solids, lookup: compactLookup, lookupCounts})
      }
    }
  }
}
//
