/*
// title       : Birthday Balloons
// author      : Z3 Dev, Simon Clark
// license     : MIT License
// description : Example of interactive parameters
// file        : balloons.js
// tags        : parameters, select, choice, checkbox, color, picker, slider, date, input, parameter
*/

const jscad = require('@jscad/modeling')
const { ellipsoid, line } = jscad.primitives
const { translate, scale, rotateX, center } = jscad.transforms
const { vectorText } = jscad.text
const { extrudeLinear } = jscad.extrusions
const { union } = jscad.booleans
const { colorize, hexToRgb } = jscad.colors
const { expand } = require('@jscad/modeling').expansions

const options = { resolution: 32 }

const getParameterDefinitions = () => {
  return [
    { name: 'balloon', type: 'group', caption: 'Balloons' },
    { name: 'isBig', type: 'checkbox', checked: true, initial: '20', caption: 'Big?' },
    { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color?' },
    { name: 'count', type: 'slider', initial: 4, min: 2, max: 10, step: 1, caption: 'How many?' },
    { name: 'friend', type: 'group', caption: 'Friend' },
    { name: 'name', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Name?', placeholder: '20 characters' },
    { name: 'birthdate', type: 'date', initial: '', min: '1915-01-01', max: '2030-12-31', caption: 'Birthday?', placeholder: 'YYYY-MM-DD' },
    { name: 'age', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Age?' }
  ]
}

const initializeOptions = (params) => {
  // use the checkbox to determine the size of the sphere
  options.b_radius = (params.isBig === true) ? 20 : 10
  // use the color chooser to determine the color of the sphere
  options.b_color = hexToRgb(params.color)
}

const text = (message, extrusionHeight, characterLineWidth) => {
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
  return center({ axes: [true, true, false] }, union(lineSegments3D))
}

function createSingleBalloon () {
  return ellipsoid({
    radius: [options.b_radius, options.b_radius, 1.4 * options.b_radius],
    segments: options.resolution
  })
}

const createBalloons = (params) => {
  const balloon = createSingleBalloon()
  const out = []
  const startingAngle = 360 * Math.random()
  const angleSpread = 360 / params.count

  for (let i = 0; i < params.count; i++) {
    const angle = Math.floor(startingAngle + (angleSpread * i)) % 360
    const x = Math.cos(angle * Math.PI / 180) * 2 * options.b_radius
    const y = Math.sin(angle * Math.PI / 180) * 2 * options.b_radius
    const z = options.b_radius * 4 + (50 * Math.random())
    const aBalloon = translate([x, y, z], balloon)
    out.push(aBalloon)
  }
  return colorize(options.b_color, union(out))
}

const createSalutation = (name) => {
  return text(name, 2, 2)
}

const createAge = (age) => {
  let age3D = text(age.toString(), 10, 3)
  age3D = scale([2, 2, 2], age3D)
  age3D = rotateX(Math.PI / 2, age3D)
  age3D = translate([0, 30, 30], age3D)
  return age3D
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

const main = (params) => {
  initializeOptions(params)
  const balloonScene = []

  balloonScene.push(createBalloons(params))
  balloonScene.push(createSalutation(params.name))
  balloonScene.push(createAge(params.age))
  balloonScene.push(createBirthDate(params.birthdate))

  return balloonScene
}

module.exports = { main, getParameterDefinitions }
