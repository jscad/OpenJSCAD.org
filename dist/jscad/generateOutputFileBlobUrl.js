'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateOutputFileBlobUrl;

var _detectBrowser = require('../ui/detectBrowser');

var _urlHelpers = require('../ui/urlHelpers');

function generateOutputFileBlobUrl(extension, blob, callback) {
  if ((0, _detectBrowser.isSafari)()) {
    (function () {
      // console.log("Trying download via DATA URI")
      // convert BLOB to DATA URI
      var reader = new FileReader();
      reader.onloadend = function () {
        if (reader.result) {
          callback(reader.result, 'openjscad.' + extension, true, true);
        }
      };
      reader.readAsDataURL(blob);
    })();
  } else {
    // console.log("Trying download via BLOB URL")
    // convert BLOB to BLOB URL (HTML5 Standard)
    var windowURL = (0, _urlHelpers.getWindowURL)();
    var outputFileBlobUrl = windowURL.createObjectURL(blob);
    if (!outputFileBlobUrl) throw new Error('createObjectURL() failed');
    callback(outputFileBlobUrl, 'openjscad.' + extension, true, false);
  }
}