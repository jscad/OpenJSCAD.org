const defaultFont = require('./fonts/single-line/hershey/simplex.js')

const defaultsVectorParams = {
  xOffset: 0,
  yOffset: 0,
  input: '?',
  align: 'left',
  font: defaultFont,
  height: 14, // == old vector_xxx simplex font height
  lineSpacing: 2.142857142857143, // == 30/14 == old vector_xxx ratio
  letterSpacing: 1,
  extrudeOffset: 0
}

// vectorsXXX parameters handler
const vectorParams = (options, input) => {
  if (!input && typeof options === 'string') {
    options = { input: options }
  }
  options = options || {}
  const params = Object.assign({}, defaultsVectorParams, options)
  params.input = input || params.input
  return params
}

module.exports = vectorParams
