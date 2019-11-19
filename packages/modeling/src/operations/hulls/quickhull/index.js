const QuickHull = require('./QuickHull')

const runner = (points, options = {}) => {
  const instance = new QuickHull(points)
  instance.build()
  return instance.collectFaces(options.skipTriangulation)
}

module.exports = runner
