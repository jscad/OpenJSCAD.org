const fs = require('fs')

const { getDesignEntryPoint } = require('@jscad/core/code-loading/requireDesignUtilsFs')
const { supportedInputExtensions, supportedOutputExtensions, supportedOutputFormats } = require('@jscad/io/formats')

const env = require('./env')

const parseArgs = args => {
  const inputExtensions = supportedInputExtensions()
  const outputExtensions = supportedOutputExtensions()
  const outputFormats = supportedOutputFormats()

  // hint: https://github.com/substack/node-optimist
  //       https://github.com/visionmedia/commander.js
  if (args.length < 1) {
    console.log('USAGE:\n\nopenjscad [-v] <file> [-of <format>] [-o <output>]')
    console.log(`\t<file>  :\tinput (Supported types: folder, .${inputExtensions.join(', .')})`)
    console.log(`\t<output>:\toutput (Supported types: folder, .${outputExtensions.join(', .')})`)
    console.log(`\t<format>:\t${outputFormats.join(', ')}`)
    process.exit(1)
  }

  let inputFile
  let inputFormat
  let outputFile
  let outputFormat
  const params = {} // parameters to feed the script if applicable
  let addMetaData = false // wether to add metadata to outputs or not : ie version info, timestamp etc
  let inputIsDirectory = false // did we pass in a folder or a file ?

  const isValidInputFileFormat = input => {
    if (input === undefined || input === null || !(typeof input === 'string')) {
      return false
    }
    return inputExtensions.reduce((acc, format) => {
      return input.toLowerCase().endsWith('.' + format) || acc
    }, false)
  }
  const getFileExtensionFromString = input => (input.substring(input.lastIndexOf('.') + 1)).toLowerCase()

  const parseBool = input => input.toLowerCase() === 'true'

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-of') { // -of <format>
      outputFormat = args[++i]
    } else if (args[i].match(/^-o(\S.+)/)) { // -o<output>
      outputFile = args[i]
      outputFile = outputFile.replace(/^-o(\S+)$/, '$1')
    } else if (args[i] === '-o') { // -o <output>
      outputFile = args[++i]
    } else if (args[i] === '-add-metadata') { // -metadata true/false
      addMetaData = parseBool(args[++i])
    } else if (args[i].match(/^--(\w+)=(.*)/)) { // params for main()
      params[RegExp.$1] = RegExp.$2
    } else if (args[i].match(/^--(\w+)$/)) { // params for main()
      params[RegExp.$1] = args[++i]
    } else if (args[i].match(/^--(\w+)$/)) { // params for main()
      params[RegExp.$1] = args[++i]
    } else if (isValidInputFileFormat(args[i])) {
      inputFile = args[i]
      inputFormat = getFileExtensionFromString(args[i])
      if (!fs.statSync(inputFile).isFile()) {
        console.log('ERROR: cannot open input file/directory <' + inputFile + '>')
        process.exit(1)
      }
    } else if (args[i].match(/^-v$/)) { // show the version and the environment information
      env()
    } else {
      inputFile = args[i]
      if (fs.statSync(inputFile).isDirectory()) {
        inputIsDirectory = true
        // get actual design entry point if applicable (if passed a folder as input etc)
        inputFile = getDesignEntryPoint(fs, inputFile)
        if (!inputFile) {
          console.log('ERROR: could not determine entry point of project.')
          console.log('Verify main or index exists')
          process.exit(1)
        }
        inputFormat = require('path').extname(inputFile).substring(1)
      } else {
        console.log('ERROR: invalid file name or argument <' + args[i] + '>')
        console.log("Type 'openjscad' for a list of supported types")
        process.exit(1)
      }
    }
  }
  // exit if a input file was not provided
  if (!inputFile) process.exit(1)

  if (!outputFormat && !outputFile) {
    outputFormat = 'stla'
  }

  return {
    inputFile,
    inputFormat,
    outputFile,
    outputFormat,
    params,
    addMetaData,
    inputIsDirectory
  }
}

module.exports = parseArgs
