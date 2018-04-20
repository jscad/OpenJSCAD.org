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

function pseudoArraytoArray (pseudoArray) {
  let array = []
  for (var i = 0; i < pseudoArray.length; i++) {
    const item = pseudoArray[i]
    array.push(item.webkitGetAsEntry ? item.webkitGetAsEntry() : item)
  }
  return array
}

function extractData (event) {
  if (event.dataTransfer.items && event.dataTransfer.items.length) {
    return pseudoArraytoArray(event.dataTransfer.items)
  }
  return []
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
    .map(event => extractData(event))
    // .map(event => event.dataTransfer.files)
    .filter(exists)
    .map(data => [].slice.call(data))
    .map(data => formatData(data, 'fileOrFolder'))

  return mergeArray([urls$, texts$, filesOrFolders$]).multicast()
}

const makeDragAndDropSideEffect = (targetEl) => {
  return {source: dragAndDropSource.bind(null, targetEl)}
}
module.exports = makeDragAndDropSideEffect
