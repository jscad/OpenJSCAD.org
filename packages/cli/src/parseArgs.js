import fs from 'fs'
import path from 'path'

import { Command, Option } from 'commander'

import { loading } from '@jscad/core'

import { supportedInputExtensions, supportedOutputFormats } from '@jscad/io'

import { env } from './env.js'

const { getDesignEntryPoint } = loading

const outputFormats = supportedOutputFormats()
const inputExtensions = supportedInputExtensions()

const isValidInputFileFormat = (input) => {
  if (input === undefined || input === null || !(typeof input === 'string')) {
    return false
  }
  return inputExtensions.reduce((acc, format) => input.toLowerCase().endsWith('.' + format) || acc, false)
}

export const parseArgs = () => {
  const filepaths = [] // list of input file paths
  const parameters = [] // parameter values for main(parameters) and serialize(parameters)

  /*
   * Setup command line arguments
   */
  const program = new Command()
  program.name('cli.js')
  program.usage('[options] <files...> -- parameter values')
  program.argument('[files...]')
  program.addOption(new Option('-f, --output-format <format>', 'output format').choices(outputFormats).default('stla'))
  program.option('-p, --generate-parts', 'generate unique parts from the files', false)
  program.option('-z, --zip', 'zip the output file contents', false)
  program.option('-o, --output-file <filepath>', 'output file name (optional)')
  program.option('-m, --add-metadata', 'add metadata to output format', false)
  program.option('-v, --version', 'show version and environment information', false)
  program.action((args) => {
    // handle the provided arguments
    args.forEach((arg) => {
      try {
        fs.statSync(arg)
        filepaths.push(arg)
      } catch (e) {
        parameters.push(arg)
      }
    })
  })
  program.parse()

  const options = program.opts()

  // show the runtime environment if requested
  if (options.version) {
    env()
  }

  // console.log(options)
  // console.log(filepaths)
  // console.log(parameters)

  if (filepaths.length === 0) process.exit(1)

  if (options.outputFile) {
    // check that the output file name implies a valid output format
    let outputFormat = path.extname(options.outputFile).substring(1)
    if (outputFormat === 'stl') outputFormat = 'stla'
    if (!outputFormats.includes(outputFormat)) {
      console.log('ERROR: invalid output file format <' + outputFormat + '>')
      process.exit(1)
    }
    // check for toxic combinations
    if (filepaths.length !== 1) {
      console.log('ERROR: multiple inputs cannot be converted to a single output file.')
      process.exit(1)
    }
    options.outputFormat = outputFormat
  } else {
    options.outputFile = undefined
  }

  // check for use of a directory, and determine the design entry point
  options.inputIsDirectory = false
  if (filepaths.length === 1) {
    if (fs.statSync(filepaths[0]).isDirectory()) {
      options.inputIsDirectory = true
      // get actual design entry point
      const filepath = getDesignEntryPoint(fs, filepaths[0])
      if (!filepath) {
        console.log('ERROR: could not determine entry point of project <' + filepaths[0] + '>')
        console.log('Verify project main or index exists')
        process.exit(1)
      }
      filepaths[0] = filepath // use the entry point for conversion
    }
  }

  // check that all input files are valid formats for conversion
  filepaths.forEach((filepath) => {
    if (!isValidInputFileFormat(filepath)) {
      console.log('ERROR: invalid input file format <' + filepath + '>')
      process.exit(1)
    }
  })

  options.filepaths = filepaths
  options.params = parameters

  // console.log('RETURN',options)

  return options
}
