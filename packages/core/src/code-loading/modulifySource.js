/** transform an old type 'implicit imports' jscad script into one with explicit imports
 * @param  {} source
 * @param  {} apiMainPath
 */
const modulifySource = (source, apiMainPath) => {
  const getParamsString = source.includes('getParameterDefinitions')
    ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
  const updatedSource = `
    const {geom2, geom3, path2, pol2, poly3} = require('${apiMainPath}').geometries

    const {square, circle, polygon, rectangle, ellipse, roundedRectangle} = require('${apiMainPath}').primitives
    const {cube, cylinder, sphere, polyhedron, torus} = require('${apiMainPath}').primitives
    const {colorize, hsl2rgb} = require('${apiMainPath}').colors

    const {extrudeFromSlices, extrudeLinear, extrudeRectangular, extrudeRotate, slice} = require('${apiMainPath}').extrusions
    const {rotate, translate, scale, mirror, transform} = require('${apiMainPath}').transforms
    const {hull, hullChain} = require('${apiMainPath}').hulls
    const {expand, offset} = require('${apiMainPath}').expansions
    const {union, difference, intersection} = require('${apiMainPath}').booleans
    const { measureArea, measureBounds, measureVolume} = require('${apiMainPath}').measurements

    const connectors = require('${apiMainPath}').connectors

    const {vec2, vec3, vec4, constants, line2, line3, mat4, plane, utils} = require('${apiMainPath}').maths

    const {vectorText, vectorChar} = require('${apiMainPath}').text

    ${source}

    module.exports = {main}
    ${getParamsString}
  `
  return updatedSource
}

module.exports = modulifySource
