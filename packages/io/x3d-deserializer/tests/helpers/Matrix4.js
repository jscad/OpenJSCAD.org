const Vector3 = require('./Vector3')
const Rotation4 = require('./Rotation4')

function Matrix4() {
  if (arguments.length) {
    this[0] = arguments[0]
    this[1] = arguments[1]
    this[2] = arguments[2]
    this[3] = arguments[3]
    this[4] = arguments[4]
    this[5] = arguments[5]
    this[6] = arguments[6]
    this[7] = arguments[7]
    this[8] = arguments[8]
    this[9] = arguments[9]
    this[10] = arguments[10]
    this[11] = arguments[11]
    this[12] = arguments[12]
    this[13] = arguments[13]
    this[14] = arguments[14]
    this[15] = arguments[15]
  } else {
    this.identity()
  }
}

Matrix4.prototype = {
  constructor: Matrix4,
  order: 4,
  length: 16,
  equals: function (matrix) {
    return this[0] === matrix[0] &&
           this[1] === matrix[1] &&
           this[2] === matrix[2] &&
           this[3] === matrix[3] &&
           this[4] === matrix[4] &&
           this[5] === matrix[5] &&
           this[6] === matrix[6] &&
           this[7] === matrix[7] &&
           this[8] === matrix[8] &&
           this[9] === matrix[9] &&
           this[10] === matrix[10] &&
           this[11] === matrix[11] &&
           this[12] === matrix[12] &&
           this[13] === matrix[13] &&
           this[14] === matrix[14] &&
           this[15] === matrix[15]
  },
  set: function (translation, rotation, scale, scaleOrientation, center) {
    translation = new Vector3(translation[0], translation[1], translation[2])
    rotation = new Rotation4(rotation[0], rotation[1], rotation[2], rotation[3])
    scale = new Vector3(scale[0], scale[1], scale[2])
    scaleOrientation = new Rotation4(scaleOrientation[0], scaleOrientation[1], scaleOrientation[2], scaleOrientation[3])
    center = new Vector3(center[0], center[1], center[2])

    switch (arguments.length) {
      case 0: {
        this.identity()
        break
      }
      case 1: {
        if (translation === null) translation = Vector3.Zero

        this.identity()
        this.translate(translation)
        break
      }
      case 2: {
        if (translation === null) translation = Vector3.Zero
        if (rotation === null) rotation = Rotation4.Identity

        this.identity()
        this.translate(translation)

        if (!rotation.equals(Rotation4.Identity)) this.rotate(rotation)

        break
      }
      case 3: {
        if (translation === null) translation = Vector3.Zero
        if (rotation === null) rotation = Rotation4.Identity
        if (scale === null) scale = Vector3.One

        this.identity()
        this.translate(translation)

        if (!rotation.equals(Rotation4.Identity)) this.rotate(rotation)

        if (!scale.equals(Vector3.One)) this.scale(scale)

        break
      }
      case 4: {
        if (translation === null) translation = Vector3.Zero
        if (rotation === null) rotation = Rotation4.Identity
        if (scale === null) scale = Vector3.One
        if (scaleOrientation === null) scaleOrientation = Rotation4.Identity

        this.identity()
        this.translate(translation)

        if (!rotation.equals(Rotation4.Identity)) this.rotate(rotation)

        if (!scale.equals(Vector3.One)) {
          const hasScaleOrientation = !scaleOrientation.equals(Rotation4.Identity)

          if (hasScaleOrientation) {
            this.rotate(scaleOrientation)
            this.scale(scale)
            this.rotate(Rotation4.inverse(scaleOrientation))
          } else {
            this.scale(scale)
          }
        }
        break
      }
      case 5: {
        if (translation === null) translation = Vector3.Zero
        if (rotation === null) rotation = Rotation4.Identity
        if (scale === null) scale = Vector3.One
        if (scaleOrientation === null) scaleOrientation = Rotation4.Identity
        if (center === null) center = Vector3.Zero

        // P' = T * C * R * SR * S * -SR * -C * P
        this.identity()
        this.translate(translation)

        const hasCenter = !center.equals(Vector3.Zero)

        if (hasCenter) this.translate(center)

        if (!rotation.equals(Rotation4.Identity)) this.rotate(rotation)

        if (!scale.equals(Vector3.One)) {
          if (!scaleOrientation.equals(Rotation4.Identity)) {
            this.rotate(scaleOrientation)
            this.scale(scale)
            this.rotate(Rotation4.inverse(scaleOrientation))
          } else {
            this.scale(scale)
          }
        }

        if (hasCenter) this.translate(Vector3.negate(center))

        break
      }
      case 16: {
        this[0] = arguments[0]
        this[1] = arguments[1]
        this[2] = arguments[2]
        this[3] = arguments[3]
        this[4] = arguments[4]
        this[5] = arguments[5]
        this[6] = arguments[6]
        this[7] = arguments[7]
        this[8] = arguments[8]
        this[9] = arguments[9]
        this[10] = arguments[10]
        this[11] = arguments[11]
        this[12] = arguments[12]
        this[13] = arguments[13]
        this[14] = arguments[14]
        this[15] = arguments[15]
        break
      }
    }

    return this
  },
  setRotation: function (rotation) {
    return this.setQuaternion(rotation.value)
  },
  setQuaternion: function (quaternion) {
    const x = quaternion.x
    const y = quaternion.y
    const z = quaternion.z
    const w = quaternion.w
    const A = y * y
    const B = z * z
    const C = x * y
    const D = z * w
    const E = z * x
    const F = y * w
    const G = x * x
    const H = y * z
    const I = x * w

    this[0] = 1 - 2 * (A + B)
    this[1] = 2 * (C + D)
    this[2] = 2 * (E - F)
    this[3] = 0
    this[4] = 2 * (C - D)
    this[5] = 1 - 2 * (B + G)
    this[6] = 2 * (H + I)
    this[7] = 0
    this[8] = 2 * (E + F)
    this[9] = 2 * (H - I)
    this[10] = 1 - 2 * (A + G)
    this[11] = 0
    this[12] = 0
    this[13] = 0
    this[14] = 0
    this[15] = 1

    return this
  },
  multLeft: function (matrix) {
    const a00 = this[0]
    const a01 = this[1]
    const a02 = this[2]
    const a03 = this[3]
    const a04 = this[4]
    const a05 = this[5]
    const a06 = this[6]
    const a07 = this[7]
    const a08 = this[8]
    const a09 = this[9]
    const a10 = this[10]
    const a11 = this[11]
    const a12 = this[12]
    const a13 = this[13]
    const a14 = this[14]
    const a15 = this[15]
    const b00 = matrix[0]
    const b01 = matrix[1]
    const b02 = matrix[2]
    const b03 = matrix[3]
    const b04 = matrix[4]
    const b05 = matrix[5]
    const b06 = matrix[6]
    const b07 = matrix[7]
    const b08 = matrix[8]
    const b09 = matrix[9]
    const b10 = matrix[10]
    const b11 = matrix[11]
    const b12 = matrix[12]
    const b13 = matrix[13]
    const b14 = matrix[14]
    const b15 = matrix[15]

    this[0] = a00 * b00 + a04 * b01 + a08 * b02 + a12 * b03
    this[1] = a01 * b00 + a05 * b01 + a09 * b02 + a13 * b03
    this[2] = a02 * b00 + a06 * b01 + a10 * b02 + a14 * b03
    this[3] = a03 * b00 + a07 * b01 + a11 * b02 + a15 * b03
    this[4] = a00 * b04 + a04 * b05 + a08 * b06 + a12 * b07
    this[5] = a01 * b04 + a05 * b05 + a09 * b06 + a13 * b07
    this[6] = a02 * b04 + a06 * b05 + a10 * b06 + a14 * b07
    this[7] = a03 * b04 + a07 * b05 + a11 * b06 + a15 * b07
    this[8] = a00 * b08 + a04 * b09 + a08 * b10 + a12 * b11
    this[9] = a01 * b08 + a05 * b09 + a09 * b10 + a13 * b11
    this[10] = a02 * b08 + a06 * b09 + a10 * b10 + a14 * b11
    this[11] = a03 * b08 + a07 * b09 + a11 * b10 + a15 * b11
    this[12] = a00 * b12 + a04 * b13 + a08 * b14 + a12 * b15
    this[13] = a01 * b12 + a05 * b13 + a09 * b14 + a13 * b15
    this[14] = a02 * b12 + a06 * b13 + a10 * b14 + a14 * b15
    this[15] = a03 * b12 + a07 * b13 + a11 * b14 + a15 * b15

    return this
  },
  multRight: function (matrix) {
    const a00 = this[0]
    const a01 = this[1]
    const a02 = this[2]
    const a03 = this[3]
    const a04 = this[4]
    const a05 = this[5]
    const a06 = this[6]
    const a07 = this[7]
    const a08 = this[8]
    const a09 = this[9]
    const a10 = this[10]
    const a11 = this[11]
    const a12 = this[12]
    const a13 = this[13]
    const a14 = this[14]
    const a15 = this[15]
    const b00 = matrix[0]
    const b01 = matrix[1]
    const b02 = matrix[2]
    const b03 = matrix[3]
    const b04 = matrix[4]
    const b05 = matrix[5]
    const b06 = matrix[6]
    const b07 = matrix[7]
    const b08 = matrix[8]
    const b09 = matrix[9]
    const b10 = matrix[10]
    const b11 = matrix[11]
    const b12 = matrix[12]
    const b13 = matrix[13]
    const b14 = matrix[14]
    const b15 = matrix[15]

    this[0] = a00 * b00 + a01 * b04 + a02 * b08 + a03 * b12
    this[1] = a00 * b01 + a01 * b05 + a02 * b09 + a03 * b13
    this[2] = a00 * b02 + a01 * b06 + a02 * b10 + a03 * b14
    this[3] = a00 * b03 + a01 * b07 + a02 * b11 + a03 * b15
    this[4] = a04 * b00 + a05 * b04 + a06 * b08 + a07 * b12
    this[5] = a04 * b01 + a05 * b05 + a06 * b09 + a07 * b13
    this[6] = a04 * b02 + a05 * b06 + a06 * b10 + a07 * b14
    this[7] = a04 * b03 + a05 * b07 + a06 * b11 + a07 * b15
    this[8] = a08 * b00 + a09 * b04 + a10 * b08 + a11 * b12
    this[9] = a08 * b01 + a09 * b05 + a10 * b09 + a11 * b13
    this[10] = a08 * b02 + a09 * b06 + a10 * b10 + a11 * b14
    this[11] = a08 * b03 + a09 * b07 + a10 * b11 + a11 * b15
    this[12] = a12 * b00 + a13 * b04 + a14 * b08 + a15 * b12
    this[13] = a12 * b01 + a13 * b05 + a14 * b09 + a15 * b13
    this[14] = a12 * b02 + a13 * b06 + a14 * b10 + a15 * b14
    this[15] = a12 * b03 + a13 * b07 + a14 * b11 + a15 * b15

    return this
  },
  identity: function () {
    this[0] = 1
    this[1] = 0
    this[2] = 0
    this[3] = 0
    this[4] = 0
    this[5] = 1
    this[6] = 0
    this[7] = 0
    this[8] = 0
    this[9] = 0
    this[10] = 1
    this[11] = 0
    this[12] = 0
    this[13] = 0
    this[14] = 0
    this[15] = 1
  },
  translate: function (translation) {
    const x = translation.x
    const y = translation.y
    const z = translation.z

    this[12] += this[0] * x + this[4] * y + this[8] * z
    this[13] += this[1] * x + this[5] * y + this[9] * z
    this[14] += this[2] * x + this[6] * y + this[10] * z

    return this
  },
  rotate: function (rotation) {
    this.multLeft(rotateMatrix.setQuaternion(rotation.value))

    return this
  },
  scale: function (scale) {
    const x = scale.x
    const y = scale.y
    const z = scale.z

    this[0] *= x
    this[4] *= y
    this[8] *= z

    this[1] *= x
    this[5] *= y
    this[9] *= z

    this[2] *= x
    this[6] *= y
    this[10] *= z

    return this
  }
}

const rotateMatrix = new Matrix4()

module.exports = Matrix4
