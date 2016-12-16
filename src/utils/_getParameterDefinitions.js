_getParameterDefinitions = function (param) { // used for openjscad CLI only
  if (typeof getParameterDefinitions !== 'undefined') {
    var p = {}
    var pa = getParameterDefinitions()
    for (var a in pa) { // defaults, given by getParameterDefinitions()
      var x = pa[a]
      if ('default' in x) {
        p[pa[a].name] = pa[a].default
      } else if ('initial' in x) {
        p[pa[a].name] = pa[a].initial
      } else if ('checked' in x) {
        p[pa[a].name] = pa[a].checked
      }
    }
    for (var a in param) { // given by command-line
      p[a] = param[a]
    }
    if (0) {
      for (var a in p) {
        echo('param=', a, p[a])
      }
    }
    return p
  } else
    return param
}
