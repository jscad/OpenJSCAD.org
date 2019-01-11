  // extend to a 3D vector by adding a z coordinate:
  const fromVector2 = function (vector2, z) {
    const Vector3D = require('./Vector3')
    return new Vector3D(vector2._x, vector2._y, z)
  }
  module.exports = {fromVector2}
