/*
// title       : Basic Text Creation
// author      : Simon Clark
// license     : MIT License
// description : Demonstrating building 3D text
// file        : text.js
// tags        : text, font, characters
*/

const jscad = require('@jscad/modeling')
const { sphere, line, cylinder } = jscad.primitives
const { translate, rotateX, rotateZ, center } = jscad.transforms
const { vectorText } = jscad.text
const { extrudeLinear } = jscad.extrusions
const { union } = jscad.booleans
const { expand } = jscad.expansions

const getParameterDefinitions = () => {
  return [
    { name: 'flat_string', initial: 'Flat', type: 'text', caption: 'Flat Text', size: 30 },
    { name: 'round_string', initial: 'Round', type: 'text', caption: 'Round Text', size: 30 }
  ]
}

const main = (params) => {
  const flatText = buildFlatText(params.flat_string, 4, 2)
  const roundText = buildRoundText(params.round_string, 3)

  return [flatText, roundText]
}

// Build text by expanding the font strokes, then extruding up.
const buildFlatText = (message, extrusionHeight, characterLineWidth) => {
  if (message === undefined || message.length === 0) return []
  const lineSegments3D = []
  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    const segmentShape = extrudeLinear(
      { height: extrusionHeight },
      expand({ delta: characterLineWidth, corners: 'round', segments: 16 }, line(segmentPoints))
    )
    lineSegments3D.push(segmentShape)
  })

  const messageObject = center([true, true, false], union(lineSegments3D))
  return translate([0, 15, 0], messageObject)
}

// -- simplistic circularExtrude done with cylinders between points and spheres at each point.
const buildRoundText = (message, p) => {
  const baseSphere = sphere({ radius: p })
  if (message === undefined || message.length === 0) return []
  const lineSegments3D = []
  const lineJoints3D = []
  const lineSegmentPointArrays = vectorText({ x: 0, y: 0, input: message }) // line segments for each character
  lineSegmentPointArrays.forEach((segmentPoints) => { // process the line segment
    for (let i = 0; i < segmentPoints.length; i++) {
      lineJoints3D.push(translate([segmentPoints[i][0], segmentPoints[i][1], 0], baseSphere))
      if (i) lineSegments3D.push(cylinderBetweenPoints(segmentPoints[i - 1], segmentPoints[i], p))
    }
  })

  const messageObject = center([true, true, false], union(lineJoints3D, lineSegments3D))
  return translate([0, -15, 0], messageObject)
}

const cylinderBetweenPoints = (point1, point2, radius) => {
  const length = Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
  let cyl = translate([0, 0, length / 2], cylinder({ height: length, radius: radius }))
  cyl = rotateX(Math.PI / 2, cyl)
  let angle = Math.atan((point1[0] - point2[0]) / (point1[1] - point2[1]))
  if (point1[1] < point2[1]) angle += Math.PI
  cyl = rotateZ(-angle, cyl)
  cyl = translate([point1[0], point1[1], 0], cyl)
  return cyl
}

module.exports = { main, getParameterDefinitions }
