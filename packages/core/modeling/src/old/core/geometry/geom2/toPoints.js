
/**
 * Convert a geom2 to a list of points.
 * @typedef  {import('./create').Geom2} Geom2
 * @param {Geom2} input the geometry to convert
 * @return {Vec2[]} array of 2D points
 */
const toPoints = input => {
  if ('sides' in input) { // this is a geom2
    return input.sides.map(side => [side[0][0], side[0][1], side[1][0], side[1][1]])
  } else if ('points' in input) {
    return input.points.map(p => ([p.x, p.y]))
  }
  throw Error('Input has no data to convert to point !')
}

module.exports = toPoints
