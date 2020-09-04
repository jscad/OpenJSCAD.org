/*
// title       : Modular Project Design Example
// author      : Moissette Mark, Simon Clark
// license     : MIT License
// description : Demonstrating the structure of a multi-file project
// file        : index.js
// tags        : project, module, code, files, subfolder
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

const main = params => {
  console.log(params)
  let results = []
  results = params.showPlate ? results.concat(mountPlate.create(params.length)) : results
  results = params.showSphere ? results.concat(sphereShape(3)) : results

  return results
}

module.exports = { main, getParameterDefinitions }
