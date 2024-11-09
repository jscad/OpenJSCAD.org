#!/usr/bin/env node
// --log_all

// NOTE: this will only run on Node > 6 or needs to be transpiled

// == JSCAD CLI interface, written by Rene K. Mueller <spiritdude@gmail.com>, Licensed under MIT License
//
// Description:
//   jscad <file> [-of <format>] [-o <output>]
// e.g.
//   jscad test.jscad
//   jscad test.jscad -o test.stl
//   jscad test.jscad -o test.amf
//   jscad test.jscad -o test.dxf
//   jscad test.scad -o testFromSCAD.jscad
//   jscad test.scad -o test.stl
//   jscad test.stl -o test2.stl      # reprocessed: stl -> jscad -> stl
//   jscad test.amf -o test2.jscad
//   jscad test.jscad -of amf
//   jscad test.jscad -of dxf
//   jscad test.jscad -of stl
//   jscad name_plate.jscad --name "Just Me" --title "CEO" -o amf test.amf
//
const fs = require('fs')
const JSZip = require('jszip')

const { formats } = require('@jscad/io/formats')

const version = require('./package.json').version
const generateOutputData = require('./src/generateOutputData')
const determineOutputNameAndFormat = require('./src/determineOutputNameAndFormat')
const writeOutput = require('./src/writeOutput')
const parseArgs = require('./src/parseArgs')

// handle arguments (inputs, outputs, etc)
const args = process.argv.splice(2)
let { inputFile, inputFormat, outputFile, outputFormat, generateParts, zip, params, addMetaData, inputIsDirectory } = parseArgs(args)

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

const logFileOutput = (outputFile) => {
  console.log(`${clicolors.blue}JSCAD: generating output ${clicolors.red}
    from: ${clicolors.green} ${inputFile} ${clicolors.red}
    to: ${clicolors.green} ${outputFile} ${clicolors.yellow}(${formats[outputFormat].description}) ${clicolors.black}
  `)
}

// read input data
const src = fs.readFileSync(inputFile, inputFile.match(/\.stl$/i) ? 'binary' : 'UTF8')

// -- convert from JSCAD script into the desired output format
// -- and write it to disk
generateOutputData(src, params, { outputFile, outputFormat, inputFile, inputFormat, generateParts, version, addMetaData, inputIsDirectory })
  .then((outputData) => {
    if (outputData instanceof Array) {
      if (zip) {
        const zip = new JSZip()
        for (let i = 0; i < outputData.length; i++) {
          const filename = outputFile.replace(/\.(\w+)$/, `-part-${i + 1}-of-${outputData.length}.$1`)
          zip.file(filename, outputData[i].asBuffer())
        }
        zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
          const zipFilename = outputFile.replace(/\.(\w+)$/, '.zip')
          fs.writeFile(zipFilename, content, (err) => {
            if (err) {
              console.error(err)
            } else {
              logFileOutput(zipFilename)
            }
          })
        })
      } else {
        for (let i = 0; i < outputData.length; i++) {
          const filename = outputFile.replace(/\.(\w+)$/, `-part-${i + 1}-of-${outputData.length}.$1`)
          logFileOutput(filename)
          writeOutput(filename, outputData[i])
        }
      }
    } else {
      if (zip) {
        const zip = new JSZip()
        zip.file(outputFile, outputData.asBuffer())
        zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
          const zipFilename = outputFile.replace(/\.(\w+)$/, '.zip')
          fs.writeFile(zipFilename, content, (err) => {
            if (err) {
              console.error(err)
            } else {
              logFileOutput(zipFilename)
            }
          })
        })
      } else {
        logFileOutput(outputFile)
        writeOutput(outputFile, outputData)
      }
    }
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
