const create = require('./create')
const rotateX = require('./rotateX')
const rotateY = require('./rotateY')
const rotateZ = require('./rotateZ')
/**
 * Rotate vector 3D vector around the all 3 axes in the order x-axis , yaxis, z axis
 * @param {vec3} [out] - the receiving vec3
 * @param {vec3} vector - the vec3 point to rotate
 * @returns {vec3} out
 */
function rotate (...params) {
  let out
  let angle
  let vector
  if (params.length === 2) {
    out = create()
    angle = params[0]
    vector = params[1]
  } else {
    out = params[0]
    angle = params[1]
    vector = params[2]
  }

  // fIXME: not correct
  console.log('rotate', angle, vector)
  const origin = [0, 0, 0]
  out = rotateZ(angle[2], origin, rotateY(angle[1], origin, rotateX(angle[0], origin, vector)))
  return out
}

module.exports = rotate
