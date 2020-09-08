/*
// title       : STL Import Demonstration
// author      : Simon Clark
// license     : MIT License
// description : Importing STL files to manipulate and combine. Drag the whole STLImport folder into JSCAD
// file        : STLImport/index.js
// tags        : stl, import
*/

const { translate, scale, rotateZ } = require('@jscad/modeling').transforms
const { union } = require('@jscad/modeling').booleans

// Load the STL files using require
const sculpture = require('./3d_sculpture-VernonBussler.stl')
const frog = require('./frog-OwenCollins.stl')

const main = () => {
  return union(
    translate([0, 0, 13], rotateZ(-Math.PI / 3, scale([0.25, 0.25, 0.25], frog))),
    translate([-5, 6, 0], sculpture)
  )
}

module.exports = { main }
