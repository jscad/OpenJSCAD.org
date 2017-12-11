const fs = require('fs')

function getParameterDefinitionsCLI (getParameterDefinitions, param) {
  if (typeof getParameterDefinitions !== 'undefined') {
    var p = {}
    var pa = getParameterDefinitions()
    for (var a in pa) { // defaults, given by getParameterDefinitions()
      var x = pa[a]
      if ('default' in x) {
        p[pa[a].name] = pa[a].default
      } else if ('initial' in x) {
        p[pa[a].name] = pa[a].initial
      } else if ('checked' in x) {
        p[pa[a].name] = pa[a].checked
      }
    }
    for (var a in param) { // given by command-line
      p[a] = param[a]
    }
    return p
  } else {
    return param
  }
}

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

function loadScript (filePath, csgBasePath = './node_modules/@jscad/scad-api') {
  const scriptAsText = fs.readFileSync(filePath, 'utf8')
  let jscadScript
  if (!scriptAsText.includes('module.exports') && scriptAsText.includes('main')) {
    const getParamsString = scriptAsText.includes('getParameterDefinitions')
      ? 'module.exports.getParameterDefinitions = getParameterDefinitions' : ''
    const commonJsScriptText = `
    const {CSG, CAG} = require('../../core/csg.js/csg')
    const {square, circle, polygon} = require('${csgBasePath}').primitives2d
    const {cube, cylinder, sphere, polyhedron, torus} = require('${csgBasePath}').primitives3d
    const {color} = require('${csgBasePath}').color
    const {rectangular_extrude, linear_extrude, rotate_extrude} = require('${csgBasePath}').extrusions
    const {rotate, translate, scale, hull, chain_hull} = require('${csgBasePath}').transformations
    const {union, difference, intersection} = require('${csgBasePath}').booleanOps
    const {sin, cos, tan, sqrt, lookup} = require('${csgBasePath}').maths
    const {hsl2rgb} = require('${csgBasePath}').color
    const {vector_text} = require('${csgBasePath}').text
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
  if (jscadScript && 'getParameterDefinitions' in jscadScript) {
    console.log('getParamDefinitions provided')
    params = getParameterDefinitionsCLI(jscadScript.getParameterDefinitions)// jscadScript.getParameterDefinitions()
  }
  console.log('params', params)
  return {params, jscadScript}
}

module.exports = {loadScript, requireUncached}
