/**
 * SVG Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing SVG files. Drag the whole SVGImport folder into JSCAD
 * @tags svg, import
 * @authors Simon Clark
 * @licence MIT License
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { translate, extrudeLinear, polygon } from '@jscad/modeling'

import { deserialize } from '@jscad/io'

/*
 * Load the SVG outlines from the given file.
 *
 * NOTE: This function is required in V3 as imports of non-standard file types are not possible
 */
const loadSvg = (filepath) => {
  const mimeType = 'image/svg+xml'

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

  return deserialize({ output: 'geometry' }, mimeType, content)
}

// Load the SVG files
const panda = loadSvg('./babypanda2.svg')

export const main = () => {
  // SVG shapes are imported as an array of paths. So, convert the paths to polygons.
  const poly = panda.map((path) => polygon({ points: path.points }))

  return translate([-40, 50, 0], extrudeLinear({ height: 2 }, poly))
}
