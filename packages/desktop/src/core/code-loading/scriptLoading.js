const path = require('path')
const getParameterValuesFromParameters = require('@jscad/core/parameters/getParameterValuesFromParameters')
const requireFromString = require('./requireFromString')

const doesModuleExportParameterDefiniitions = moduleToCheck => {
  return moduleToCheck && 'getParameterDefinitions' in moduleToCheck
}

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {} filePath
 * @param  {} csgBasePath='../../../../core/tmp/csg.js : relative path or  '@jscad/csg'
 */
function loadScript (scriptAsText, filePath, csgBasePath = '@jscad/csg/api') {
  if (csgBasePath.includes('.')) {
    csgBasePath = path.resolve(__dirname, csgBasePath)
  }
  // console.log('loading script using jscad/csg base path at:', csgBasePath)
  let scriptRootModule
  // && !scriptAsText.includes('require(')
  if ((!scriptAsText.includes('module.exports')) && scriptAsText.includes('main')) {
    const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
    const commonJsScriptText = `
    const {CSG, CAG} = require('${csgBasePath}').csg
    const {square, circle, polygon} = require('${csgBasePath}').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}').primitives3d
    const {colorize, hsl2rgb} = require('${csgBasePath}').colors
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}').extrusions
    const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract} = require('${csgBasePath}').transformations
    const {union, difference, intersection} = require('${csgBasePath}').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}').maths
    const {vector_text, vector_char} = require('${csgBasePath}').text
    const {OpenJsCad} = require('${csgBasePath}').OpenJsCad
    const {echo} = require('${csgBasePath}').debug

    ${scriptAsText}
    module.exports.main = main
    ${getParamsString}
    `
    scriptRootModule = requireFromString(commonJsScriptText, filePath)
  } else {
    scriptRootModule = require(filePath)
  }
  if ((typeof (scriptRootModule) === 'function')) { // single export ???
    console.warn('please use named exports for your main() function !')
    scriptRootModule = { main: scriptRootModule }
  }
  let params = {}
  let paramDefinitions = []
  if (doesModuleExportParameterDefiniitions(scriptRootModule)) {
    paramDefinitions = scriptRootModule.getParameterDefinitions() || []
    params = getParameterValuesFromParameters(scriptRootModule.getParameterDefinitions)
  }
  return { params, paramDefinitions, scriptRootModule: scriptRootModule }
}

module.exports = { loadScript }
