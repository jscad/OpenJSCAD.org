/**
   * Get the points that make up the path.
   * note that this is current internal list of points, not an immutable copy.
   * (FIXME: not anymore: double check)
   * @returns {Vec2[]} array of points the make up the path
   */
const toPoints = path => {
  return [...path.points]
}

module.exports = toPoints
