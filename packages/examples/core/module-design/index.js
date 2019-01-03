const mountPlate = require('./mountPlate.js')

const getParameterDefinitions = (prevParamValues) => {
  return [
    { name: 'show', type: 'checkbox', checked: false, caption: 'Show:' },
    { name: 'length', type: 'float', initial: 25, caption: 'length', min: 50, max: 200 }
  ]
}

const main = params => {
  return mountPlate(params.length)
}

module.exports = { main, getParameterDefinitions }
