function Quaternion (x, y, z, w) {
  this.x = x
  this.y = y
  this.z = z
  this.w = w
}

Quaternion.prototype = {
  constructor: Quaternion,
  length: 4,
  set: function (x, y, z, w) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
    return this
  },
  equals: function (quat) {
    return this.x === quat.x && this.y === quat.y && this.z === quat.z && this.w === quat.w
  }
}

module.exports = Quaternion
