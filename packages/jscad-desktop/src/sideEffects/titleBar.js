function titleBarSink (outToTitle$) {
  outToTitle$.forEach(title => {
    document.title = title
  })
}

module.exports = {titleBarSink}
