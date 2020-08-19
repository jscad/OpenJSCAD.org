const vec3 = require('gl-vec3')

const boundingBox = require('./boundingBox')

/*
 * Compute the bounds of the given geometries.
 * See geometry-utils-V2
 * @param  {geometry|Array} geometries - geometry or list of geometries to measure
 * @return {Object} the bounds of the given geometries
 * bounds: {
 *   dia: 40,
 *   center: [0,20,8],
 *   min: [9, -10, 0],
 *   max: [15, 10, 4]
 *   size: [6,20,4]
 * }
 */
const computeBounds = (geometries) => {
  let dia
  let center
  let bbox // min and max
  let size
  if (Array.isArray(geometries)) {
    geometries.forEach((geometry) => {
      let gbbox = boundingBox(geometry.positions)
      gbbox = gbbox.map((bounds) => vec3.transformMat4(bounds, bounds, geometry.transforms))
      if (bbox) {
        vec3.min(bbox[0], bbox[0], gbbox[0])
        vec3.max(bbox[1], bbox[1], gbbox[1])
      } else {
        bbox = gbbox
      }
    })

    size = vec3.subtract(vec3.create(), bbox[1], bbox[0])
    center = vec3.scale(vec3.create(), size, 0.5)
    center = vec3.add(center, bbox[0], center)
    // aproximate diamter
    dia = vec3.distance(center, bbox[1])
  } else {
    const geometry = geometries
    bbox = boundingBox(geometry.positions)
    bbox = bbox.map((bounds) => vec3.transformMat4(bounds, bounds, geometry.transforms))

    size = vec3.subtract(vec3.create(), bbox[1], bbox[0])
    center = vec3.scale(vec3.create(), size, 0.5)
    center = vec3.add(center, bbox[0], center)
    // aproximate diamter
    dia = vec3.distance(center, bbox[1])
  }

  const bounds = {
    dia,
    center: [...center],
    min: bbox[0],
    max: bbox[1],
    size: [...size]
  }
  return bounds
}

module.exports = computeBounds
