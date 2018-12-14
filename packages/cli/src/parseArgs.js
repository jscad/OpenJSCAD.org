const { getDesignEntryPoint } = require('@jscad/core/code-loading/requireDesignUtilsFs')
const { conversionFormats } = require('@jscad/core/io/formats')
const fs = require('fs')
const version = require('../package.json').version
const env = require('./env')

const parseArgs = args => {
  // hint: https://github.com/substack/node-optimist
  //       https://github.com/visionmedia/commander.js
  //
  // process.argv.forEach(function (val, index, array) {
  //  console.log(index + ': ' + val)
  // })
  if (args.length < 1) {
    console.log('USAGE:\n\nopenjscad [-v] <file> [-of <format>] [-o <output>]')
    console.log('\t<file>  :\tinput file (Supported types: .jscad, .js, .scad, .stl, .amf, .obj, .gcode, .svg, .json, .dxf)')
    console.log('\t<output>:\toutput file (Supported types: .jscad, .stl, .amf, .dxf, .svg, .json)')
    console.log("\t<format>:\t'jscad', 'stla' (STL ASCII, default), 'stlb' (STL Binary), 'amf', 'dxf', 'svg', 'json'")
    process.exit(1)
  }

  let inputFile
  let inputFormat
  let outputFile
  let outputFormat
  let params = {} // parameters to feed the script if applicable
  let addMetaData = false // wether to add metadata to outputs or not : ie version info, timestamp etc

  // let supportedInputFormats = conversionFormats.join('|')
  // console.log('supportedInputFormats', supportedInputFormats)
  const isValidInputFileFormat = input => {
    if (input === undefined || input === null || !(typeof input === 'string')) {
      return false
    }
    return conversionFormats.reduce(function (acc, format) {
      return input.toLowerCase().endsWith(format.toLowerCase()) || acc
    }, false)
  }
  const getFileExtensionFromString = input => (input.substring(input.lastIndexOf('.') + 1)).toLowerCase()

  const parseBool = input => input.toLowerCase() === 'true'

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-of') { // -of <format>
      outputFormat = args[++i]
    } else if (args[i].match(/^-o(\S.+)/)) { // -o<output>
      outputFile = args[i]
      outputFile = outputFile.replace(/^\-o(\S+)$/, '$1')
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
      console.log('OpenSCAD Compatibility (' + version + ')')
    } else {
      inputFile = args[i]
      if (fs.statSync(inputFile).isDirectory()) {
        inputFile = args[i]
        // get actual design entry point if applicable (if passed a folder as input etc)
        inputFile = getDesignEntryPoint(inputFile)
        inputFormat = require('path').extname(inputFile).substring(1)
      } else {
        console.log('ERROR: invalid file name or argument <' + args[i] + '>')
        console.log("Type 'openjscad' for help")
        process.exit(1)
      }
    }
  }
  // exit if a input file was not provided
  if (inputFile === null) process.exit(1)

  if (!outputFormat && !outputFile) {
    outputFormat = 'stla'
  }

  return {
    inputFile,
    inputFormat,
    outputFile,
    outputFormat,
    params,
    addMetaData
  }
}

module.exports = parseArgs
