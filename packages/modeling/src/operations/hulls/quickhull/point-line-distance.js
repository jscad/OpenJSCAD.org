import { cross, subtract, squaredLength } from '../../../maths/vec3/index.js'

/*
 * Original source from quickhull3d (https://github.com/mauriciopoppe/quickhull3d)
 * Copyright (c) 2015 Mauricio Poppe
 *
 * Adapted to JSCAD by Jeff Gay
 */

const distanceSquared = (p, a, b) => {
  // == parallelogram solution
  //
  //            s
  //      __a________b__
  //       /   |    /
  //      /   h|   /
  //     /_____|__/
  //    p
  //
  //  s = b - a
  //  area = s * h
  //  |ap x s| = s * h
  //  h = |ap x s| / s
  //
  const ab = []
  const ap = []
  const cr = []
  subtract(ab, b, a)
  subtract(ap, p, a)
  const area = squaredLength(cross(cr, ap, ab))
  const s = squaredLength(ab)
  if (s === 0) {
    throw Error('a and b are the same point')
  }
  return area / s
}

export const pointLineDistance = (point, a, b) => Math.sqrt(distanceSquared(point, a, b))
