const test = require('ava')
const { compareSolids } = require('./viewer')

test('compareSolids should not break if nulls are present', (t) => {
  const cube = {"polygons":[{"vertices":[[-0.5,-0.5,-0.5],[-0.5,-0.5,0.5],[-0.5,0.5,0.5],[-0.5,0.5,-0.5]]},{"vertices":[[0.5,-0.5,-0.5],[0.5,0.5,-0.5],[0.5,0.5,0.5],[0.5,-0.5,0.5]]},{"vertices":[[-0.5,-0.5,-0.5],[0.5,-0.5,-0.5],[0.5,-0.5,0.5],[-0.5,-0.5,0.5]]},{"vertices":[[-0.5,0.5,-0.5],[-0.5,0.5,0.5],[0.5,0.5,0.5],[0.5,0.5,-0.5]]},{"vertices":[[-0.5,-0.5,-0.5],[-0.5,0.5,-0.5],[0.5,0.5,-0.5],[0.5,-0.5,-0.5]]},{"vertices":[[-0.5,-0.5,0.5],[0.5,-0.5,0.5],[0.5,0.5,0.5],[-0.5,0.5,0.5]]}],"transforms":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],"id":1645207434223}
  
  const current = [cube, null]
  const previous = []

  t.false(compareSolids(current, previous))
})
