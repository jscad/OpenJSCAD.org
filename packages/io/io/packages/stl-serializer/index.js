const binarySerializer = require('./CSGToStlb')
const asciiSerializer = require('./CSGToStla')

const mimeType = 'application/sla'

function serialize (data, options) {
  const defaults = {
    binary: true
  }
  options = Object.assign({}, defaults, options)

  return options.binary ? binarySerializer(data, options) : asciiSerializer(data, options)
}

module.exports = {
  mimeType,
  serialize
}
