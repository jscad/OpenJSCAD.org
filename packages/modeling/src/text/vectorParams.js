import { simplex } from './fonts/single-line/hershey/simplex.js'

const defaultsVectorParams = {
  xOffset: 0,
  yOffset: 0,
  input: '?',
  align: 'left',
  font: simplex,
  height: 14, // old vector_xxx simplex font height
  lineSpacing: 30/14, // old vector_xxx ratio
  letterSpacing: 0, // proportion of font size, i.e. CSS em
  extrudeOffset: 0
}

// vectorsXXX parameters handler
export const vectorParams = (options, input) => {
  if (!input && typeof options === 'string') {
    options = { input: options }
  }
  options = options || {}
  const params = Object.assign({}, defaultsVectorParams, options)
  params.input = input || params.input
  return params
}
