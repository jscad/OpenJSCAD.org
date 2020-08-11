/* title      : Measure Area
// authors     : Moissette Mark
// license    : MIT License
// description: measure Area function
// tags: measurements, area
*/

const { cuboid, rectangle, line } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms
const { measureArea } = require('@jscad/modeling').measurements

const main = () => {
  // you can measure areas one by one
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle()
  let acube = cuboid()

  let lineArea = measureArea(aline)
  let rectArea = measureArea(arect)
  let cubeArea = measureArea(acube)

  console.log(`line area: ${lineArea}, rectangleArea: ${rectArea}, cubeArea: ${cubeArea}`)

  // or of multiple items
  let lineArea2 = line([[10, 10], [15, 15]])
  let rectArea2 = rectangle({ size: [10, 20] })
  let cubeArea2 = cuboid({ size: [10, 20, 40] })

  const groupArea = measureArea(lineArea2, rectArea2, cubeArea2)
  console.log(`groupArea: ${groupArea}`)
}

module.exports = { main }
