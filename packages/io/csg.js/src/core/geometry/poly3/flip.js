const vert3 = require('../vert3')
const plane = require('')
const fromData = require('./fromData')

/** flip a 3d polygon
 * @param  {poly3} poly3
 * @returns {poly3} a new 3d polygon, the flipped version of the input
 */
const flip = poly3 => {
  let newvertices = poly3.vertices.map(vertex => vert3.flip(vertex))
  newvertices.reverse()
  let newplane = plane.flip(poly3.plane)
  return fromData(newvertices, poly3.shared, newplane)
}

module.exports = flip
