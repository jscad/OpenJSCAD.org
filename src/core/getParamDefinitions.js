/**
 * parse the jscad script to get the parameter definitions
 * @param {String} script the script
 * @return {Object} params : the parsed parameters
 */
module.exports = function getParamDefinitions (script) {
  var scriptisvalid = true
  script += '\nfunction include() {}' // at least make it not throw an error so early
  try {
    // first try to execute the script itself
    // this will catch any syntax errors
    //    BUT we can't introduce any new function!!!
    (new Function(script))()
  } catch(e) {
    scriptisvalid = false
    throw e
  }
  var params = []
  if (scriptisvalid) {
    var script1 = "if(typeof(getParameterDefinitions) == 'function') {return getParameterDefinitions();} else {return [];} "
    script1 += script
    const f = new Function(script1)
    params = f()
    if ((typeof (params) !== 'object') || (typeof (params.length) !== 'number')) {
      throw new Error('The getParameterDefinitions() function should return an array with the parameter definitions')
    }
  }
  return params
}
