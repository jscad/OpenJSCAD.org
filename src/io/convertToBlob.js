const { makeBlob } = require('@jscad/io')

const Blob = makeBlob()

function convertToBlob (input) {
  const {data, mimeType} = input
  const blob = new Blob(data, { type: mimeType })
  return blob
}

module.exports = {
  convertToBlob
}
