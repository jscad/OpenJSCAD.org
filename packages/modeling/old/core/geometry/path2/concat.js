const fromPoints = require('./fromPoints')

const concat = (path, otherpath) => {
  if (path.closed || otherpath.closed) {
    throw new Error('Paths must not be closed')
  }
  return fromPoints(path.points.concat(otherpath.points))
}

module.exports = concat
