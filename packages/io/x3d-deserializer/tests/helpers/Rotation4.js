const Vector3 = require('./Vector3')
const Quaternion = require('./Quaternion')

const interval = (value, low, high) => {
  if (value >= high) return ((value - low) % (high - low)) + low

  if (value < low) return ((value - high) % (high - low)) + high

  return value
}

function Rotation4 (x, y, z, angle) {
  this.x_ = 0
  this.y_ = 0
  this.z_ = 1
  this.angle_ = 0

  switch (arguments.length) {
    case 0: {
      this.value = new Quaternion(0, 0, 0, 1)
      return
    }
    case 1: {
      this.value = arguments[0]
      this.update()
      return
    }
    case 2: {
      const arg0 = arguments[0]
      const arg1 = arguments[1]

      this.value = new Quaternion(0, 0, 0, 1)

      if (arg1 instanceof Vector3) return this.setFromToVec(arg0, arg1)

      this.set(arg0.x, arg0.y, arg0.z, arg1)

      return
    }
    case 4: {
      this.value = new Quaternion(0, 0, 0, 1)
      this.set(x, y, z, angle)
      break
    }
  }
}

Rotation4.prototype = {
  constructor: Rotation4,
  length: 4,
  update: function () {
    const rotation = this.get()

    this.x_ = rotation.x
    this.y_ = rotation.y
    this.z_ = rotation.z
    this.angle_ = rotation.w

    return this
  },
  set: function (x, y, z, angle) {
    this.x_ = x
    this.y_ = y
    this.z_ = z
    this.angle_ = angle

    let scale = Math.sqrt(x * x + y * y + z * z)

    if (scale === 0) {
      this.value.set(0, 0, 0, 1)
      return this
    }

    // Calculate quaternion

    const halfTheta = interval(angle / 2, 0, Math.PI)
    scale = Math.sin(halfTheta) / scale

    this.value.set(x * scale, y * scale, z * scale, Math.cos(halfTheta))
    return this
  },
  equals: function (rot) {
    return this.value.equals(rot.value)
  }
}

Object.assign(Rotation4,
  {
    Identity: new Rotation4()
  }
)

module.exports = Rotation4
