const { NEPS } = require('../maths/constants')
const vec2 = require('../maths/vec2')

const geom2 = require('../geometries/geom2')

const { isNumberArray } = require('./commonChecks')

// returns angle C
const solveAngleFromSSS = (a, b, c) => Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b))

// returns side c
const solveSideFromSAS = (a, C, b) => {
  if (C > NEPS) {
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C))
  }

  // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
  return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12))
}

// AAA is when three angles of a triangle, but no sides
const solveAAA = (angles) => {
  const eps = Math.abs(angles[0] + angles[1] + angles[2] - Math.PI)
  if (eps > NEPS) throw new Error('AAA triangles require angles that sum to PI')

  const A = angles[0]
  const B = angles[1]
  const C = Math.PI - A - B

  // Note: This is not 100% proper but...
  // default the side c length to 1
  // solve the other lengths
  const c = 1
  const a = (c / Math.sin(C)) * Math.sin(A)
  const b = (c / Math.sin(C)) * Math.sin(B)
  return createTriangle(A, B, C, a, b, c)
}

// AAS is when two angles and one side are known, and the side is not between the angles
const solveAAS = (values) => {
  const A = values[0]
  const B = values[1]
  const C = Math.PI + NEPS - A - B

  if (C < NEPS) throw new Error('AAS triangles require angles that sum to PI')

  const a = values[2]
  const b = (a / Math.sin(A)) * Math.sin(B)
  const c = (a / Math.sin(A)) * Math.sin(C)
  return createTriangle(A, B, C, a, b, c)
}

// ASA is when two angles and the side between the angles are known
const solveASA = (values) => {
  const A = values[0]
  const B = values[2]
  const C = Math.PI + NEPS - A - B

  if (C < NEPS) throw new Error('ASA triangles require angles that sum to PI')

  const c = values[1]
  const a = (c / Math.sin(C)) * Math.sin(A)
  const b = (c / Math.sin(C)) * Math.sin(B)
  return createTriangle(A, B, C, a, b, c)
}

// SAS is when two sides and the angle between them are known
const solveSAS = (values) => {
  const c = values[0]
  const B = values[1]
  const a = values[2]

  const b = solveSideFromSAS(c, B, a)

  const A = solveAngleFromSSS(b, c, a) // solve for A
  const C = Math.PI - A - B
  return createTriangle(A, B, C, a, b, c)
}

// SSA is when two sides and an angle that is not the angle between the sides are known
const solveSSA = (values) => {
  const c = values[0]
  const a = values[1]
  const C = values[2]

  const A = Math.asin(a * Math.sin(C) / c)
  const B = Math.PI - A - C

  const b = (c / Math.sin(C)) * Math.sin(B)
  return createTriangle(A, B, C, a, b, c)
}

// SSS is when we know three sides of the triangle
const solveSSS = (lengths) => {
  const a = lengths[1]
  const b = lengths[2]
  const c = lengths[0]
  if (((a + b) <= c) || ((b + c) <= a) || ((c + a) <= b)) {
    throw new Error('SSS triangle is incorrect, as the longest side is longer than the sum of the other sides')
  }

  const A = solveAngleFromSSS(b, c, a) // solve for A
  const B = solveAngleFromSSS(c, a, b) // solve for B
  const C = Math.PI - A - B
  return createTriangle(A, B, C, a, b, c)
}

const createTriangle = (A, B, C, a, b, c) => {
  const p0 = vec2.fromValues(0, 0) // everything starts from 0, 0
  const p1 = vec2.fromValues(c, 0)
  const p2 = vec2.fromValues(a, 0)
  vec2.add(p2, vec2.rotate(p2, p2, [0, 0], Math.PI - B), p1)
  return geom2.fromPoints([p0, p1, p2])
}

/**
 * Construct a triangle in two dimensional space from the given options.
 * The triangle is always constructed CCW from the origin, [0, 0, 0].
 * @see https://www.mathsisfun.com/algebra/trig-solving-triangles.html
 * @param {Object} [options] - options for construction
 * @param {String} [options.type='SSS'] - type of triangle to construct; A ~ angle, S ~ side
 * @param {Array} [options.values=[1,1,1]] - angle (radians) of corners or length of sides
 * @returns {geom2} new 2D geometry
 * @alias module:modeling/primitives.triangle
 *
 * @example
 * let myshape = triangle({type: 'AAS', values: [degToRad(62), degToRad(35), 7]})
 */
const triangle = (options) => {
  const defaults = {
    type: 'SSS',
    values: [1, 1, 1]
  }
  let { type, values } = Object.assign({}, defaults, options)

  if (typeof (type) !== 'string') throw new Error('triangle type must be a string')
  type = type.toUpperCase()
  if (!((type[0] === 'A' || type[0] === 'S') &&
        (type[1] === 'A' || type[1] === 'S') &&
        (type[2] === 'A' || type[2] === 'S'))) throw new Error('triangle type must contain three letters; A or S')

  if (!isNumberArray(values, 3)) throw new Error('triangle values must contain three values')
  if (!values.every((n) => n > 0)) throw new Error('triangle values must be greater than zero')

  switch (type) {
    case 'AAA':
      return solveAAA(values)
    case 'AAS':
      return solveAAS(values)
    case 'ASA':
      return solveASA(values)
    case 'SAS':
      return solveSAS(values)
    case 'SSA':
      return solveSSA(values)
    case 'SSS':
      return solveSSS(values)
    default:
      throw new Error('invalid triangle type, try again')
  }
}

module.exports = triangle
