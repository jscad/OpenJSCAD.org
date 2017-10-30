const binarySerializer = require('./CSGToStlb').serialize
const asciiSerializer = require('./CSGToStla').serialize
const { ensureManifoldness } = require('@jscad/io-utils')

const mimeType = 'application/sla'

function serialize (data, options) {
  const defaults = {
    binary: true
  }
  options = Object.assign({}, defaults, options)

  data = ensureManifoldness(data)
  return options.binary ? binarySerializer(data, options) : asciiSerializer(data, options)
}

module.exports = {
  mimeType,
  serialize
}
