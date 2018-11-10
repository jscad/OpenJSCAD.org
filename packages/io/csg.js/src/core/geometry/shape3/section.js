const { EPS } = require('../../constants')
const { projectToOrthoNormalBasis } = require('../core/utils/csgProjections')
const plane = require('../../math/plane')
const cutByPlane = require('./cutByPlane')

/** cuts a Shape3 along a orthobasis, returns a 2d shape
 * @param  {Shape3} shape the shape3 object to cut
 * @param  {Orthobasis} orthobasis the orthobasis to cut along
 */
const section = function (shape, orthobasis) {
  let plane1 = orthobasis.plane
  let plane2 = orthobasis.plane.flipped()
  plane1 = plane.fromValues(plane1) // new Plane(plane1.normal, plane1.w)
  plane2 = plane.fromValues(plane2[0], plane2[1], plane2[2], plane2[3] + (5 * EPS)) // new Plane(plane2.normal, plane2.w + (5 * EPS))
  let cut3d = cutByPlane(shape, plane1)
  cut3d = cutByPlane(cut3d, plane2)
  return projectToOrthoNormalBasis(cut3d, orthobasis)
}

module.exports = section
