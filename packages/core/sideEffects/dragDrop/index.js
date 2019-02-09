const { mergeArray, fromEvent } = require('most')

function formatData (data, type) {
  return {data, type}
}

function preventDefault (event) {
  event.preventDefault()
  return event
}

function isTextNotEmpty (text) {
  return text !== ''
}

function exists (input) {
  return input !== null && input !== undefined
}

// onst dragOvers$ = DOM.select(':root').events('dragover')
// const drops$ = DOM.select(':root').events('drop')
function dragEvents (targetEl) {
  const dragOvers$ = fromEvent('dragover', targetEl)
  const drops$ = fromEvent('drop', targetEl)

  return {dragOvers$, drops$}
}

function dragAndDropSource (targetEl) { // {dragOvers$, drops$}
  const {dragOvers$, drops$} = dragEvents(targetEl)
  drops$.multicast()
  drops$.forEach(preventDefault)
  dragOvers$.forEach(preventDefault)

  let urls$ = drops$
    .map(event => event.dataTransfer.getData('url'))
    .filter(isTextNotEmpty)
    .map(data => formatData([data], 'url'))

  let texts$ = drops$
    .map(event => event.dataTransfer.getData('Text'))
    .filter(isTextNotEmpty)
    .map(data => formatData([data], 'text'))

  let filesOrFolders$ = drops$
    .map(event => event.dataTransfer.files)
    .filter(exists)
    .map(data => [].slice.call(data))
    .map(data => formatData(data, 'fileOrFolder'))

  return mergeArray([urls$, texts$, filesOrFolders$]).multicast()
}

module.exports = function makeDragAndDropSideEffect () {
  return {source: dragAndDropSource}
}
