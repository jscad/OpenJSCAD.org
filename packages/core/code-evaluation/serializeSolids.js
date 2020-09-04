const { geometries } = require('@jscad/modeling')

const isGeom2 = geometries.geom2.isA
const isGeom3 = geometries.geom3.isA
const isPath2 = geometries.path2.isA

const compactGeom2 = geometries.geom2.toCompactBinary
const compactGeom3 = geometries.geom3.toCompactBinary
const compactPath2 = geometries.path2.toCompactBinary

/*
 * Serialize the given solids/objects into web worker message content.
 * @param {Array} solids - list of solids to serialize
 * @return {Array} web worker message contents
 */
const serializeSolids = (solids) => solids.map((object) => {
  //  if (isGeom2(object)) {
  //    return compactGeom2(object)
  //  } else if (isGeom3(object)) {
  //    return compactGeom3(object)
  //  } else if (isPath2(object)) {
  //    return compactPath2(object)
  //  } else {
  //    return JSON.stringify(object)
  //  }
  return JSON.stringify(object)
})


module.exports = serializeSolids
