const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')
const holdUntil = require('@jscad/core/observable-utils/holdUntil')
const { getKeyCombos, isKeyEventScopeValid, simpleKey } = require('../../utils/keys')
const { head } = require('@jscad/array-utils')
const { merge } = require('../../utils/utils')

const reducers = {
  // FIXME what to do with this ?
  // require('../../../data/keybindings.json')
  initialize: (state) => state,
  // set all shortcuts
  setShortcuts: (state, newShortcuts) => {
    const shortcuts = merge([], state.shortcuts, newShortcuts)
    return { shortcuts }
  },
  // set a specific shortcut
  setShortcut: (state, shortcutData) => {
    const alreadyExists = (key) => state.shortcuts.filter((shortcut) => shortcut.key === key).length > 0
    const shortcuts = state.shortcuts.map((shortcut) => {
      const match = shortcut.command === shortcutData.command && shortcut.args === shortcutData.args
      if (!match) {
        return shortcut
      } else {
        if ('inProgress' in shortcutData) {
          const { inProgress, tmpKey } = shortcutData
          if (inProgress) {
            const error = alreadyExists(tmpKey) ? 'shortcut already exists' : undefined
            return Object.assign({}, shortcut, { inProgress, tmpKey: tmpKey, error })
          } else {
            return Object.assign({}, shortcut, { inProgress, tmpKey: tmpKey })
          }
        }
        if (shortcutData.done && !alreadyExists(shortcutData.key)) {
          const { command, args } = shortcut
          const updatedShortcut = { key: shortcutData.key, command, args }
          return updatedShortcut
        }
        return shortcut
      }
    })
    return { shortcuts }
  },
  triggerShortcut: (state, { event, compositeKey }) => {
    const matchingAction = head(state.shortcuts.filter((shortcut) => shortcut.key.toLowerCase() === compositeKey))
    if (matchingAction) {
      const { command, args } = matchingAction
      return { type: command, data: args }
    }
    return undefined
  },
  requestSaveSettings: (shortcuts) => shortcuts
}

// keyboard shortcut handling
const actions = ({ sources }) => {
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map((payload) => Object.assign({}, { type: 'initializeShortcuts', sink: 'state' }, { state: payload }))

  // set shortcuts
  const setShortcuts$ = most.mergeArray([
    sources.store
      .filter((reply) => reply.key === 'shortcuts' && reply.type === 'read' && reply.data && reply.data.shortcuts)
      .map((reply) => reply.data.shortcuts)
  ])
    .thru(withLatestFrom(reducers.setShortcuts, sources.state))
    .map((payload) => Object.assign({}, { type: 'setShortcuts', sink: 'state' }, { state: payload }))

  // set a specific shortcut
  const shortcutCommandUp$ = sources.dom.select('.shortcutCommand').events('keyup')
    .multicast()
  const shortcutCommandDown$ = sources.dom.select('.shortcutCommand').events('keydown')
    .multicast()
  const shortcutCommandKey$ = getKeyCombos(
    { dropRepeats: true, endKeys: ['enter', 'escape'] },
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
          .map((event) => ({ event, compositeKey: '', inProgress: true }))
      )
      .merge(
        sources.dom.select('.shortcutCommand').events('blur')
          .map((event) => ({ event, compositeKey: '', inProgress: false }))
      )
      .merge(
        shortcutCommandUp$
          .filter((event) => simpleKey(event) === 'escape')
          .map((event) => ({ event, compositeKey: '', inProgress: false }))
      )
      .merge(
        shortcutCommandUp$
          .filter((event) => simpleKey(event) === 'enter')
          .map((event) => ({ event, done: true }))
      )
      .scan((acc, current) => {
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
      .filter((x) => x !== undefined)
  ])
    .thru(withLatestFrom(reducers.setShortcut, sources.state))
    .map((data) => ({ type: 'setShortcut', state: data, sink: 'state' }))
    .multicast()

  // to make sure the key event was fired in the scope of the current jscad instance
  const myKey = sources.dom.element.getAttribute('key')
  // FIXME: use dom source
  const keyUps$ = most.fromEvent('keyup', document)
    .filter((event) => isKeyEventScopeValid(myKey, event.target))
    .multicast()// sources.dom.select(document).events('keyup') /
  const keyDown$ = most.fromEvent('keydown', document)
    .filter((event) => isKeyEventScopeValid(myKey, event.target))
    .multicast()

  // we get all key combos, accepting repeated key strokes
  const keyCombos$ = getKeyCombos({ dropRepeats: false }, keyUps$, keyDown$)

  // we match key stroke combos to actions
  const triggerFromShortcut$ = keyCombos$
    .thru(withLatestFrom(reducers.triggerShortcut, sources.state))
    .filter((x) => x !== undefined)
    // .tap(x => console.log('triggerFromShortcut', x))

  // this means we wait until the data here has been initialized before saving
  const requestLoadSettings$ = initialize$
    .map((_) => ({ sink: 'store', key: 'shortcuts', type: 'read' }))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter((state) => state.shortcuts)
    .map((state) => state.shortcuts)
    .thru(holdUntil(sources.store.filter((reply) => reply.key === 'shortcuts' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map((data) => Object.assign({}, { data }, { sink: 'store', key: 'shortcuts', type: 'write' }))
    .multicast()

  return {
    initialize$,
    setShortcut$,
    setShortcuts$,
    triggerFromShortcut$,

    requestLoadSettings$,
    requestSaveSettings$
  }
}

module.exports = actions
