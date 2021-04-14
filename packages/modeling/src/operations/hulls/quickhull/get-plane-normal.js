const cross = require('../../../maths/vec3/cross')
const normalize = require('../../../maths/vec3/normalize')
const subtract = require('../../../maths/vec3/subtract')

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const planeNormal = (out, point1, point2, point3) => {
  const tmp = [0, 0, 0]
  subtract(out, point1, point2)
  subtract(tmp, point2, point3)
  cross(out, out, tmp)
  return normalize(out, out)
}

module.exports = planeNormal
