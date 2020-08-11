/* title      : Torus()
// authors     : Rene K. Mueller
// license    : MIT License
// description: testing torus() function
// Tags: primitives, torus
*/

const { torus } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms

const main = () => {
  return [
    torus(),
    translate([0, 10, 0], torus({ innerRadius: 0.5, innerSegments: 8 })),

    translate([-10, 0, 0], torus({ innerSegments: 4 })),
    translate([-10, 10, 0], torus({ innerSegments: 4, innerRotation: 45 })),
    translate([-10, 20, 0], torus({ innerSegments: 4, outerSegments: 4, innerRotation: degToRad(45) })),
    translate([-10, 30, 0], torus({ innerSegments: 4, outerSegments: 5, innerRotation: degToRad(45) })),

    translate([10, 0, 0], torus({ outerSegments: 8 })),
    translate([20, 0, 0], torus({ outerSegments: 4 })),
    translate([30, 0, 0], torus({ outerSegments: 3 }))
  ]
}

module.eports = { main }
