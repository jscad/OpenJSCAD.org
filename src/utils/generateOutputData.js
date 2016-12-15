const CAG = require('../csg').CAG
const evaluateSource = require('./evaluateSource')
const convertToBlob = require('../io/convertToBlob')

/**
 * generate output data from source
 * @param {Object} modelingHelpers the modeling helpers module loaded as string
 * @param {Object} meta optional metadata (AMF only)
 * @param {Object} mainParams hash of parameters to pass to main function
 * @param {String} outputFormat
 * @param {String} src the original source
 * @return the output data
 */
function generateOutputData (modelingHelpers, mainParams, outputFormat, src)
{
  let objects
  if (outputFormat === 'jscad' || outputFormat === 'js') {
    objects = src
  } else {
    objects = evaluateSource(modelingHelpers, CAG, mainParams, src)
  }
  return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}
module.exports = generateOutputData
