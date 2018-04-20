
const {toArray} = require('../../utils/utils')
const getParameterValuesFromUIControls = require('../parameters/getParameterValuesFromUIControls')

const rebuildSolids = (jscadScript, paramControls) => {
  console.log('rebuilding')
  let params = getParameterValuesFromUIControls(paramControls)
  const solids = toArray(jscadScript(params))
  return solids
}

module.exports = {rebuildSolids}
