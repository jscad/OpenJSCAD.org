const jscad = require('@jscad/modeling')
const { color,
  connectors,
  geometry,
  math,
  primitives,
  text,
  utils,

  booleans,
  expansions,
  extrusions,
  hulls,
  measurements,
  transforms } = jscad

const { cuboid, sphere, cylinder, circle, star } = primitives
const { translate, rotate, scale } = transforms

console.log('jscad', jscad)
const main = () => {
  return [
    //rotate([0, 0, 0], cylinder({ radius: 0.1 })),
    cylinder({ radius: 0.5 }),
    translate([0, 5, 0], cylinder({size: 2.5}))
    /* circle({ diameter: 10, segments: 64 }),
    circle({ radius: 10, segments: 64 }),
    cuboid(),
    sphere(),
    translate([10, 5, 0], [jscad.primitives.cylinder({ radius: 0.5, segments: 64 })]),
    rotate([0, 10, 2], cylinder({ radius: 0.1 })),
    jscad.primitives.arc(),
    jscad.primitives.ellipse(),
    rotate([0, 10, 2], star())*/
  ]
}

module.exports = { main }
