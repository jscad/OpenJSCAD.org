/*
// title       : Modular Project Design Example
// author      : Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the structure of a multi-file project
// file        : sphereShape.js
// tags        : project, module, code, files, subfolder
*/

import { sphere, colorize, translateZ } from '@jscad/modeling'

export const sphereShape = (radius) => colorize([1, 0, 0, 1], translateZ(radius, sphere({ radius })))
