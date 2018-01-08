const fs = require('fs')

const {prepareOutput} = require('../io/prepareOutput')
const {convertToBlob} = require('../io/convertToBlob')

module.exports = function saveDataToFs (outputData, format, filePath) {
  const blob = convertToBlob(prepareOutput(outputData, {format}))
  const toBuffer = require('blob-to-buffer')
  toBuffer(blob, function (err, buffer) {
    if (err) {
      throw new Error(err)
    }
    fs.writeFileSync(filePath, buffer)
  })
}
