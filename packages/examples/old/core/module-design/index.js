const mountPlate = require('./mountPlate.js')
const sphereShape = require('./subFolder/sphereShape')

const getParameterDefinitions = (prevParamValues) => {
  return [
    { name: 'showSphere', type: 'checkbox', checked: false, caption: 'Show sphere:' },
    { name: 'showPlate', type: 'checkbox', checked: true, caption: 'Show plate:' },
    { name: 'length', type: 'float', initial: 25, caption: 'length', min: 50, max: 200 }
  ]
}

const main = params => {
  let results = []
  results = params.showPlate ? results.concat(mountPlate(params.length)) : results
  results = params.showSphere ? results.concat(sphereShape(3)) : results

  return results
}

module.exports = { main, getParameterDefinitions }
