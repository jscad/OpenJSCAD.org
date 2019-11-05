const { parseOptionAs3DVector, parseOptionAsFloat, parseOptionAsInt } = require('../../../api/optionParsers')
const { defaultResolution3D } = require('../../constants')

const vec3 = require('../../math/vec3')
const connector = require('../../connector')

const toPlanePolygons = require('./toPlanePolygons')
const toWallPolygons = require('./toWallPolygons')
const fromPolygons = require('../geom3/fromPolygons')

/** linear extrusion of 2D shape, with optional twist
 * @param  {Geom2} geometry the geometry to extrude
 * @param  {Object} [options] - options for construction
 * @param {Array} [options.offset=[0,0,1]] - The 2d shape is placed in in z=0 plane and extruded into direction <offset>
 * (a 3D vector as a 3 component array)
 * @param {Boolean} [options.twiststeps=defaultResolution3D] - twiststeps determines the resolution of the twist (should be >= 1)
 * @param {Boolean} [options.twistangle=0] - twistangle The final face is rotated <twistangle> degrees. Rotation is done around the origin of the 2d shape (i.e. x=0, y=0)
 * @returns {Geom3} the extrude shape, as a Geom3 object
 * @example extruded=geometry.extrude({offset: [0,0,10], twistangle: 360, twiststeps: 100});
*/
const extrude = (geometry, options) => {
  if (geometry.sides.length === 0) {
    throw new Error('cannot extrude a 2D shape with no edges !!')
  }
  let offset = parseOptionAs3DVector(options, 'offset', [0, 0, 1])
  let twistangle = parseOptionAsFloat(options, 'twistangle', 0)
  let twiststeps = parseOptionAsInt(options, 'twiststeps', defaultResolution3D)
  if (offset[2] === 0) {
    throw new Error('offset cannot be orthogonal to Z axis')
  }
  if (twistangle === 0 || twiststeps < 1) {
    twiststeps = 1
  }
  let normal = vec3.fromValues(0, 1, 0)
  let polygons = []
  // bottom ...
  polygons = polygons.concat(toPlanePolygons(geometry, {
    translation: [0, 0, 0],
    normal,
    flipped: !(offset[2] < 0) }
  ))
  // ... and top, twisted if needed
  polygons = polygons.concat(toPlanePolygons(geometry, {
    translation: offset,
    normal: vec3.rotateZ(twistangle, normal), // FIXME: deg or rad ??? (was deg)
    flipped: offset[2] < 0 }))

  // walls : each step of the way, create a connector and build polygons from those
  for (let i = 0; i < twiststeps; i++) {
    let c1 = connector.fromPointAxisNormal(
      vec3.scale(i / twiststeps, offset),
      [0, 0, offset[2]],
      vec3.rotateZ(i * twistangle / twiststeps, normal)
    )
    let c2 = connector.fromPointAxisNormal(
      vec3.scale((i + 1) / twiststeps, offset),
      [0, 0, offset[2]],
      vec3.rotateZ((i + 1) * twistangle / twiststeps, normal)
    )
    polygons = polygons.concat(toWallPolygons(geometry, { toConnector1: c1, toConnector2: c2 }))
  }

  return fromPolygons(polygons)
}

module.exports = extrude
