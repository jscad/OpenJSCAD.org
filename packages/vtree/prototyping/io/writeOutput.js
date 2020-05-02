const fs = require('fs')
const { convertToBlob } = require('@jscad/io-utils')
const serializer = require('@jscad/stl-serializer')

const writeOutput = (filePath, data) => {
  data = serializer.serialize(data, { binary: true })
  const dataToBlob = { data, mimeType: 'application/sla' }
  const blob = convertToBlob(dataToBlob)
  fs.writeFileSync(filePath, blob.asBuffer())
}

module.exports = writeOutput
