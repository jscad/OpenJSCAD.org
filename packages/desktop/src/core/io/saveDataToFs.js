const fs = require('fs')

const { solidsAsBlob } = require('@jscad/io')

module.exports = function saveDataToFs (outputData, format, filePath) {
  const blob = solidsAsBlob(outputData, { format })
  const toBuffer = require('blob-to-buffer')
  toBuffer(blob, function (err, buffer) {
    if (err) {
      throw new Error(err)
    }
    fs.writeFileSync(filePath, buffer)
  })
}
