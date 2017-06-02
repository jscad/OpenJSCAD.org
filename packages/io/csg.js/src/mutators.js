const Matrix4x4 = require('./math/Matrix4')
const Vector3D = require('./math/Vector3')
const Plane = require('./math/Plane')

// Add several convenience methods to the classes that support a transform() method:
const addTransformationMethodsToPrototype = function (prot) {
  prot.mirrored = function (plane) {
    return this.transform(Matrix4x4.mirroring(plane))
  }

  prot.mirroredX = function () {
    let plane = new Plane(Vector3D.Create(1, 0, 0), 0)
    return this.mirrored(plane)
  }

  prot.mirroredY = function () {
    let plane = new Plane(Vector3D.Create(0, 1, 0), 0)
    return this.mirrored(plane)
  }

  prot.mirroredZ = function () {
    let plane = new Plane(Vector3D.Create(0, 0, 1), 0)
    return this.mirrored(plane)
  }

  prot.translate = function (v) {
    return this.transform(Matrix4x4.translation(v))
  }

  prot.scale = function (f) {
    return this.transform(Matrix4x4.scaling(f))
  }

  prot.rotateX = function (deg) {
    return this.transform(Matrix4x4.rotationX(deg))
  }

  prot.rotateY = function (deg) {
    return this.transform(Matrix4x4.rotationY(deg))
  }

  prot.rotateZ = function (deg) {
    return this.transform(Matrix4x4.rotationZ(deg))
  }

  prot.rotate = function (rotationCenter, rotationAxis, degrees) {
    return this.transform(Matrix4x4.rotation(rotationCenter, rotationAxis, degrees))
  }

  prot.rotateEulerAngles = function (alpha, beta, gamma, position) {
    position = position || [0, 0, 0]

    let Rz1 = Matrix4x4.rotationZ(alpha)
    let Rx = Matrix4x4.rotationX(beta)
    let Rz2 = Matrix4x4.rotationZ(gamma)
    let T = Matrix4x4.translation(new Vector3D(position))

    return this.transform(Rz2.multiply(Rx).multiply(Rz1).multiply(T))
  }
}

// TODO: consider generalization and adding to addTransformationMethodsToPrototype
const addCenteringToPrototype = function (prot, axes) {
  prot.center = function (cAxes) {
    cAxes = Array.prototype.map.call(arguments, function (a) {
      return a // .toLowerCase();
    })
        // no args: center on all axes
    if (!cAxes.length) {
      cAxes = axes.slice()
    }
    let b = this.getBounds()
    return this.translate(axes.map(function (a) {
      return cAxes.indexOf(a) > -1 ? -(b[0][a] + b[1][a]) / 2 : 0
    }))
  }
}
module.exports = {
  addTransformationMethodsToPrototype,
  addCenteringToPrototype
}
