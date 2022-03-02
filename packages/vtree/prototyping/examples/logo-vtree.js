const { cube, sphere, difference, intersection, union } = require('../../core/index')

const main = () => union(
  difference(
    cube({ size: 3, center: true }),
    sphere({ r: 2, center: true })
  ),
  intersection(
    sphere({ r: 1.3, center: true }),
    cube({ size: 2.1, center: true })
  )
)

module.exports = main
