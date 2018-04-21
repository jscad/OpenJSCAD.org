function titleBarSink (outToTitle$) {
  outToTitle$.forEach(title => {
    document.title = title
  })
}

module.exports = function makeTitleBarSideEffect () {
  return {sink: titleBarSink}
}
