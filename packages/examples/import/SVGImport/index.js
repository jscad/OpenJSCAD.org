/*
// title       : SVG Import Demonstration
// author      : Simon Clark
// license     : MIT License
// description : Importing SVG files to manipulate and combine. Drag the whole SVGImport folder into JSCAD
// file        : SVGImport/index.js
// tags        : svg, import
*/

const { translate } = require('@jscad/modeling').transforms
const { extrudeLinear } = require('@jscad/modeling').extrusions
const { polygon } = require('@jscad/modeling').primitives

// Load the SVG files using require
const panda = require('./babypanda2.svg')

const main = () => {
  // SVG shapes are imported as an array of paths. We want to convert those to polygons to extrude.
  const poly = panda.map((shape) => polygon({ points: shape.points }))
  return translate([-40, 50, 0], extrudeLinear({ height: 2 }, poly))
}

module.exports = { main }
