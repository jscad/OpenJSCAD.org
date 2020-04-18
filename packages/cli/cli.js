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
const fs = require('fs')

const { formats } = require('@jscad/io/formats')

const version = require('./package.json').version
const generateOutputData = require('./src/generateOutputData')
const determineOutputNameAndFormat = require('./src/determineOutputNameAndFormat')
const writeOutput = require('./src/writeOutput')
const parseArgs = require('./src/parseArgs')

// handle arguments (inputs, outputs, etc)
const args = process.argv.splice(2)
let { inputFile, inputFormat, outputFile, outputFormat, params, addMetaData, inputIsDirectory } = parseArgs(args)

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

console.log(`${clicolors.blue}JSCAD: generating output ${clicolors.red}
 from: ${clicolors.green} ${inputFile} ${clicolors.red}
 to: ${clicolors.green} ${outputFile} ${clicolors.yellow}(${formats[outputFormat].description}) ${clicolors.black}
`)

// read input data
const src = fs.readFileSync(inputFile, inputFile.match(/\.stl$/i) ? 'binary' : 'UTF8')

// -- convert from JSCAD script into the desired output format
// -- and write it to disk
generateOutputData(src, params, { outputFile, outputFormat, inputFile, inputFormat, version, addMetaData, inputIsDirectory })
  .then(outputData => writeOutput(outputFile, outputData))
  .catch(error => console.error(error))
