/*
// title       : Sphere
// author      : Rene K. Mueller
// license     : MIT License
// description : testing sphere() and geodesicSphere() functions
// file        : sphere.js
// tags        : sphere, geodesic, geodesicsphere, ellipsoid, shape
*/

const { sphere, geodesicSphere } = require('@jscad/modeling').primitives
const { translate, scale } = require('@jscad/modeling').transforms

const main = () => {
  return [
    translate([15, -25, 0], sphere({ radius: 10, segments: 18 })),
    translate([-15, -25, 0], geodesicSphere({ radius: 10, segments: 18 })),

    translate([15, 0, 0], sphere({ radius: 10, segments: 32 })),
    translate([-15, 0, 0], geodesicSphere({ radius: 10, segments: 32 })),

    scale([0.5, 1, 2], translate([15, 25, 0], sphere({ radius: 10, segments: 32 }))),
    scale([0.5, 2, 1], translate([30, 25, 0], sphere({ radius: 10, segments: 32 }))),
    scale([0.5, 1, 2], translate([-15, 25, 0], geodesicSphere({ radius: 10, segments: 32 }))),
    scale([0.5, 2, 1], translate([-30, 25, 0], geodesicSphere({ radius: 10, segments: 32 })))
  ]
}

module.exports = { main }
