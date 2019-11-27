const jscad = require('@jscad/modeling')

console.log('jscad', jscad)
const main = () => {
  return jscad.primitives.cuboid()
}

module.exports = { main }
