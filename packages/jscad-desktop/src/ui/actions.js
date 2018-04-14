const most = require('most')
const {head} = require('../utils/utils')

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

const makeActions = (sources) => {
  /* sources.watcher.forEach(function (data) {
    console.log('watchedFile', data)
  })
  sources.drops.forEach(function (data) {
    console.log('drop', data)
  })
  sources.fs.forEach(function (data) {
    console.log('fs operations', data)
  })
  sources.paramChanges.forEach(function (data) {
    console.log('param changes', data)
  }) */

  // keyboard shortcut handling
  const keyDowns$ = most.fromEvent('keyup', document)
  const actionsFromKey$ = most.sample(function (event, state) {
    const compositeKey = compositeKeyFromKeyEvent(event)
    const matchingAction = head(state.shortcuts.filter(shortcut => shortcut.key === compositeKey))
    if (matchingAction) {
      const {command, args} = matchingAction
      return {type: command, data: args}
    }
    return undefined
  }, keyDowns$, keyDowns$, sources.state$)
    .filter(x => x !== undefined)

  const changeTheme$ = most.mergeArray([
    sources.dom.select('#themeSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(data => data && data.themeName)
      .map(data => data.themeName)
  ])
  .startWith('light')
  .map(data => ({type: 'changeTheme', data}))

  const changeLanguage$ = most.mergeArray([
    sources.dom.select('#languageSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(data => data && data.locale)
      .map(data => data.locale)
  ])
  .map(data => ({type: 'changeLanguage', data}))

  const toggleOptions$ = most.mergeArray([
    sources.dom.select('#toggleOptions').events('click')
  ])
  .map(data => ({type: 'toggleOptions', data}))

  // non visual related actions
  const setErrors$ = most.mergeArray([
    sources.solidWorker.filter(event => 'error' in event)
  ])
    .map(data => ({type: 'setErrors', data}))

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
      .map(data => ({type: 'setAppUpdatesAvailable', data})),
    sources
      .appUpdates
      .delay(15000)// hide after 30 s
      .map(data => ({type: 'setAppUpdatesAvailable', data: {available: false}}))
  ])

  return {
    // generic key shortuct handler
    actionsFromKey$,
    // generic clear error action
    clearErrors$,
    setErrors$,
    // app updates
    setAppUpdatesAvailable$,
    // ui
    changeTheme$,
    changeLanguage$,
    toggleOptions$
  }
}

module.exports = makeActions
