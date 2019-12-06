/* title      : Stepper Motor
// author     : Derrick Oswald
// license    : MIT License
// description: a simple stepper motor design
// tags: extrusion, extrudeFromSlices, slices
*/

const { circle, cube, cylinder } = require('@jscad/modeling').primitives
const { color } = require('@jscad/modeling').color
const { translate } = require('@jscad/modeling').transforms
const { extrudeFromSlices, slice } = require('@jscad/modeling').extrusions
const { mat4 } = require('@jscad/modeling').math
const { sqrt } = Math

const getParameterDefinitions = () => {
  return ([
    { name: 'motorBody_len', type: 'float', initial: 47.5, step: 0.5, caption: 'Motor length' },
    { name: 'motorBody_width', type: 'float', initial: 42.0, step: 0.5, caption: 'Motor width' },
    { name: 'motorBody_chamfer', type: 'float', initial: 5.0, step: 0.1, caption: 'Motor chamfer' },

    { name: 'motorCap_len', type: 'float', initial: 8.0, step: 0.1, caption: 'Motor cap length' },
    { name: 'motorCap_thickness', type: 'float', initial: 1.0, step: 0.1, caption: 'Motor cap thickness' },
    { name: 'motorCap_chamfer', type: 'float', initial: 2.5, step: 0.1, caption: 'Motor cap chamfer' },

    { name: 'shaft_len', type: 'float', initial: 22.0, step: 0.5, caption: 'Shaft length' },
    { name: 'shaft_radius', type: 'float', initial: 2.5, step: 0.1, caption: 'Shaft radius' },

    { name: 'motorRing_radius', type: 'float', initial: 11.0, step: 0.1, caption: 'Ring radius' },
    { name: 'motorRing_height', type: 'float', initial: 2.0, step: 0.1, caption: 'Ring height' },

    { name: 'mountingholes_fromcent', type: 'float', initial: 15.5, step: 0.1, caption: 'Mounting hole offset' },
    { name: 'mountingholes_radius', type: 'float', initial: 1.5, step: 0.1, caption: 'Mounting hole radius' },
    { name: 'mountingholes_depth', type: 'float', initial: 4.5, step: 0.1, caption: 'Mounting hole depth' }
  ])
}

const main = (parameters) => {
  const length = parameters.motorBody_len / 2
  const width = parameters.motorBody_width / 2
  const ch = sqrt(2.0) * width - sqrt(0.5) * parameters.motorBody_chamfer
  const ch2 = sqrt(2.0) * width - sqrt(0.5) * parameters.motorCap_chamfer
  const depth = parameters.mountingholes_depth
  const offset = parameters.mountingholes_fromcent

  const cubeColor = [0.67843137254901960784313725490196, 0.70588235294117647058823529411765, 0.70588235294117647058823529411765]
  const fooColor = [0.87058823529411764705882352941176, 0.89803921568627450980392156862745, 0.90588235294117647058823529411765]
  let body = CSG.roundedCube({
    center: [0, 0, 0],
    radius: [length - parameters.motorCap_len, width - parameters.motorCap_thickness, width - parameters.motorCap_thickness],
    roundradius: 0.2,
    resolution: 16
  })
  body = color(cubeColor, body)
  let xcube = cube({
    center: [0, 0, 0],
    radius: [length, ch, ch]
  })
  xcube = color(cubeColor, xcube)
  body = intersect(body, rotateX(degToRad(45), xcube))

  var cube2 = CSG.roundedCube({
    center: [length - (parameters.motorCap_len / 2.0), 0, 0],
    radius: [(parameters.motorCap_len / 2.0), width, width],
    roundradius: 0.2,
    resolution: 16
  })
  cube2 = cube2.setColor(fooColor)
  var cube3 = cube2.translate([-(parameters.motorBody_len - parameters.motorCap_len), 0, 0])
  xcube = cube({
    center: [0, 0, 0],
    radius: [length, ch2, ch2]
  })
  xcube = xcube.setColor(fooColor)
  xcube = xcube.rotateX(45)
  cube2 = cube2.intersect(xcube)
  cube3 = cube3.intersect(xcube)

  /*pipe(
    cube({
      center: [0, 0, 0],
      radius: [length, ch2, ch2]
    }),
    color(fooColor),
    rotateX(45)
  )*/

  const ring = color([0.81176470588235294117647058823529, 0.84313725490196078431372549019608, 0.85098039215686274509803921568627],
    cylinder({
      start: [length, 0, 0],
      end: [length + parameters.motorRing_height, 0, 0],
      radius: parameters.motorRing_radius,
      resolution: 100
    })
  )

  const shaft = color([0.9, 0.91, 0.91],
    cylinder({
      start: [length + parameters.motorRing_height, 0, 0],
      end: [length + parameters.motorRing_height + parameters.shaft_len, 0, 0],
      radius: parameters.shaft_radius,
      resolution: 50
    })
  )

  const mountinghole = color([0.2, 0.2, 0.2],
    cylinder({
      start: [-depth, 0, 0],
      end: [0, 0, 0],
      radius: parameters.mountingholes_radius,
      resolution: 20
    })
  )

  let motor = cube.union([cube2, cube3, ring, shaft])
  motor = motor.subtract(
    mountinghole.translate([length, offset, offset]),
    mountinghole.translate([length, offset, -offset]),
    mountinghole.translate([length, -offset, offset]),
    mountinghole.translate([length, -offset, -offset])
  )

  return translate([0, 0, width], motor)
}

module.exports = { main, getParameterDefinitions }
