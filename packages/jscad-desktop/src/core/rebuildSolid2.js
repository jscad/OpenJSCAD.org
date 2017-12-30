
const {toArray} = require('../utils')
const getParamValues = require('./getParamValues')

const rebuildSolid = (jscadScript, paramControls) => {
  console.log('rebuilding')
  let params = getParamValues(paramControls)
  const csgs = toArray(jscadScript(params))
  return csgs
}

module.exports = {rebuildSolid}
