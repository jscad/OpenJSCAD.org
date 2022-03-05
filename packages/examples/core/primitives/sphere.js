/**
 * Spheres of all sorts
 * @category Creating Shapes
 * @skillLevel 1
 * @description Demonstrating the sphere() and geodesicSphere() functions
 * @tags sphere, geodesic, geodesicsphere, ellipsoid, shape
 * @authors Rene K. Mueller
 * @licence MIT License
 */

const { sphere, geodesicSphere } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms

const main = () => [
  translate([15, -25, 0], sphere({ radius: 10, segments: 12 })),
  translate([-15, -25, 0], geodesicSphere({ radius: 10, frequency: 6 })),

  translate([15, 0, 0], sphere({ radius: 10, segments: 32 })),
  translate([-15, 0, 0], geodesicSphere({ radius: 10, frequency: 24 })),

  scale([0.5, 1, 2], translate([15, 25, 0], sphere({ radius: 10, segments: 32 }))),
  scale([0.5, 2, 1], translate([30, 25, 0], sphere({ radius: 10, segments: 32 }))),
  scale([0.5, 1, 2], translate([-15, 25, 0], geodesicSphere({ radius: 10, frequency: 18 }))),
  scale([0.5, 2, 1], translate([-30, 25, 0], geodesicSphere({ radius: 10, frequency: 18 })))
]

module.exports = { main }
