const fs = require('fs')
const {convertToBlob} = require('./convertToBlob')

const writeOutput = (filePath, data) => {
  const dataToBlob = {data, mimeType: 'application/sla'}
  const blob = convertToBlob(dataToBlob)
  fs.writeFileSync(filePath, blob.asBuffer())
}

module.exports = writeOutput