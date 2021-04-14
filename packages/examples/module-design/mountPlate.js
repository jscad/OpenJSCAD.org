/*
// title       : Modular Project Design Example
// author      : Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the structure of a multi-file project
// file        : mountPlate.js
// tags        : project, module, code, files, subfolder
*/

const { cuboid } = require('@jscad/modeling').primitives

const getParameterDefinitions = () => {
  return [
    { name: 'plate-group', type: 'group', initial: 'open', caption: 'Mounting Plate' },
    { name: 'plateLength', type: 'float', initial: 25, caption: 'length', min: 50, max: 200 }
  ]
}

const create = (length) => {
  return cuboid({ size: [length, 10, 1] })
}

module.exports = { create, getParameterDefinitions }
