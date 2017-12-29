function titleBarSideEffect (outToTitle$) {

  outToTitle$.forEach(title => {
    document.title = title
  })
}

module.exports = titleBarSideEffect
