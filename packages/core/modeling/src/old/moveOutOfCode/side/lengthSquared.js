const lengthSquared = side => {
  let x = side.vertex1.pos.x - side.vertex0.pos.x
  let y = side.vertex1.pos.y - side.vertex0.pos.y
  return x * x + y * y
}

module.exports = lengthSquared
