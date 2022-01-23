const fs = require('fs')

const writeOutputDataToFile = (outputFile, outputData) => {
  fs.writeFile(outputFile, outputData.asBuffer(),
    (err) => {
      if (err) {
        console.log('err', err)
      } else {
        // console.log('success')
      }
    }
  )
}

module.exports = writeOutputDataToFile
