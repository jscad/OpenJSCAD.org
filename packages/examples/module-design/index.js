/**
 * Modular Project Design Example
 * @category Projects
 * @skillLevel 1
 * @description Demonstrating the structure of a multi-file project
 * @tags measurements, bounds, boundingbox
 * @authors Moissette Mark, Simon Clark
 * @licence MIT License
 */

const mountPlate = require('./mountPlate.js')
const sphereShape = require('./subFolder/sphereShape')

const getParameterDefinitions = () => {
  const globalParams = [
    { name: 'showPlate', type: 'checkbox', checked: true, caption: 'Show plate:' },
    { name: 'showSphere', type: 'checkbox', checked: false, caption: 'Show sphere:' }
  ]

  // Load the parameters defined in the mountPlate sub-file, and add them to the project parameters.
  const plateParams = mountPlate.getParameterDefinitions()
  globalParams.push(...plateParams)
  return globalParams
}

const main = (params) => {
  console.log(params)
  let results = []
  results = params.showPlate ? results.concat(mountPlate.create(params.plateLength)) : results
  results = params.showSphere ? results.concat(sphereShape(3)) : results

  return results
}

module.exports = { main, getParameterDefinitions }
