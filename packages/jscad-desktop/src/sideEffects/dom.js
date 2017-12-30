function domSource () {
  let storedListeners = []
  const select = function (query) {
    let item
    if ('.' in query) {
      item = document.getElementsByClassName(query)
    }
    if ('#' in query) {
      item = document.getElementById(query)
    }

    if (item === undefined) {

    }
  }
  return select
}

function domSink () {

}

function makeDomSource () {

}

module.exports = {makeDomSource}
