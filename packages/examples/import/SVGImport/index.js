/**
 * SVG Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing SVG files. Drag the whole SVGImport folder into JSCAD
 * @tags svg, import
 * @authors Simon Clark
 * @licence MIT License
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
