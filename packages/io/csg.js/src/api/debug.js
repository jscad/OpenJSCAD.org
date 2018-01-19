function echo () {
  console.warn('echo() will be deprecated in the near future: please use console.log/warn/error instead')
  var s = '', a = arguments
  for (var i = 0; i < a.length; i++) {
    if (i) s += ', '
    s += a[i]
  }
  // var t = (new Date()-global.time)/1000
  // console.log(t,s)
  console.log(s)
}

module.exports = {
  echo
}
