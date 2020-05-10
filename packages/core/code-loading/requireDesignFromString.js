const path = require('path')
const requireFromString = require('require-from-string')
const validateDesignModule = require('./validateDesignModule')

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {string} scriptAsText the string of the design
 * @param  {string} filePath
 * @param  {function} requireFn : the 'require' function to use: defaults to the standard 'require' under node.js
 * @param  {string} apiBasePath='../../../../core/tmp/modeling.js : relative path or  '@jscad/modeling'
 */
const requireDesignFromString = (scriptAsText, filePath, requireFn = require, apiBasePath = '@jscad/modeling') => {
  if (apiBasePath.includes('.')) {
    apiBasePath = path.resolve(__dirname, apiBasePath)
  }
  // console.log('loading script using jscad/modeling base path at:', apiBasePath)
  let scriptRootModule
  if ((!scriptAsText.includes('module.exports')) && scriptAsText.includes('main')) {
    const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
    const commonJsScriptText = `
    const {square, circle, polygon} = require('${apiBasePath}').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${apiBasePath}').primitives3d
    const {color} = require('${apiBasePath}').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${apiBasePath}').extrusions
    const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract} = require('${apiBasePath}').transformations
    const {union, difference, intersection} = require('${apiBasePath}').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${apiBasePath}').maths
    const {hsl2rgb} = require('${apiBasePath}').color
    const {vector_text, vector_char} = require('${apiBasePath}').text
    const {OpenJsCad} = require('${apiBasePath}').OpenJsCad
    const {echo} = require('${apiBasePath}').debug
    
    ${scriptAsText}
    module.exports.main = main
    ${getParamsString}
    `
    scriptRootModule = requireFromString(commonJsScriptText, filePath)
  }
  validateDesignModule(scriptRootModule)
  const design = Object.assign(
    { getParameterDefinitions: () => [] },
    scriptRootModule
  )
  return design
}

module.exports = requireDesignFromString
