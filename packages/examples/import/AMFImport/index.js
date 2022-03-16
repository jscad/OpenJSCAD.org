/**
 * AMF Import Demonstration
 * @category Imports
 * @skillLevel 1
 * @description Importing AMF files. Drag the whole AMFImport folder into JSCAD
 * @tags amf, import
 * @authors Simon Clark
 * @licence MIT License
 */

// Load the AMF files using require
const rook = require('./Rook.amf')

const main = () => rook

module.exports = { main }
