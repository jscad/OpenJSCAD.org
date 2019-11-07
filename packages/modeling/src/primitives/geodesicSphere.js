const mat4 = require('../math/mat4')

const geom3 = require('../geometry/geom3')

const polyhedron = require('./polyhedron')

/** Construct a geodesic sphere based on icosahedron symmetry.
 * @param {Object} [options] - options for construction
 * @param {Number} [options.radius=1] - target radius of sphere
 * @param {Number} [options.frequency=6] - subdivision frequency per face, multiples of 6
 * @returns {geom3} new 3D geometry
 */
const geodesicSphere = (options) => {
  const defaults = {
    radius: 1,
    frequency: 6
  }
  let {radius, frequency} = Object.assign({}, defaults, options)

  // adjust the frequency to base 6
  frequency = Math.floor(frequency / 6)
  if (frequency <= 0) frequency = 1

  let ci = [ // hard-coded data of icosahedron (20 faces, all triangles)
    [0.850651, 0.000000, -0.525731],
    [0.850651, -0.000000, 0.525731],
    [-0.850651, -0.000000, 0.525731],
    [-0.850651, 0.000000, -0.525731],
    [0.000000, -0.525731, 0.850651],
    [0.000000, 0.525731, 0.850651],
    [0.000000, 0.525731, -0.850651],
    [0.000000, -0.525731, -0.850651],
    [-0.525731, -0.850651, -0.000000],
    [0.525731, -0.850651, -0.000000],
    [0.525731, 0.850651, 0.000000],
    [-0.525731, 0.850651, 0.000000]]

  let ti = [ [0, 9, 1], [1, 10, 0], [6, 7, 0], [10, 6, 0], [7, 9, 0], [5, 1, 4], [4, 1, 9], [5, 10, 1], [2, 8, 3], [3, 11, 2], [2, 5, 4],
    [4, 8, 2], [2, 11, 5], [3, 7, 6], [6, 11, 3], [8, 7, 3], [9, 8, 4], [11, 10, 5], [10, 11, 6], [8, 9, 7]]

  let geodesicSubDivide = function (p, frequency, offset) {
    let p1 = p[0]
    let p2 = p[1]
    let p3 = p[2]
    let n = offset
    let c = []
    let f = []

    //           p3
    //           /\
    //          /__\     frequency = 3
    //      i  /\  /\
    //        /__\/__\       total triangles = 9 (frequency*frequency)
    //       /\  /\  /\
    //     0/__\/__\/__\
    //    p1 0   j      p2

    for (let i = 0; i < frequency; i++) {
      for (let j = 0; j < frequency - i; j++) {
        let t0 = i / frequency
        let t1 = (i + 1) / frequency
        let s0 = j / (frequency - i)
        let s1 = (j + 1) / (frequency - i)
        let s2 = frequency - i - 1 ? j / (frequency - i - 1) : 1
        let q = []

        q[0] = mix3(mix3(p1, p2, s0), p3, t0)
        q[1] = mix3(mix3(p1, p2, s1), p3, t0)
        q[2] = mix3(mix3(p1, p2, s2), p3, t1)

        // -- normalize
        for (let k = 0; k < 3; k++) {
          let r = Math.sqrt(q[k][0] * q[k][0] + q[k][1] * q[k][1] + q[k][2] * q[k][2])
          for (let l = 0; l < 3; l++) {
            q[k][l] /= r
          }
        }
        c.push(q[0], q[1], q[2])
        f.push([n, n + 1, n + 2]); n += 3

        if (j < frequency - i - 1) {
          let s3 = frequency - i - 1 ? (j + 1) / (frequency - i - 1) : 1
          q[0] = mix3(mix3(p1, p2, s1), p3, t0)
          q[1] = mix3(mix3(p1, p2, s3), p3, t1)
          q[2] = mix3(mix3(p1, p2, s2), p3, t1)

          // -- normalize
          for (let k = 0; k < 3; k++) {
            let r = Math.sqrt(q[k][0] * q[k][0] + q[k][1] * q[k][1] + q[k][2] * q[k][2])
            for (let l = 0; l < 3; l++) {
              q[k][l] /= r
            }
          }
          c.push(q[0], q[1], q[2])
          f.push([n, n + 1, n + 2]); n += 3
        }
      }
    }
    return { points: c, triangles: f, offset: n }
  }

  const mix3 = function (a, b, f) {
    let _f = 1 - f
    let c = []
    for (let i = 0; i < 3; i++) {
      c[i] = a[i] * _f + b[i] * f
    }
    return c
  }

  let points = []
  let faces = []
  let offset = 0

  for (let i = 0; i < ti.length; i++) {
    let g = geodesicSubDivide([ ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]]], frequency, offset)
    points = points.concat(g.points)
    faces = faces.concat(g.triangles)
    offset = g.offset
  }

  let geometry = polyhedron({points: points, faces: faces, orientation: 'inward'})
  if (radius !== 1) geometry = geom3.transform(mat4.fromScaling([radius, radius, radius]), geometry)
  return geometry
}

module.exports = geodesicSphere
