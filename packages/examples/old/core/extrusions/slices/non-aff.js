// title: Non Affine Transformation
// author: Eduard Bespalov
// license: MIT License
// description: testing solidFromSlices()

const main = (params) => {
  var radius = 20

  var height = 60

  var vec = new CSG.Vector3D(0, radius, 0)

  var angle

  angle = 360 / 7
  var pol7 = poly3.fromPoints([
    vec,
    vec.rotateZ(1 * angle),
    vec.rotateZ(2 * angle),
    vec.rotateZ(3 * angle),
    vec.rotateZ(4 * angle),
    vec.rotateZ(5 * angle),
    vec.rotateZ(6 * angle)
  ])

  angle = 360 / 6
  var hex = poly3.fromPoints([
    vec,
    vec.rotateZ(1 * angle),
    vec.rotateZ(2 * angle),
    vec.rotateZ(3 * angle),
    vec.rotateZ(4 * angle),
    vec.rotateZ(5 * angle)
  ])

  angle = 360 / 5
  var pent = poly3.fromPoints([
    vec,
    vec.rotateZ(1 * angle),
    vec.rotateZ(2 * angle),
    vec.rotateZ(3 * angle),
    vec.rotateZ(4 * angle)
  ])

  angle = 360 / 4
  var square = poly3.fromPoints([
    vec,
    vec.rotateZ(1 * angle),
    vec.rotateZ(2 * angle),
    vec.rotateZ(3 * angle)
  ])

  angle = 360 / 3
  var triag = poly3.fromPoints([
    vec,
    vec.rotateZ(1 * angle),
    vec.rotateZ(2 * angle)
  ])

  var polygons = [pol7, hex, pent, square, triag, pol7, hex, pent, square, triag]

  return triag.solidFromSlices({
    numslices: polygons.length,
    callback: function (t, slice) {
      return polygons[slice].translate(
        [0, 0, height * t]
      )
    }
  })
}

module.exports = { main }
