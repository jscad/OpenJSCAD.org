/* title      : Rotate Extrude
// author     : Rene K. Mueller
// license    : MIT License
// description: testing extrudeRotate() function
// tags: extrusion, rotate, extrudeRotate
*/
const jscad = require('@jscad/modeling')
console.log(jscad)
const { rectangle, circle, polygon, star } = jscad.primitives
const { translate } = jscad.transforms
const { extrudeRotate } = jscad.extrusions

const main = () => {
  return [

    // smooth torus
    translate([5, 5, 0], extrudeRotate(
      { segments: 32 },
      polygon({points: [[1,0],[3,0],[3,1],[2.2,1],[1.6,2.2],[2,8], [1,8]], closed: true})
    )),

    // Pentagonal ring
    translate([5, -5, 0], extrudeRotate(
      { segments: 5 },
      translate([4, 0, 0], circle({ radius: 1, segments: 32 }))
    )),

    // Shooting star
    translate([-5, -5, 0], extrudeRotate(
      { segments: 32, startAngle: 0, angle: (Math.PI * 0.75), overflow: 'cap' },
      translate([4, 0, 0], star({ }))
    )),

    // Octagonol box
    translate([-5, 5, 0], extrudeRotate(
      { segments: 8 },
      translate([4, 0, 0], rectangle({ size: [1, 3] }))
    ))

  ]
}

module.exports = { main }
