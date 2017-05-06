const generateOutputFileBlobUrl = require('../io/generateOutputFileBlobUrl')
const generateOutputFileFileSystem = require('../io/generateOutputFileFileSystem')

function generateOutputFile (extension, blob, onDone, context) {
  try {
    generateOutputFileFileSystem(extension, blob, onDone.bind(context))
  } catch (e) {
    generateOutputFileBlobUrl(extension, blob, onDone.bind(context))
  }
}

module.exports = {
  generateOutputFile
}
