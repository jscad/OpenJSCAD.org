const mountPlate = require('./mountPlate.js')

const getParameterDefinitions = () => {
  return [
    { name: 'show', type: 'checkbox', checked: false, caption: 'Show:' },
    { name: 'size', type: 'float', initial: 25, caption: 'size', min: 50, max: 200 }
  ]
}

const main = params => {
  return mountPlate(params.size)
}

module.exports = {main, getParameterDefinitions}
