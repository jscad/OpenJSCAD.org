// TODO : same as openjscad.org/cli/getParameterDefinitionsCLI
function getParameterDefinitionsCLI (getParameterDefinitions, param) {
  if (typeof getParameterDefinitions !== 'undefined') {
    let params = {}
    let pa = getParameterDefinitions()
    for (let a in pa) { // defaults, given by getParameterDefinitions()
      let x = pa[a]
      if ('default' in x) {
        params[pa[a].name] = pa[a].default
      } else if ('initial' in x) {
        params[pa[a].name] = pa[a].initial
      } else if ('checked' in x) {
        params[pa[a].name] = pa[a].checked
      }
    }
    for (let a in param) { // given by command-line
      params[a] = param[a]
    }
    return params
  } else {
    return param
  }
}

module.exports = getParameterDefinitionsCLI
