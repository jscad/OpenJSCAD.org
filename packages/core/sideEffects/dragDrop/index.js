const { mergeArray, fromEvent } = require('most')

const formatData = (data, type) => ({ data, type })

const preventDefault = (event) => {
  event.preventDefault()
  return event
}

const isTextNotEmpty = (text) => text !== ''

const exists = (input) => (input !== null && input !== undefined)

// onst dragOvers$ = DOM.select(':root').events('dragover')
// const drops$ = DOM.select(':root').events('drop')
const dragEvents = (targetEl) => {
  const dragOvers$ = fromEvent('dragover', targetEl)
  const drops$ = fromEvent('drop', targetEl)

  return { dragOvers$, drops$ }
}

const dragAndDropSource = (targetEl) => { // {dragOvers$, drops$}
  const { dragOvers$, drops$ } = dragEvents(targetEl)
  drops$.multicast()
  drops$.forEach(preventDefault)
  dragOvers$.forEach(preventDefault)

  const urls$ = drops$
    .map((event) => event.dataTransfer.getData('url'))
    .filter(isTextNotEmpty)
    .map((data) => formatData([data], 'url'))

  const texts$ = drops$
    .map((event) => event.dataTransfer.getData('Text'))
    .filter(isTextNotEmpty)
    .map((data) => formatData([data], 'text'))

  const filesOrFolders$ = drops$
    .map((event) => event.dataTransfer.files)
    .filter(exists)
    .map((data) => [].slice.call(data))
    .map((data) => formatData(data, 'fileOrFolder'))

  return mergeArray([urls$, texts$, filesOrFolders$]).multicast()
}

module.exports = function makeDragAndDropSideEffect () {
  return { source: dragAndDropSource }
}
