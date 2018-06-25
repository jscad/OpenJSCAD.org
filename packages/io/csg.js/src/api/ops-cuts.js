const {EPS} = require('../core/constants')
const vec4 = require('../core/math/vec4')
const vec2 = require('../core/math/vec2')
const poly3 = require('../core/geometry/poly3')
const intersection = require('./ops-booleans/intersection')

const Plane = require('../core/math/Plane')
const Vertex3 = require('../core/math/Vertex3')
const OrthoNormalBasis = require('../core/math/OrthoNormalBasis')

const {projectToOrthoNormalBasis} = require('../core/utils/csgProjections')
const {extrudePolygon3} = require('./ops-extrusions/extrusionUtils')

/** cuts a csg along a orthobasis
 * @param  {CSG} csg the csg object to cut
 * @param  {Orthobasis} orthobasis the orthobasis to cut along
 */
const sectionCut = function (csg, orthobasis) {
  let plane1 = orthobasis.plane
  let plane2 = orthobasis.plane.flipped()
  plane1 = new Plane(plane1.normal, plane1.w)
  plane2 = new Plane(plane2.normal, plane2.w + (5 * EPS))
  let cut3d = cutByPlane(csg, plane1)
  cut3d = cutByPlane(cut3d, plane2)
  return projectToOrthoNormalBasis(cut3d, orthobasis)
}

/** Cut the solid by a plane. Returns the solid on the back side of the plane
 * @param  {Plane} plane
 * @returns {CSG} the solid on the back side of the plane
 */
const cutByPlane = function (csg, plane) {
  if (csg.polygons.length === 0) {
    throw new Error('cannot cut empty shape3')
  }
  // Ideally we would like to do an intersection with a polygon of inifinite size
  // but this is not supported by our implementation. As a workaround, we will create
  // a cube, with one face on the plane, and a size larger enough so that the entire
  // solid fits in the cube.
  // find the max distance of any vertex to the center of the plane:
  let planecenter = plane.normal.times(plane.w)
  let maxdistance = 0
  csg.polygons.map(function (polygon) {
    polygon.vertices.map(function (vertex) {
      let distance = vertex.pos.distanceToSquared(planecenter)
      if (distance > maxdistance) maxdistance = distance
    })
  })
  maxdistance = Math.sqrt(maxdistance)
  maxdistance *= 1.01 // make sure it's really larger
  // Now build a polygon on the plane, at any point farther than maxdistance from the plane center:
  let vertices = []
  let orthobasis = new OrthoNormalBasis(plane)
  vertices.push(new Vertex3(orthobasis.to3D(vec2.fromValues(maxdistance, -maxdistance))))
  vertices.push(new Vertex3(orthobasis.to3D(vec2.fromValues(-maxdistance, -maxdistance))))
  vertices.push(new Vertex3(orthobasis.to3D(vec2.fromValues(-maxdistance, maxdistance))))
  vertices.push(new Vertex3(orthobasis.to3D(vec2.fromValues(maxdistance, maxdistance))))
  const polygon = poly3.fromData(vertices, null, plane.flipped())

  // and extrude the polygon into a cube, backwards of the plane:
  const cube = extrudePolygon3(polygon, plane.normal.times(-maxdistance))

  // Now we can do the intersection:
  let result = intersection(csg, cube)
  result.properties = csg.properties // keep original properties
  return result
}

module.exports = {sectionCut, cutByPlane}
