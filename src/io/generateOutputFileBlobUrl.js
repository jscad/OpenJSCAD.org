const { isSafari, getWindowURL } = require('./utils')

module.exports = function generateOutputFileBlobUrl (extension, blob, callback) {
  if (isSafari()) {
    // console.log("Trying download via DATA URI")
    // convert BLOB to DATA URI
    const reader = new FileReader()
    reader.onloadend = function () {
      if (reader.result) {
        callback(reader.result, 'openjscad.' + extension, true, true)
      }
    }
    reader.readAsDataURL(blob)
  } else {
    // console.log("Trying download via BLOB URL")
    // convert BLOB to BLOB URL (HTML5 Standard)
    const windowURL = getWindowURL()
    const outputFileBlobUrl = windowURL.createObjectURL(blob)
    if (!outputFileBlobUrl) throw new Error('createObjectURL() failed')
    callback(outputFileBlobUrl, 'openjscad.' + extension, true, false)
  }
}
