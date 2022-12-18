import {orient2d} from 'robust-predicates';

/**
 * Signed area of the triangle (p0, p1, p2)
 * @param  {Array.<Number>} p0
 * @param  {Array.<Number>} p1
 * @param  {Array.<Number>} p2
 * @return {Number}
 */
export default function signedArea(p0, p1, p2) {
  const res = orient2d(p0[0], p0[1], p1[0], p1[1], p2[0], p2[1]);
  if (res > 0) return -1;
  if (res < 0) return 1;
  return 0;
}
