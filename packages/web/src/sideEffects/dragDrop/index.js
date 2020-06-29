const { fromEvent } = require('most')

const preventDefault = (event) => {
  event.preventDefault()
  return event
}

const isTextNotEmpty = (text) => text !== ''

const exists = (input) => (input !== null && input !== undefined)

const pseudoArraytoArray = (pseudoArray) => {
  const array = []
  for (let i = 0; i < pseudoArray.length; i++) {
    const item = pseudoArray[i]
    array.push(item.webkitGetAsEntry ? item.webkitGetAsEntry() : item)
  }
  return array
}

const extractData = (event) => {
  if (isTextNotEmpty(event.dataTransfer.getData('url'))) {
    return { type: 'url', data: event.dataTransfer.getData('url') }
  }
  if (event.dataTransfer.types.includes('text/plain')) {
    return { type: 'text', data: event.dataTransfer.getData('text') }
  }
  if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
    return { type: 'fileOrFolder', data: pseudoArraytoArray(event.dataTransfer.items) }
  }
  return undefined
}

const makeDragAndDropSideEffect = ({ targetEl }) => {
  // onst dragOvers$ = DOM.select(':root').events('dragover')
  // const drops$ = DOM.select(':root').events('drop')
  const dragEvents = (targetEl) => {
    const dragOvers$ = fromEvent('dragover', targetEl)
    const drops$ = fromEvent('drop', targetEl)
    return { dragOvers$, drops$ }
  }

  const dragAndDropSource = () => { // {dragOvers$, drops$}
    const { dragOvers$, drops$ } = dragEvents(targetEl)
    drops$.multicast()
    drops$.forEach(preventDefault)
    dragOvers$.forEach(preventDefault)

    return drops$
      .map((event) => extractData(event))
      .filter(exists)
      .multicast()
  }
  return { source: dragAndDropSource }
}
module.exports = makeDragAndDropSideEffect
