const toString = geometry => {
  let result = 'Geom2 (' + geometry.sides.length + ' sides):\n'
  geometry.sides.map(side => {
    result += '  ' + side.toString() + '\n'
  })
  return result
}
module.exports = toString
