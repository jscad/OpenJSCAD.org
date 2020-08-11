/* title      : Measure bounds
// authors     : Moissette Mark
// license    : MIT License
// description: measure bounds function
// tags: measurements, bounds, bounding box
*/

const { cuboid, rectangle, line } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms
const { measureBounds } = require('@jscad/modeling').measurements

const main = () => {
  // you can measure bounds one by one
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle()
  let acube = cuboid()

  let lineBounds = measureBounds(aline)
  let rectBounds = measureBounds(arect)
  let cubeBounds = measureBounds(acube)

  console.log(`line bounds: ${lineBounds}, rectangleBounds: ${rectBounds}, cubeBounds: ${cubeBounds}`)

  // or of multiple items
  let lineBounds2 = line([[10, 10], [15, 15]])
  let rectBounds2 = rectangle({ size: [10, 20] })
  let cubeBounds2 = cuboid({ size: [10, 20, 40] })

  const groupBounds = measureBounds(lineBounds2, rectBounds2, cubeBounds2)
  console.log(`groupBounds: ${groupBounds}`)
}

module.exports = { main }
