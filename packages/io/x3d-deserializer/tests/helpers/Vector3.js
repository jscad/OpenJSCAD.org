function Vector3 (x, y, z) {
  this.x = x
  this.y = y
  this.z = z
}

Vector3.prototype = {
  constructor: Vector3,
  length: 3,
  equals: function (vector) {
    return this.x === vector.x && this.y === vector.y && this.z === vector.z
  }
}

Object.assign(Vector3, {
  Zero: new Vector3(0, 0, 0),
  One: new Vector3(1, 1, 1),
  negate: (vector) => {
    const copy = Object.create(Vector3.prototype)
    copy.x = -vector.x
    copy.y = -vector.y
    copy.z = -vector.z
    return copy
  }
}
)

module.exports = Vector3
