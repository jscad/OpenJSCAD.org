// title      : Balloons
// author     : Z3 Dev
// license    : MIT License
// description: multiple balloons, testing new parameters
// file       : balloons.jscad

/*
// title       : 3D Primitives Demonstration
// author      : Rene K. Mueller, Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the basics of a variety of 3D primitives
// file        : primitives3D.js
// tags        : cube, cuboid, sphere, ellipsoid, cylinder, torus, shape, 3d
*/

const jscad = require('@jscad/modeling')
console.log(jscad)
const { cube, cuboid, cylinder, cylinderElliptic, ellipsoid, geodesicSphere, line, roundedCuboid, roundedCylinder, sphere, torus } = jscad.primitives
const { translate, scale } = jscad.transforms
const { vectorText } = jscad.text
const { extrudeRectangular } = jscad.extrusions
const { union } = jscad.booleans
const { colorize, hslToRgb, colorNameToRgb, hexToRgb, hsvToRgb } = jscad.colors

function getParameterDefinitions () {
  return [
    { name: 'balloon', type: 'group', caption: 'Balloons' },
    { name: 'isBig', type: 'checkbox', checked: true, initial: '20', caption: 'Big?' },
    { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color?' },
    { name: 'count', type: 'slider', initial: 3, min: 2, max: 10, step: 1, caption: 'How many?' },
    { name: 'friend', type: 'group', caption: 'Friend' },
    { name: 'name', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Name?', placeholder: '20 characters' },
    { name: 'date', type: 'date', initial: '', min: '1915-01-01', max: '2015-12-31', caption: 'Birthday?', placeholder: 'YYYY-MM-DD' },
    { name: 'age', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Age?' }
  ]
}

// Example of all interactive parameters
// By Z3 Development 2015.10.13

function text (message, height, width) {
  // render the text
  var out = [] // list of 3D objects
  var l = vectorText(0, 0, message) // line segments for each character
  l.forEach(function (segmentPoints) { // process the line segments
    let segmentShape = extrudeRectangular({ width: width, height: height }, line(segmentPoints))
    out.push(segmentShape)
  })
  // center the message
  let messageObject = union(out)
  return messageObject
  var b = message.getBounds()
  var x = 0 - b[0].x - ((b[1].x - b[0].x) / 2)
  var y = 0 - b[0].y - ((b[1].y - b[0].y) / 2)
  var z = 0 - b[0].z - ((b[1].z - b[0].z) / 2)
  return message.translate([x, y, z])
}

function createBalloons (params) {
  // balloon, centered, colored, embossed
  var balloon = ellipsoid({ radius: [options.b_radius, options.b_radius, 1.4 * options.b_radius], segments: options.resolution })
  // var t = text(params.age.toString(), 2, 2).rotateX(90)
  // var x = t.getBounds()
  // x = Math.max(Math.abs(x[0].x), Math.abs(x[0].z))
  // var y = params.b_radius
  // var z = (params.b_radius * 0.70) / x
  // t = t.scale([z, y, z])
  // balloon = balloon.subtract(t)
  if ('b_color' in options) {
    // balloon = colorize(options.b_color. balloon)
  }

  const out = [];
  const startingAngle = 360 * Math.random();
  const angleSpread = 360 / params.count;
  for ( let i = 0; i < params.count; i++) {
    var angle = Math.floor(startingAngle + (angleSpread * i)) % 360
    // balloon
    x = Math.cos(angle * Math.PI / 180) * options.b_radius
    y = Math.sin(angle * Math.PI / 180) * options.b_radius
    z = options.b_radius * 4 + (50 * Math.random())
    var aBalloon = translate([x, y, z], balloon)
    // rope
    // z = z - options.b_radius + 2
    // var rope = cylinder({ start: [0, 0, 0], end: [x, y, z], radius: 0.5, resolution: 12 })
    // rope = colorize([0, 0, 0], rope)
    //
    // aBalloon = aBalloon.union(rope)
    out.push(aBalloon)
  }
  return union(out)
}

function createSalutation (params) {
  // create a message
  var message = 'Happy Birthday'
  if (params.name.length > 0) {
    message = message + ', ' + params.name
  }
  message = message + '!'
  return text(message, 2, 2)
  return scale([0.5,0.5,0.5], text(message, 2, 2))
}

var options = {
  resolution: 32,
}

function main (params) {
  return createSalutation(params);
  // use the checkbox to determine the size of the sphere
  options.b_radius = (params.isBig === true) ? 20 : 10

  // use the color chooser to determine the color of the sphere
  options.b_color = hexToRgb(params.color)

  // create balloons
  const theBalloons = createBalloons(params)
  // // create a message
  var theSalutation = translate([0, -10, 0], createSalutation(params));
  // if (params.date.length > 0) {
  //   var d = text(params.date, 2, 2).scale(0.5).translate([0, -25, 0]);
  //   s = s.union(d);
  // }
  //
  // return a.union([s]);
  return union(theBalloons, theSalutation)
}

module.exports = { main, getParameterDefinitions }
