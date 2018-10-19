const toString = shape => {
  let result = 'CAG (' + shape.sides.length + ' sides):\n'
  shape.sides.map(function (side) {
    result += '  ' + side.toString() + '\n'
  })
  return result
}
module.exports = toString
