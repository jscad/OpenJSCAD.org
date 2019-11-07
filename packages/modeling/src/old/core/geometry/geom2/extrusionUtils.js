const OrthoNormalBasis = require('../../math/OrthoNormalBasis')

const { parseOptionAs3DVector, parseOptionAsBool, parseOptionAsFloat, parseOptionAsInt } = require('../../../api/optionParsers')
const { Connector } = require('../../connector/connectors')
const fromPolygons = require('../geom3/fromPolygons')

const poly3 = require('../poly3')


/** extrude the Geom2 in a certain plane.
 * Giving just a plane is not enough, multiple different extrusions in the same plane would be possible
 * by rotating around the plane's origin. An additional right-hand vector should be specified as well,
 * and this is exactly a OrthoNormalBasis.
 * @param  {Geom2} geometry the geometry to extrude
 * @param  {Orthonormalbasis} orthonormalbasis characterizes the plane in which to extrude
 * @param  {Float} depth thickness of the extruded shape. Extrusion is done upwards from the plane
 *  (unless symmetrical option is set, see below)
 * @param  {Object} [options] - options for construction
 * @param {Boolean} [options.symmetrical=true] - extrude symmetrically in two directions about the plane
 */
const extrudeInOrthonormalBasis = (geometry, orthonormalbasis, depth, options) => {
  // first extrude in the regular Z plane:
  if (!(orthonormalbasis instanceof OrthoNormalBasis)) {
    throw new Error('extrudeInPlane: the first parameter should be a OrthoNormalBasis')
  }
  let extruded = extrude(geometry, {
    offset: [0, 0, depth]
  })
  if (parseOptionAsBool(options, 'symmetrical', false)) {
    extruded = extruded.translate([0, 0, -depth / 2])
  }
  let matrix = orthonormalbasis.getInverseProjectionMatrix()
  extruded = extruded.transform(matrix)
  return extruded
}

/** Extrude in a standard cartesian plane, specified by two axis identifiers. Each identifier can be
* one of ["X","Y","Z","-X","-Y","-Z"]
* The 2d x axis will map to the first given 3D axis, the 2d y axis will map to the second.
* See OrthoNormalBasis.GetCartesian for details.
* @param  {Geom2} geometry the geometry to extrude
* @param  {String} axis1 the first axis
* @param  {String} axis2 the second axis
* @param  {Float} depth thickness of the extruded shape. Extrusion is done upwards from the plane
* @param  {Object} [options] - options for construction
* @param {Boolean} [options.symmetrical=true] - extrude symmetrically in two directions about the plane
*/
const extrudeInPlane = (geometry, axis1, axis2, depth, options) => {
  return extrudeInOrthonormalBasis(geometry, OrthoNormalBasis.GetCartesian(axis1, axis2), depth, options)
}

// Extrude a polygon into the direction offsetvector
// Returns a Geom3 object
const extrudePolygon3 = (offsetvector) => {
  let newpolygons = []

  let polygon1 = this
  let direction = polygon1.plane.normal.dot(offsetvector)
  if (direction > 0) {
    polygon1 = polygon1.flipped()
  }
  newpolygons.push(polygon1)
  let polygon2 = polygon1.translate(offsetvector)
  let numvertices = this.vertices.length
  for (let i = 0; i < numvertices; i++) {
    let sidefacepoints = []
    let nexti = (i < (numvertices - 1)) ? i + 1 : 0
    sidefacepoints.push(polygon1.vertices[i].pos)
    sidefacepoints.push(polygon2.vertices[i].pos)
    sidefacepoints.push(polygon2.vertices[nexti].pos)
    sidefacepoints.push(polygon1.vertices[nexti].pos)
    let sidefacepolygon = poly3.fromPoints(sidefacepoints, this.shared)
    newpolygons.push(sidefacepolygon)
  }
  polygon2 = polygon2.flipped()
  newpolygons.push(polygon2)
  return fromPolygons(newpolygons)
}

// FIXME: right now linear & rotate extrude take params first, while rectangular_extrude
// takes params second ! confusing and incoherent ! needs to be changed (BREAKING CHANGE !)

module.exports = {
  extrudeInOrthonormalBasis,
  extrudeInPlane,
  extrude,
  extrudePolygon3
}
