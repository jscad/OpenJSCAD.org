const makeBlob = require('./makeBlob')

const Blob = makeBlob()

const convertToBlob = (input) => {
  const { data, mimeType } = input
  const blob = new Blob(data, { type: mimeType })
  return blob
}

module.exports = convertToBlob
