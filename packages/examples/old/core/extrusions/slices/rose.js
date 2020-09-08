// title: Rose Curve
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

const main = (params) => {
  var radius = 50

  var height = 60

  var vec = new CSG.Vector3D(0, 5, 0)

  var angle

  angle = 360 / 5
  var pent = poly3.fromPoints([
    vec,
    vec.rotateZ(1 * angle),
    vec.rotateZ(2 * angle),
    vec.rotateZ(3 * angle),
    vec.rotateZ(4 * angle)
  ]).rotateY(90).setColor([1, 0, 0.1])// .translate([0, radius, 0]);

  // rose: r = a * sin(k * fi)
  // k = 5 /3
  var k = 5 / 3
  return pent.solidFromSlices({
    numslices: 300,
    loop: true,
    callback: function (t, slice) {
      var angle = t * Math.PI * 3

      var r = radius * Math.sin(k * angle)

      var x = r * Math.cos(angle)

      var y = r * Math.sin(angle)

      var vec = new CSG.Vector3D(x, y, 0)
      // normal
      var x1 = radius * (k * Math.cos(k * angle) * Math.cos(angle) - Math.sin(angle) * Math.sin(k * angle))

      var y1 = radius * (k * Math.cos(k * angle) * Math.sin(angle) + Math.cos(angle) * Math.sin(k * angle))

      var turn = (new CSG.Vector2D(x1, y1)).angleDegrees()

      return this.rotateZ(turn).translate(vec)
    }
  })
}

module.exports = { main }
