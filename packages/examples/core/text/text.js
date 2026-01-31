/**
 * Basic Text Creation
 * @category Creating Shapes
 * @skillLevel 10
 * @description Demonstrating methods of building 3D text
 * @tags text, font, characters
 * @authors Simon Clark
 * @licence MIT License
 */

import { union, extrudeLinear, hullChain, circle, sphere, vectorText, translate } from '@jscad/modeling'

export const getParameterDefinitions = () => [
  { name: 'outline_string', initial: 'Outline', type: 'text', caption: 'Outline Text', size: 30 },
  { name: 'flat_string', initial: 'Flat', type: 'text', caption: 'Flat Text', size: 30 },
  { name: 'round_string', initial: 'Round', type: 'text', caption: 'Round Text', size: 30 }
]

export const main = (params) => {
  const outlineText = buildOutlineText(params.outline_string, 2)
  const flatText = buildFlatText(params.flat_string, 2, 2)
  const roundText = buildRoundText(params.round_string, 2)

  return [outlineText, flatText, roundText]
}

const pathToSegment = (path, corner) => {
  const points = path.points.slice()
  if (path.isClosed) points.push(path.points[0])

  const corners = points.map((point) => translate(point, corner))
  return hullChain(corners)
}

// Build text by creating the font strokes (2D) using the given characterLineWidth.
const buildOutlineText = (message, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegments = []

  const lines = vectorText({ xOffset: 0, yOffset: 0 }, message) // array of lines
  lines.forEach((line) => {
    // each line is an array of vectorChar
    line.chars.forEach((character) => {
      // each character is an array of paths
      character.paths.forEach((path) => {
        // convert path to 2D line segment
        lineSegments.push(pathToSegment(path, lineCorner))
      })
    })
  })

  const message2D = union(lineSegments)
  return translate([0, 35, 0], message2D)
}

// Build text by creating the font strokes (2D) using the given characterLineWidth,
// then extruding up (3D).
const buildFlatText = (message, extrusionHeight, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegments = []

  const lines = vectorText({ xOffset: 0, yOffset: 0 }, message) // array of lines
  lines.forEach((line) => {
    // each line is an array of vectorChar
    line.chars.forEach((character) => {
      // each character is an array of paths
      character.paths.forEach((path) => {
        // convert path to 2D line segment
        lineSegments.push(pathToSegment(path, lineCorner))
      })
    })
  })

  const message2D = union(lineSegments)
  const message3D = extrudeLinear({ height: extrusionHeight }, message2D)
  return translate([0, 0, 0], message3D)
}

// Build text by creating the font strokes (3D) using the given characterDiameter.
const buildRoundText = (message, characterDiameter) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterDiameter / 2
  const lineCorner = sphere({ radius: lineRadius, center: [0, 0, lineRadius], segments: 16 })

  const lineSegments = []

  const lines = vectorText({ xOffset: 0, yOffset: 0 }, message) // array of lines
  lines.forEach((line) => {
    // each line is an array of vectorChar
    line.chars.forEach((character) => {
      // each character is an array of paths
      character.paths.forEach((path) => {
        // convert path to 3D line segment
        lineSegments.push(pathToSegment(path, lineCorner))
      })
    })
  })

  const message3D = union(lineSegments)
  return translate([0, -35, 0], message3D)
}
