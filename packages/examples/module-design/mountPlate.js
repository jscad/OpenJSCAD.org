/*
// title       : Modular Project Design Example
// author      : Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the structure of a multi-file project
// file        : mountPlate.js
// tags        : project, module, code, files, subfolder
*/

import { cuboid } from '@jscad/modeling'

export const getParameterDefinitions = () => [
  { name: 'plate-group', type: 'group', initial: 'open', caption: 'Mounting Plate' },
  { name: 'plateLength', type: 'float', initial: 25, caption: 'length', min: 25, max: 200 }
]

export const create = (length) => cuboid({ size: [length, 10, 1] })
