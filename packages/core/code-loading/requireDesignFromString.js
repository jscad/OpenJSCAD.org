const path = require('path')
const requireFromString = require('require-from-string')
const validateDesignModule = require('./validateDesignModule')

/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {string} scriptAsText the string of the design
 * @param  {string} filePath
 * @param  {function} requireFn : the 'require' function to use: defaults to the standard 'require' under node.js
 * @param  {string} csgBasePath='../../../../core/tmp/csg.js : relative path or  '@jscad/csg'
 */
const requireDesignFromString = (scriptAsText, filePath, requireFn = require, csgBasePath = '@jscad/csg/api') => {
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
    scriptRootModule = requireFromString(commonJsScriptText, filePath)
  }
  validateDesignModule(scriptRootModule)
  const design = Object.assign(
    {getParameterDefinitions: () => []},
    scriptRootModule
  )
  return design
}

module.exports = requireDesignFromString
