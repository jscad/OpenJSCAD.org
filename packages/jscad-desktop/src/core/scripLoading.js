const fs = require('fs')
const getParameterDefinitionsCLI = require('./getParameterDefinitionsCLI')
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

function loadScript (filePath, csgBasePath = '../../../core/') { // './node_modules/@jscad') {
  console.log('loading script')
  const scriptAsText = fs.readFileSync(filePath, 'utf8')
  let jscadScript
  if (!scriptAsText.includes('module.exports') && scriptAsText.includes('main')) {
    const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
    const commonJsScriptText = `
    //const {CSG, CAG} = require('${csgBasePath}/csg')
    const {CSG, CAG} = require('./node_modules/@jscad/csg')
    const {square, circle, polygon} = require('${csgBasePath}/scad-api').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}/scad-api').primitives3d
    const {color} = require('${csgBasePath}/scad-api').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}/scad-api').extrusions
    const {rotate, translate, scale, hull, chain_hull, expand, contract} = require('${csgBasePath}/scad-api').transformations
    const {union, difference, intersection} = require('${csgBasePath}/scad-api').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}/scad-api').maths
    const {hsl2rgb} = require('${csgBasePath}/scad-api').color
    const {vector_text} = require('${csgBasePath}/scad-api').text
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
  console.log(typeof jscadScript)
  let params = {}
  let paramDefinitions = []
  if (hasScriptGotParameters(jscadScript)) {
    paramDefinitions = jscadScript.getParameterDefinitions()
    params = getParameterDefinitionsCLI(jscadScript.getParameterDefinitions)// jscadScript.getParameterDefinitions()
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

module.exports = {loadScript, requireUncached, watchScript}
