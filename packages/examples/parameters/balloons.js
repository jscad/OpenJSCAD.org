/**
 * Birthday Balloons
 * @category Parameters
 * @skillLevel 1
 * @description Example of building models from interactive parameters
 * @tags parameters, select, choice, checkbox, color, picker, slider, date, input, parameter
 * @authors Z3 Dev, Simon Clark
 * @licence MIT License
 */

import { colorize, hexToRgb, subtract, union, hullChain } from '@jscad/modeling'
import { extrudeFromSlices, extrudeLinear, slice } from '@jscad/modeling'
import { mat4, TAU, measureBoundingBox } from '@jscad/modeling'
import { circle, ellipsoid, vectorText } from '@jscad/modeling'
import { translate, scale, rotateX, center } from '@jscad/modeling'

const options = { segments: 32 }

export const getParameterDefinitions = () => [
  { name: 'balloon', type: 'group', caption: 'Balloons' },
  { name: 'isBig', type: 'checkbox', checked: true, initial: '20', caption: 'Big?' },
  { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color?' },
  { name: 'count', type: 'slider', initial: 4, min: 2, max: 10, step: 1, caption: 'How many?' },
  { name: 'friend', type: 'group', caption: 'Friend' },
  { name: 'name', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Name?', placeholder: '20 characters' },
  { name: 'birthdate', type: 'date', initial: '', min: '1915-01-01', max: '2030-12-31', caption: 'Birthday?', placeholder: 'YYYY-MM-DD' },
  { name: 'age', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Age?' }
]

const initializeOptions = (params) => {
  // use the checkbox to determine the size of the sphere
  options.b_radius = (params.isBig === true) ? 20 : 10
  // use the color chooser to determine the color of the sphere
  options.b_color = hexToRgb(params.color)
}

const pathToSegment = (path, corner) => {
  const points = path.points.slice()
  if (path.isClosed) points.push(path.points[0])

  const corners = points.map((point) => translate(point, corner))
  return hullChain(corners)
}

// Build text by creating the font strokes (2D), then extruding up (3D).
const text = (message, extrusionHeight, characterLineWidth) => {
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

  return center({ axes: [true, true, false] }, message3D)
}

const createSingleBalloon = (params) => {
  let t = rotateX(TAU / 4, text(params.age.toString(), 2, 2))
  const m = measureBoundingBox(t)
  const x = (options.b_radius * 0.70) / Math.max(m[1][0], m[1][2])
  const y = options.b_radius * 3
  const z = x
  t = translate([0, y / 2, 0], scale([x, y, z], t))

  const b = ellipsoid({
    radius: [options.b_radius, options.b_radius, options.b_radius],
    segments: options.segments
  })
  return subtract(b, t)
}

const createRope = (to) => {
  const base = slice.fromGeom2(circle({ radius: 0.25 }))
  const rope = extrudeFromSlices({
    callback: (p, i, b) => {
      if (i === 1) {
        const matrix = mat4.fromTranslation(mat4.create(), to)
        b = slice.transform(matrix, b)
      }
      return b
    }
  }, base)
  return colorize([0, 0, 0], rope)
}

const createBalloons = (params) => {
  const balloon = createSingleBalloon(params)
  const out = []
  const startingAngle = 360 * Math.random()
  const angleSpread = 360 / params.count

  const ropeOffset = options.b_radius - 1
  for (let i = 0; i < params.count; i++) {
    const angle = Math.floor(startingAngle + (angleSpread * i)) % 360
    const x = Math.cos(angle * TAU / 2 / 180) * 2 * options.b_radius
    const y = Math.sin(angle * TAU / 2 / 180) * 2 * options.b_radius
    const z = options.b_radius * 4 + (50 * Math.random())
    const aBalloon = colorize(options.b_color, translate([x, y, z], balloon))
    const aRope = createRope([x, y, z - ropeOffset])
    out.push(aBalloon, aRope)
  }
  return out
}

const createSalutation = (name) => {
  let salutation = 'Happy Birthday!'
  if (name.length > 0) {
    salutation = `Happy Birthday, ${name}!`
  }
  return translate([0, -10, 0], scale([0.5, 0.5, 0.5], text(salutation, 2, 2)))
}

const createBirthDate = (birthDate) => {
  const birthDateStr = birthDate.toString()
  if (birthDateStr.length === 0) {
    return []
  }
  let birthDate3D = text(birthDate.toString(), 2, 1)
  birthDate3D = scale([0.7, 0.7, 0.7], birthDate3D)
  birthDate3D = translate([0, -30, 0], birthDate3D)
  return birthDate3D
}

export const main = (params) => {
  initializeOptions(params)

  const balloonScene = []

  balloonScene.push(createBalloons(params))
  balloonScene.push(createSalutation(params.name))
  balloonScene.push(createBirthDate(params.birthdate))

  return balloonScene
}
