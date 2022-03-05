/**
 * Basic Text Creation
 * @category Creating Shapes
 * @skillLevel 10
 * @description Demonstrating methods of building 3D text
 * @tags text, font, characters
 * @authors Simon Clark
 * @licence MIT License
 */

const jscad = require('@jscad/modeling')
const { union } = jscad.booleans
const { extrudeLinear } = jscad.extrusions
const { hullChain } = jscad.hulls
const { circle, sphere } = jscad.primitives
const { vectorText } = jscad.text
const { translate } = jscad.transforms

const getParameterDefinitions = () => [
  { name: 'outline_string', initial: 'Outline', type: 'text', caption: 'Outline Text', size: 30 },
  { name: 'flat_string', initial: 'Flat', type: 'text', caption: 'Flat Text', size: 30 },
  { name: 'round_string', initial: 'Round', type: 'text', caption: 'Round Text', size: 30 }
]

const main = (params) => {
  const outlineText = buildOutlineText(params.outline_string, 2)
  const flatText = buildFlatText(params.flat_string, 2, 2)
  const roundText = buildRoundText(params.round_string, 2)

  return [outlineText, flatText, roundText]
}

// Build text by creating the font strokes (2D).
const buildOutlineText = (message, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character

  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message2D = union(lineSegments)
  return translate([0, 35, 0], message2D)
}

// Build text by creating the font strokes (2D), then extruding up (3D).
const buildFlatText = (message, extrusionHeight, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = characterLineWidth / 2
  const lineCorner = circle({ radius: lineRadius })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message2D = union(lineSegments)
  const message3D = extrudeLinear({ height: extrusionHeight }, message2D)
  return translate([0, 0, 0], message3D)
}

// Build text by creating the font strokes (3D).
const buildRoundText = (message, p) => {
  if (message === undefined || message.length === 0) return []

  const lineRadius = p / 2
  const lineCorner = sphere({ radius: lineRadius, center: [0, 0, lineRadius], segments: 16 })

  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  const lineSegments = []
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const corners = segmentPoints.map((point) => translate(point, lineCorner))
    lineSegments.push(hullChain(corners))
  })
  const message3D = union(lineSegments)
  return translate([0, -35, 0], message3D)
}

module.exports = { main, getParameterDefinitions }
