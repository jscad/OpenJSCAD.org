const compositeKeyFromKeyEvent = (event) => {
  const ctrl = event.ctrlKey ? 'ctrl+' : ''
  const shift = event.shiftKey ? 'shift+' : ''
  const meta = event.metaKey ? 'command+' : ''
  let key = event.key.toLowerCase()
  if (ctrl && key === 'control') {
    key = ''
  }
  if (shift && key === 'shift') {
    key = ''
  }
  if (meta && key === 'meta') {
    key = ''
  }
  const compositeKey = `${ctrl}${shift}${meta}${key}`
  return compositeKey
}

const simpleKey = (event) => event.key ? event.key.toLowerCase() : undefined

const getKeyCombos = (options, keyUps$, keyDown$) => {
  const defaults = {
    dropRepeats: false,
    endKeys: []
  }
  const { dropRepeats, endKeys } = Object.assign({}, defaults, options)

  keyDown$ = keyDown$.multicast().debounce(10)
  if (dropRepeats) {
    keyDown$ = keyDown$
      .skipRepeatsWith((event, previousEvent) => simpleKey(event) === simpleKey(previousEvent))
  }

  const keyStuffEnd$ = keyDown$.throttle(1000).delay(2000)
  const keyCombos$ = keyDown$
    .merge(keyUps$.map((x) => 'end'))
    .merge(keyStuffEnd$.map((x) => 'end'))
    .loop((values, event) => {
      if (event === 'end' || endKeys.includes(simpleKey(event))) {
        const value = {
          event: values.length > 0 ? values[0].event : undefined,
          compositeKey: values.map((x) => x.compositeKey).join('+')
        }
        return { seed: [], value }
      } else {
        const compositeKey = simpleKey(event)
        values.push({ event, compositeKey })
      }
      return { seed: values }
    }, [])
    .filter((x) => x !== undefined)
    .filter((x) => x.event !== undefined)
    // .tap(x => console.log('key stuff', x))
    .multicast()

  return keyCombos$
}

const isKeyEventScopeValid = (mykey, x) => {
  if (x.className && x.className === 'jscad' && x.getAttribute('key') === mykey) {
    return true// x.parentNode
  }
  if (x.parentNode) {
    return isKeyEventScopeValid(mykey, x.parentNode)
  }
  return false
}

module.exports = {
  compositeKeyFromKeyEvent,
  getKeyCombos,
  simpleKey,
  isKeyEventScopeValid
}
