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

const { cuboid, sphere, cylinder, circle, star } = require('@jscad/modeling').primitives
const { translate, rotate, scale } = transforms

/*
pipeline(
  scale(3),
  translate([0, 5, 0])
)*/

const curry = function (fn) {
  var numargs = fn.length
  return createRecurser([])

  function createRecurser (acc) {
    return function () {
      var args = [].slice.call(arguments)
      return recurse(acc, args)
    }
  }

  function recurse (acc, args) {
    var newacc = acc.concat(args)
    if (newacc.length < numargs) {
      return createRecurser(newacc)
    } else {
      return fn.apply(this, newacc)
    }
  }
}
const translate2 = curry((vector, ...items) => {
  return translate(vector, ...items)
})
console.log('t', translate2)

const myTranslation = translate2([2, 6, 3]) // a function
console.log('myTranslation', myTranslation)

console.log('jscad', jscad)
const main = () => {
  return [
    // rotate([0, 0, 0], cylinder({ radius: 0.1 })),
    cylinder({ radius: 0.5 }),
    translate([0, 5, 0], cylinder({ size: 2.5 })),
    circle({ diameter: 10, segments: 64 }),
    circle({ radius: 10, segments: 64 }),
    cuboid(),
    sphere(),
    translate([10, 5, 0], [jscad.primitives.cylinder({ radius: 0.5, segments: 64 })]),
    rotate([0, 10, 2], cylinder({ radius: 0.1 })),
    jscad.primitives.arc(),
    jscad.primitives.ellipse(),
    rotate([0, 10, 2], star())
  ]
}

module.exports = { main }
