const fs = require('fs')
const path = require('path')
const getParameterDefinitionsCLI = require('./getParameterDefinitionsCLI')
const stripBom = require('strip-bom')

require.extensions['.jscad'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8')
  module._compile(stripBom(content), filename)
}

/** load an npm module from a string
 * @param  {String} src the source code of the module
 * @param  {String} filename the filename of the module
 */
function requireFromString (src, filename) {
  var Module = module.constructor
  var m = new Module()
  m._compile(src, filename)
  return m.exports
}

// from https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate/16060619#16060619
function requireUncached (module) {
  delete require.cache[require.resolve(module)]
  return require(module)
}

const hasScriptGotParameters = scriptSrc => {
  return scriptSrc && 'getParameterDefinitions' in scriptSrc
}

const getScriptFile = paths => {
  if (!paths) {
    return
  }
  let mainPath = paths[0]
  let filePath
  const stats = fs.statSync(mainPath)
  if (stats.isFile()) {
    return mainPath
  } else if (stats.isDirectory()) {
    // console.log('found dir')
    // first try to use package.json to find main
    const packageFile = path.join(mainPath, 'package.json')
    if (fs.existsSync(packageFile)) {
      const rMain = require(packageFile).main
      if (rMain) {
        return path.join(mainPath, rMain)
      }
      // filePath = rMain ? path.join(mainPath, rMain) : undefined
    }

    // if all else fails try to look for index.js/jscad, main.js/jscad or a file with same name
    // as the folder
    const entries = fs.readdirSync(mainPath)
    const acceptableMainFiles = ['main', 'index', path.parse(path.basename(mainPath)).name]
    const jsMainFiles = acceptableMainFiles.map(x => x + '.js')
    const jscadMainFiles = acceptableMainFiles.map(x => x + '.jscad')

    const candidates = entries
      .filter(entry => {
        return jsMainFiles.concat(jscadMainFiles).includes(entry)
      })
    if (candidates.length > 0) {
      filePath = path.join(mainPath, candidates[0])
    }
    return filePath
  }
}

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {} filePath
 * @param  {} csgBasePath='../../../core/' : relative path or  './node_modules/@jscad'
 */
function loadScript (filePath, csgBasePath = './node_modules/@jscad') {
  console.log('loading script using jscad/csg base path at:', csgBasePath)
  const scriptAsText = fs.readFileSync(filePath, 'utf8')
  let jscadScript
  // && !scriptAsText.includes('require(')
  if ((!scriptAsText.includes('module.exports')) && scriptAsText.includes('main')) {
    const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
    const commonJsScriptText = `
    //const {CSG, CAG} = require('${csgBasePath}/csg.js')
    const {CSG, CAG} = require('${csgBasePath}/csg')
    const {square, circle, polygon} = require('${csgBasePath}/scad-api').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}/scad-api').primitives3d
    const {color} = require('${csgBasePath}/scad-api').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}/scad-api').extrusions
    const {rotate, translate, scale, hull, chain_hull, expand, contract} = require('${csgBasePath}/scad-api').transformations
    const {union, difference, intersection} = require('${csgBasePath}/scad-api').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}/scad-api').maths
    const {hsl2rgb} = require('${csgBasePath}/scad-api').color
    const {vector_text, vector_char} = require('${csgBasePath}/scad-api').text
    const {OpenJsCad} = require('${csgBasePath}/scad-api').OpenJsCad
    const {echo} = require('${csgBasePath}/scad-api').debug
    
    ${scriptAsText}
    module.exports = main
    ${getParamsString}
    `
    jscadScript = requireFromString(commonJsScriptText, filePath)
  } else {
    jscadScript = require(filePath)
  }
  let params = {}
  let paramDefinitions = []
  if (hasScriptGotParameters(jscadScript)) {
    paramDefinitions = jscadScript.getParameterDefinitions()
    params = getParameterDefinitionsCLI(jscadScript.getParameterDefinitions)
  }
  return {params, paramDefinitions, jscadScript}
}

function watchScript (filePath, callback) {
  fs.watch(filePath, { encoding: 'utf8' }, (eventType, filename) => {
    if (filename) {
      requireUncached(filePath)
      callback(filePath)
    }
  })
}

module.exports = {loadScript, requireUncached, watchScript, getScriptFile}
