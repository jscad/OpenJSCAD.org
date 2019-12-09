/* title      : Measure Volume
// authors     : Moissette Mark
// license    : MIT License
// description: measure Volume function
// tags: measurements, volume
*/

const { cuboid, rectangle, line } = require('@jscad/modeling').primitives
const { translate } = require('@jscad/modeling').transforms
const { measureVolume } = require('@jscad/modeling').measurements

const main = () => {
  // you can measure volumes one by one
  let aline = line([[10, 10], [15, 15]])
  let arect = rectangle()
  let acube = cuboid()

  let lineVolume = measureVolume(aline)
  let rectVolume = measureVolume(arect)
  let cubeVolume = measureVolume(acube)

  console.log(`line volume: ${lineVolume}, rectangleVolume: ${rectVolume}, cubeVolume: ${cubeVolume}`)

  // or of multiple items
  let lineVolume2 = line([[10, 10], [15, 15]])
  let rectVolume2 = rectangle({ size: [10, 20] })
  let cubeVolume2 = cuboid({ size: [10, 20, 40] })

  const groupVolume = measureVolume(lineVolume2, rectVolume2, cubeVolume2)
  console.log(`groupVolume: ${groupVolume}`)
}

module.exports = { main }
