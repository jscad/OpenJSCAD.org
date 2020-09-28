const url = require('url')
const { fromEvent } = require('most')

const preventDefault = (event) => {
  event.preventDefault()
  return event
}

const isTextNotEmpty = (text) => text !== ''

const exists = (input) => (input !== null && input !== undefined)

const itemListToArray = (list) => {
  const array = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    array.push(item.webkitGetAsEntry ? item.webkitGetAsEntry() : item)
  }
  return array
}

const extractData = (event) => {
  if (isTextNotEmpty(event.dataTransfer.getData('url'))) {
    return { type: 'url', data: event.dataTransfer.getData('url') }
  }
  if (event.dataTransfer.types.includes('text/plain')) {
    const data = event.dataTransfer.getData('text')
    try {
      const parts = new URL(data)
      return { type: 'url', data: parts.href }
    } catch {
      return { type: 'text', data }
    }
  }
  if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
    return { type: 'fileOrFolder', data: itemListToArray(event.dataTransfer.items) }
  }
  return undefined
}

const makeDragAndDropSideEffect = ({ targetEl }) => {
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
