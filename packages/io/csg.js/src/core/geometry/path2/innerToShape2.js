const shape2 = require('../shape2')

const innerToShape2 = path => {
  if (!path.closed) throw new Error('The path should be closed!')
  return shape2.fromPoints(path.points)
}

module.exports = innerToShape2
