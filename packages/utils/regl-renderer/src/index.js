import { makeDrawMultiGrid as drawGrid } from './rendering/commands/drawGrid/makeDrawMultiGrid.js'
import { drawAxis } from './rendering/commands/drawAxis/index.js'
import { drawMesh } from './rendering/commands/drawMesh/index.js'
import { drawLines } from './rendering/commands/drawLines/index.js'
const commands = {
  drawGrid,
  drawAxis,
  drawMesh,
  drawLines,
}

import { prepareRender } from './rendering/render.js'
import { entitiesFromSolids } from './geometry-utils-V2/entitiesFromSolids.js'

import * as camera from './cameras/camera.js'
import * as orthographic from './cameras/orthographicCamera.js'
import * as perspective from './cameras/perspectiveCamera.js'
const cameras = {
  camera,
  orthographic,
  perspective,
}

import * as orbit from './controls/orbitControls.js'
const controls = {
  orbit,
}

export {
  cameras,
  commands,
  controls,
  prepareRender,
  entitiesFromSolids,
}
