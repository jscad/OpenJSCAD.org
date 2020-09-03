/*
// title       : AMF Import Demonstration
// author      : Simon Clark
// license     : MIT License
// description : Importing AMF files. Drag the whole AMFImport folder into JSCAD
// file        : AMFImport/index.js
// tags        : amf, import
*/

// Load the AMF files using require
const rook = require('./Rook.amf')

const main = () => {
  return rook
}

module.exports = { main }
