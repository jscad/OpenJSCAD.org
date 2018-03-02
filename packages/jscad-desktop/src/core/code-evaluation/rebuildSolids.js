
const {toArray} = require('../../utils/utils')
const getParamValues = require('../parameters/getParameterValues')

const rebuildSolids = (jscadScript, paramControls) => {
  console.log('rebuilding')
  let params = getParamValues(paramControls)
  const solids = toArray(jscadScript(params))
  return solids
}

module.exports = {rebuildSolids}
