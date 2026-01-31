/**
 * STL Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing STL files. Drag the whole STLImport folder into JSCAD
 * @tags stl, import
 * @authors Simon Clark
 * @licence MIT License
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { translate, scale, rotateZ } from '@jscad/modeling'
import { union } from '@jscad/modeling'

import { deserialize } from '@jscad/io'

/*
 * Load the STL mesh from the given file.
 *
 * NOTE: This function is required in V3 as imports of non-standard file types are not possible
 */
const loadStl = (filepath) => {
  const mimeType = 'model/stl'

  let fullpath = filepath
  if (!path.isAbsolute(fullpath)) {
    // Get the directory name of the current module
    const filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filename)

    fullpath = path.join(dirname, filepath)
  }

  const results = fs.readFileSync(fullpath)
  const content = results.buffer
    ? results.buffer.slice(results.byteOffset, results.byteOffset + results.length)
    : results

  return deserialize({output: 'geometry'}, mimeType, content)
}

// Load the STL files
const sculpture = loadStl('./3d_sculpture-VernonBussler.stl')
const frog = loadStl('./frog-OwenCollins.stl')

export const main = () => {
  return union(
    translate([0, 0, 13], rotateZ(-Math.PI / 3, scale([0.25, 0.25, 0.25], frog))),
    translate([-5, 6, 0], sculpture)
  )
}

