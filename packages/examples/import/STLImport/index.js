/**
 * STL Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing STL files. Drag the whole STLImport folder into JSCAD
 * @tags stl, import
 * @authors Simon Clark
 * @licence MIT License
 */

const { translate, scale, rotateZ } = require('@jscad/modeling').transforms
const { union } = require('@jscad/modeling').booleans

// Load the STL files using require
const sculpture = require('./3d_sculpture-VernonBussler.stl')
const frog = require('./frog-OwenCollins.stl')

const main = () => union(
  translate([0, 0, 13], rotateZ(-Math.PI / 3, scale([0.25, 0.25, 0.25], frog))),
  translate([-5, 6, 0], sculpture)
)

module.exports = { main }
