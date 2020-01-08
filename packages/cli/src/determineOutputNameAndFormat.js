const extensionReg = /\.(amf|dxf|js|jscad|obj|stl|svg|x3d)$/
const formatReg = /(amf|dxf|js|jscad|stl|stla|stlb|svg|x3d)/i

const determineOutputNameAndFormat = (outputFormat, outputFile, inputFile) => {
  if (!outputFormat && outputFile && outputFile.length && outputFile.match(extensionReg)) { // output filename set
    outputFormat = RegExp.$1
  } else if (!outputFormat && outputFile && outputFile.length) { // output filename isn't valid
    console.log('ERROR: invalid output file <' + outputFile + '>')
    process.exit(1)
  } else if (outputFormat.match(formatReg)) { // output format defined?
    let ext = RegExp.$1
    if (!outputFile) { // unless output filename not set, compose it
      ext = ext.replace(/stl[ab]/, 'stl') // drop [ab] from stl
      outputFile = inputFile
      outputFile = outputFile.replace(/\.([^\.]+)$/, '.' + ext) // compose output filename
    }
  } else {
    console.log(`ERROR: invalid output format <${outputFormat}>`)
    process.exit(1)
  }
  return { outputFormat, outputFile }
}

module.exports = determineOutputNameAndFormat
