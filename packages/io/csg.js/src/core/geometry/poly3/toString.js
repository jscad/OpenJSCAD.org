const plane = require('')
const vert3 = require('')

const toString = poly3 => {
  let result = 'Polygon3 plane: ' + plane.toString(poly3.plane) + '\n'
  poly3.vertices.map(function (vertex) {
    result += '  ' + vert3.toString(vertex) + '\n'
  })
  return result
}

module.exports = toString
