const FileSystemApiErrorHandler = require('./utils')

module.exports = function generateOutputFileFileSystem (extension, blob, callback) {
  var request = window.requestFileSystem || window.webkitRequestFileSystem
  if (!request) {
    throw new Error('Your browser does not support the HTML5 FileSystem API. Please try the Chrome browser instead.')
  }
  // console.log("Trying download via FileSystem API")
  // create a random directory name:
  var dirname = 'OpenJsCadOutput1_' + parseInt(Math.random() * 1000000000, 10) + '_' + extension
  var filename = 'output.' + extension // FIXME this should come from this.filename
  request(TEMPORARY, 20 * 1024 * 1024, function (fs) {
    fs.root.getDirectory(dirname, {create: true, exclusive: true}, function (dirEntry) {
      dirEntry.getFile(filename, {create: true, exclusive: true}, function (fileEntry) {
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function (e) {
            callback(fileEntry.toURL(), fileEntry.name)
          }
          fileWriter.onerror = function (e) {
            throw new Error('Write failed: ' + e.toString())
          }
          fileWriter.write(blob)
        },
          function (fileerror) { FileSystemApiErrorHandler(fileerror, 'createWriter') }
        )
      },
        function (fileerror) { FileSystemApiErrorHandler(fileerror, "getFile('" + filename + "')") }
      )
    },
      function (fileerror) { FileSystemApiErrorHandler(fileerror, "getDirectory('" + dirname + "')") }
    )
  },
    function (fileerror) { FileSystemApiErrorHandler(fileerror, 'requestFileSystem') }
  )
}
