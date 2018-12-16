#!/usr/bin/env node
// --log_all

// NOTE: this will only run on Node > 6 or needs to be transpiled

// == OpenJSCAD.org CLI interface, written by Rene K. Mueller <spiritdude@gmail.com>, Licensed under MIT License
//
// Description:
//   openjscad <file> [-of <format>] [-o <output>]
// e.g.
//   openjscad test.jscad
//   openjscad test.jscad -o test.stl
//   openjscad test.jscad -o test.amf
//   openjscad test.jscad -o test.dxf
//   openjscad test.scad -o testFromSCAD.jscad
//   openjscad test.scad -o test.stl
//   openjscad test.stl -o test2.stl      # reprocessed: stl -> jscad -> stl
//   openjscad test.amf -o test2.jscad
//   openjscad test.jscad -of amf
//   openjscad test.jscad -of dxf
//   openjscad test.jscad -of stl
//   openjscad name_plate.jscad --name "Just Me" --title "CEO" -o amf test.amf
//
// History:
// 2016/10/01: 0.5.2: changes for libraries
// 2016/06/27: 0.5.1: refactored AMF import and export by Z3 Dev
//                    enhanced STL import, adding support for MM colors by Z3 Dev
// 2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev
// 2015/07/02: 0.3.0: node 0.10.x support, /usr/bin/nodejs, new files involved: formats.js (Stefan Baumann) and Blob.js (Z3 Dev)
// 2014/12/09: 0.019: support of DXF output for 2D objects (laser cutter)
// 2013/04/25: 0.010: support of params passed to main()
// 2013/04/12: 0.008: reimplement parseAMF without jquery
// 2013/04/11: 0.007: support of alpha for AMF addded, bumping version
// 2013/04/05: 0.006: support of AMF added, requires node 0.8.1+
// 2013/03/25: 0.005: more sanity check on input and local installation support
// 2013/03/18: 0.004: STL .stl (binary & ascii) support (experimental via openscad.js)
// 2013/03/18: 0.003: OpenSCAD .scad support by Gary Hodgson's openscad-openjscad-translator module
// 2013/03/02: 0.002: proper installation of the dependencies (csg.js & openscad.js) so openjscad can be used properly
// 2013/03/01: 0.001: initial version, with base function from openscad.jscad
//
const fs = require('fs')
const version = require('./package.json').version
const { formats } = require('@jscad/core/io/formats')
const generateOutputData = require('./src/generateOutputData')
const determineOutputNameAndFormat = require('./src/determineOutputNameAndFormat')
const writeOutput = require('./src/writeOutput')
const parseArgs = require('./src/parseArgs')
const args = process.argv.splice(2)

// handle arguments (inputs, outputs, etc)
let { inputFile, inputFormat, outputFile, outputFormat, params, addMetaData } = parseArgs(args)

// outputs
const output = determineOutputNameAndFormat(outputFormat, outputFile, inputFile)
outputFormat = output.outputFormat
outputFile = output.outputFile

const clicolors = {
  red: '\u{1b}[31m',
  green: '\u{1b}[32m',
  yellow: '\u{1b}[33m',
  blue: '\u{1b}[34m',
  black: '\u{1b}[0m'
}

console.log(`${clicolors.blue}JSCAD: generating ${clicolors.red}
 from: ${clicolors.green} ${inputFile} ${clicolors.red}
 to: ${clicolors.green} ${outputFile} ${clicolors.yellow}(${formats[outputFormat].description}) ${clicolors.black}
`)

// read input data
const src = fs.readFileSync(inputFile, inputFile.match(/\.stl$/i) ? 'binary' : 'UTF8')

// -- convert from JSCAD script into the desired output format
// const outputData = generateOutputData(src, params, {outputFormat})
// -- and write it to disk
// writeOutputDataToFile(outputFile, outputData)
generateOutputData(src, params, { outputFile, outputFormat, inputFile, inputFormat, version, addMetaData })
  .then(outputData => writeOutput(outputFile, outputData))
  .catch(error => console.error(error))
