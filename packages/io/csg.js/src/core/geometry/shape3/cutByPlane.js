const { EPS } = require('../../constants')
const vec4 = require('../../math/vec4')
const vec2 = require('../../math/vec2')
const poly3 = require('../poly3')
const intersection = require('../../../api/ops-booleans/intersection')

const Plane = require('../../math/Plane')
const Vertex3 = require('../core/math/Vertex3')
const OrthoNormalBasis = require('../../math/OrthoNormalBasis')

const { extrudePolygon3 } = require('../../../api/ops-extrusions/extrusionUtils')

/** Cut the solid by a plane. Returns the solid on the back side of the plane
 * @param  {Plane} plane
 * @returns {CSG} the solid on the back side of the plane
 */
const cutByPlane = function (shape, plane) {
  if (shape.polygons.length === 0) {
    throw new Error('cannot cut empty shape3')
  }
  // Ideally we would like to do an intersection with a polygon of inifinite size
  // but this is not supported by our implementation. As a workaround, we will create
  // a cube, with one face on the plane, and a size larger enough so that the entire
  // solid fits in the cube.
  // find the max distance of any vertex to the center of the plane:
  let planecenter = plane.normal.times(plane.w)
  let maxdistance = 0
  shape.polygons.map(function (polygon) {
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
  let result = intersection(shape, cube)
  result.properties = shape.properties // keep original properties
  return result
}

module.exports = cutByPlane
