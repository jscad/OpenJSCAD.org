
const { toArray } = require('@jscad/array-utils')

const getParameterValuesFromUIControls = require('../parameters/getParameterValuesFromUIControls')

const rebuildSolids = (jscadScript, paramControls) => {
  console.log('rebuilding')
  const params = getParameterValuesFromUIControls(paramControls)
  const solids = toArray(jscadScript(params))
  return solids
}

module.exports = { rebuildSolids }
