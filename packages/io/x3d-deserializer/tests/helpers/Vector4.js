function Vector4 (x, y, z, w) {
  this.x = x
  this.y = y
  this.z = z
  this.w = w
}

Vector4.prototype = {
  constructor: Vector4,
  length: 4
}

module.exports = Vector4
