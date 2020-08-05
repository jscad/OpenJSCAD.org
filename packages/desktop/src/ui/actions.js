const most = require('most')
const { head } = require('../utils/utils')

function compositeKeyFromKeyEvent (event) {
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
const simpleKey = (event) => {
  return event.key ? event.key.toLowerCase() : undefined
}

const getKeyCombos = (options, keyUps$, keyDown$) => {
  const defaults = {
    dropRepeats: false
  }
  const { dropRepeats } = Object.assign({}, defaults, options)

  keyDown$ = keyDown$.multicast().debounce(10)
  if (dropRepeats) {
    keyDown$ = keyDown$
      .skipRepeatsWith((event, previousEvent) => {
        return simpleKey(event) === simpleKey(previousEvent)
      })
  }

  const keyStuffEnd$ = keyDown$.throttle(1000).delay(2000)
  const keyCombos$ = keyDown$
    .merge(keyUps$.map(x => 'end'))
    .merge(keyStuffEnd$.map(x => 'end'))
    .loop((values, event) => {
      if (event === 'end' || simpleKey(event) === 'enter' || simpleKey(event) === 'escape') {
        const value = {
          event: values.length > 0 ? values[0].event : undefined,
          compositeKey: values.map(x => x.compositeKey).join('+')
        }
        return { seed: [], value }
      } else {
        const compositeKey = simpleKey(event)
        values.push({ event, compositeKey })
      }
      return { seed: values }
    }, [])
    .filter(x => x !== undefined)
    .filter(x => x.event !== undefined)
    // .tap(x => console.log('key stuff', x))
    .multicast()

  return keyCombos$
}

const makeActions = (sources) => {
  // keyboard shortcut handling
  const keyUps$ = most.fromEvent('keyup', document).multicast()
  const keyDown$ = most.fromEvent('keydown', document).multicast()
  // we get all key combos, accepting repeated key strokes
  const keyCombos$ = getKeyCombos({ dropRepeats: false }, keyUps$, keyDown$)

  // we match key stroke combos to actions
  const actionsFromKey$ = most.sample(function ({ event, compositeKey }, state) {
    const matchingAction = head(state.shortcuts.filter(shortcut => shortcut.key === compositeKey))
    if (matchingAction) {
      const { command, args } = matchingAction
      return { type: command, data: args }
    }
    return undefined
  }, keyCombos$, keyCombos$, sources.state$)
    .filter(x => x !== undefined)

  // set shortcuts
  const setShortcuts$ = most.mergeArray([
    sources.store
      .filter(data => data && data.shortcuts)
      .map(data => data.shortcuts)
  ])
    .map(data => ({ type: 'setShortcuts', data }))

  // set a specific shortcut
  const shortcutCommandUp$ = sources.dom.select('.shortcutCommand').events('keyup').multicast()
  const shortcutCommandDown$ = sources.dom.select('.shortcutCommand').events('keydown').multicast()
  const shortcutCommandKey$ = getKeyCombos(
    { dropRepeats: true },
    shortcutCommandUp$,
    shortcutCommandDown$
  )
  shortcutCommandUp$
    .forEach((event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    })
  shortcutCommandDown$
    .forEach((event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    })

  const setShortcut$ = most.mergeArray([
    shortcutCommandKey$
      .map(({ event, compositeKey }) => ({ event, compositeKey, inProgress: true }))

      .merge(
        sources.dom.select('.shortcutCommand').events('focus')
          .map(event => ({ event, compositeKey: '', inProgress: true }))
      )
      .merge(
        sources.dom.select('.shortcutCommand').events('blur')
          .map(event => ({ event, compositeKey: '', inProgress: false }))
      )
      .merge(
        shortcutCommandUp$
          .filter(event => simpleKey(event) === 'escape')
          .map(event => ({ event, compositeKey: '', inProgress: false }))
      )
      .merge(
        shortcutCommandUp$
          .filter(event => simpleKey(event) === 'enter')
          .map(event => ({ event, done: true }))
      )
      .scan(function (acc, current) {
        const { event, compositeKey, inProgress, done } = current
        const command = event.target.dataset.command
        const args = event.target.dataset.args

        const updated = Object.assign({}, acc, { command, args, inProgress, done })
        if (compositeKey !== undefined && compositeKey !== '') {
          updated.key = compositeKey
          updated.tmpKey = compositeKey
        }
        if ('done' in updated && updated.done) {
          delete updated.inProgress
          delete updated.tmpKey
        }
        return updated
      }, {})
      .filter(x => x !== undefined)
  ])
    .map(data => ({ type: 'setShortcut', data }))
    .multicast()

  const changeTheme$ = most.mergeArray([
    sources.dom.select('#themeSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(data => data && data.themeName)
      .map(data => data.themeName)
  ])
    .startWith('light')
    .map(data => ({ type: 'changeTheme', data }))

  const changeLanguage$ = most.mergeArray([
    sources.dom.select('#languageSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(data => data && data.locale)
      .map(data => data.locale)
  ])
    .map(data => ({ type: 'changeLanguage', data }))

  const setAvailableLanguages$ = most.mergeArray([
    sources.i18n
      .filter(rawData => rawData.operation === 'getAvailableLanguages')
      .map(rawData => rawData.data)
  ])
    .map(data => ({ type: 'setAvailableLanguages', data }))

  const toggleOptions$ = most.mergeArray([
    sources.dom.select('#toggleOptions').events('click')
  ])
    .map(data => ({ type: 'toggleOptions', data }))

  // non visual related actions
  const setErrors$ = most.mergeArray([
    sources.solidWorker.filter(event => 'error' in event)
  ])
    .map(data => ({ type: 'setErrors', data }))

  const clearErrors$ = most.never() /* sources.state$
    .filter(state => state.error !== undefined)
    .map(state => state.error)
    .skipRepeats()
    .map(x => undefined)
    .map(data => ({type: 'clearErrors', data}))
    .delay(30000) */
  // .forEach(x => console.log('clear errors', x))

  const setAppUpdatesAvailable$ = most.mergeArray([
    sources
      .appUpdates
      .map(data => ({ type: 'setAppUpdatesAvailable', data })),
    sources
      .appUpdates
      .delay(15000)// hide after 30 s
      .map(data => ({ type: 'setAppUpdatesAvailable', data: { available: false } }))
  ])

  return {
    // generic key shortuct handler
    actionsFromKey$,
    // set shortcut(s)
    setShortcuts$,
    setShortcut$,
    // generic clear error action
    clearErrors$,
    setErrors$,
    // app updates
    setAppUpdatesAvailable$,
    // translations
    setAvailableLanguages$,
    // ui
    changeTheme$,
    changeLanguage$,
    toggleOptions$
  }
}

module.exports = makeActions
