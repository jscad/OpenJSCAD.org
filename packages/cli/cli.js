#!/usr/bin/env node
// --log_all

/*
 * Command Line Interface (CLI) for converting JSCAD designs to differnt external formats.
 *
 * Example:
 *   node ./cli.js --help
 */
import fs from 'fs'
import path from 'path'

import JSZip from 'jszip'

import { supportedFormats } from '@jscad/io'

import { parseArgs } from './src/parseArgs.js'
import { generateOutputData } from './src/generateOutputData.js'
import { writeOutput } from './src/writeOutput.js'

const clicolors = {
  red: '\u{1b}[31m',
  green: '\u{1b}[32m',
  yellow: '\u{1b}[33m',
  blue: '\u{1b}[34m',
  black: '\u{1b}[0m'
}

const version = '[VI]{version}[/VI]' // version is injected by rollup

// handle arguments (inputs, outputs, etc)
let { filepaths, outputFile, outputFormat, generateParts, zip, params, addMetaData, inputIsDirectory } = parseArgs()

// FIXME handle N input files
const inputFile = filepaths[0]
const inputFormat = path.extname(inputFile).substring(1)

// outputs
if (!outputFile) {
  // create a base name from the input file
  const fileElements = path.parse(inputFile)
  fileElements.ext = '.' + outputFormat
  if (fileElements.ext === '.stla') fileElements.ext = '.stl'
  if (fileElements.ext === '.stlb') fileElements.ext = '.stl'
  fileElements.base = undefined
  outputFile = path.format(fileElements)
}

const logFileOutput = (inputPath, outputPath) => {
  console.log(`${clicolors.blue}JSCAD: generating output ${clicolors.red}
    from: ${clicolors.green} ${inputPath} ${clicolors.red}
    to: ${clicolors.green} ${outputPath} ${clicolors.yellow}(${supportedFormats[outputFormat].description}) ${clicolors.black}
  `)
}

// read input data
let encoding = 'UTF8'
if (inputFile.match(/\.stl$/i)) encoding = 'binary'
if (inputFile.match(/\.3mf$/i)) encoding = null // force raw buffer

const src = fs.readFileSync(inputFile, encoding)

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
              logFileOutput(inputFile, zipFilename)
            }
          })
        })
      } else {
        for (let i = 0; i < outputData.length; i++) {
          const filename = outputFile.replace(/\.(\w+)$/, `-part-${i + 1}-of-${outputData.length}.$1`)
          logFileOutput(inputFile, filename)
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
              logFileOutput(inputFile, zipFilename)
            }
          })
        })
      } else {
        logFileOutput(inputFile, outputFile)
        writeOutput(outputFile, outputData)
      }
    }
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
