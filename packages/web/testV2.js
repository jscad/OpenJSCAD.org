const jscad = require('@jscad/modeling')

console.log('jscad', jscad)
const main = () => {
  return [
    // jscad.primitives.circle({ diameter: 10, segments: 64 }),
    // jscad.primitives.circle({ radius: 10, segments: 64 }),
    // jscad.primitives.cuboid(),
    // jscad.primitives.sphere(),
    // jscad.primitives.cylinder({ radius: 5, segments: 64 }),
    jscad.primitives.arc(),
    // jscad.primitives.ellipse(),
    // jscad.primitives.star()
  ]
}

module.exports = { main }
