/** transform an old type 'implicit imports' jscad script into one with explicit imports
 * @param  {} source
 * @param  {} apiMainPath
 */
const modulifySource = (source, apiMainPath) => {
  const getParamsString = source.includes('getParameterDefinitions')
    ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
  const updatedSource = `
    const {CSG, CAG} = require('${apiMainPath}').csg
    const {square, circle, polygon, rectangle, ellipse, roundedRectangle} = require('${apiMainPath}').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${apiMainPath}').primitives3d
    const {color} = require('${apiMainPath}').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${apiMainPath}').extrusions
    const {rotate, translate, scale, mirror, hull, chain_hull, expand, contract, transform} = require('${apiMainPath}').transformations
    const {union, difference, intersection} = require('${apiMainPath}').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${apiMainPath}').maths
    const {hsl2rgb} = require('${apiMainPath}').color
    const {vector_text, vector_char} = require('${apiMainPath}').text
    const {OpenJsCad} = require('${apiMainPath}').OpenJsCad
    const {echo} = require('${apiMainPath}').debug 
    
    ${source}

    module.exports = {main}
    ${getParamsString}
  `
  return updatedSource
}

module.exports = modulifySource
