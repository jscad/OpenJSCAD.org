/*
// title       : Align function demonstration
// author      : Simon Clark
// license     : MIT License
// description : Demonstrating aligning shapes using the align function
// file        : align.js
// tags        : align, center, bottom, top, place
*/

const jscad = require('@jscad/modeling')
const { cuboid } = jscad.primitives
const { subtract } = jscad.booleans
const { align } = jscad.transforms

const getParameterDefinitions = () => {
  return [
    { name: 'grouped', type: 'checkbox', checked: false, caption: 'Align as group' },
    { name: 'modes', type: 'choice', caption: 'modes:', values: ['["none","none","none"]', '["center","center","min"]', '["min","min","min"]', '["max","min","center"]'], initial: '["none","none","none"]' },
    { name: 'alignTo', type: 'choice', caption: 'alignTo:', values: ['[0,0,0]', '[null,null,null]', '[10,-10,0]'], initial: '[0,0,0]' }
  ]
}

/**
 * Generates a series of boxes of various sizes, and uses the align function to align them in different ways.
 * @param {Boolean} params.grouped - Treat all objects as a single object.
 * @param {String} params.modes - How to treat alignment on each axis.
 * @param {String} params.alignTo - The point to align to. Null to use the group's bounding box.
 * @returns {geometry}
 */
const main = (params) => {
  const shapes = [
    cuboidFrame({ size: [2, 2, 2], center: [9, 4, 4] }),
    cuboidFrame({ size: [5, 12, 8], center: [8, 7, 10] }),
    cuboidFrame({ size: [6, 6, 6], center: [4, 7, 8] }),
    cuboidFrame({ size: [10, 10, 3], center: [8, 16, 10] })
  ]
  const modes = JSON.parse(params.modes)
  const alignTo = JSON.parse(params.alignTo)
  const grouped = params.grouped
  return align({ modes, alignTo, grouped }, shapes)
}

const cuboidFrame = (opt) => {
  const d = 0.5
  const center = opt.center
  return subtract(
    cuboid(opt),
    cuboid({ size: [opt.size[0], opt.size[1] - d, opt.size[2] - d], center }),
    cuboid({ size: [opt.size[0] - d, opt.size[1], opt.size[2] - d], center }),
    cuboid({ size: [opt.size[0] - d, opt.size[1] - d, opt.size[2]], center })
  )
}
module.exports = { main, getParameterDefinitions }
