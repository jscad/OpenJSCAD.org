import fs from 'fs'

export const writeOutputDataToFile = (outputFile, outputData) => {
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

export default writeOutputDataToFile
