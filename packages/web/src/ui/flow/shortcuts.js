const most = require('most')
const {getKeyCombos, isKeyEventScopeValid, simpleKey} = require('../../utils/keys')
const {head} = require('@jscad/core/utils/arrays')

// keyboard shortcut handling
const actions = ({sources}) => {
  // set shortcuts
  const setShortcuts$ = most.mergeArray([
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.shortcuts)
      .map(reply => reply.data.shortcuts)
  ])
  .map(data => ({type: 'setShortcuts', data}))

  // set a specific shortcut
  const shortcutCommandUp$ = sources.dom.select('.shortcutCommand').events('keyup')
    .multicast()
  const shortcutCommandDown$ = sources.dom.select('.shortcutCommand').events('keydown')
    .multicast()
  const shortcutCommandKey$ = getKeyCombos(
    {dropRepeats: true},
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
      .map(({event, compositeKey}) => ({event, compositeKey, inProgress: true}))

    .merge(
      sources.dom.select('.shortcutCommand').events('focus')
        .map(event => ({event, compositeKey: '', inProgress: true}))
    )
    .merge(
      sources.dom.select('.shortcutCommand').events('blur')
        .map(event => ({event, compositeKey: '', inProgress: false}))
    )
    .merge(
      shortcutCommandUp$
        .filter(event => simpleKey(event) === 'escape')
        .map(event => ({event, compositeKey: '', inProgress: false}))
    )
    .merge(
      shortcutCommandUp$
        .filter(event => simpleKey(event) === 'enter')
        .map(event => ({event, done: true}))
    )
    .scan(function (acc, current) {
      const {event, compositeKey, inProgress, done} = current
      const command = event.target.dataset.command
      const args = event.target.dataset.args

      let updated = Object.assign({}, acc, {command, args, inProgress, done})
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
  .map(data => ({type: 'setShortcut', data}))
  .multicast()

  // to make sure the key event was fired in the scope of the current jscad instance
  const myKey = sources.dom.element.getAttribute('key')
  // FIXME: use dom source
  const keyUps$ = most.fromEvent('keyup', document)
    .filter(event => isKeyEventScopeValid(myKey, event.target))
    .multicast()// sources.dom.select(document).events('keyup') /
  const keyDown$ = most.fromEvent('keydown', document)
    .filter(event => isKeyEventScopeValid(myKey, event.target))
    .multicast()

  // we get all key combos, accepting repeated key strokes
  const keyCombos$ = getKeyCombos({dropRepeats: false}, keyUps$, keyDown$)
  // we match key stroke combos to actions
  const triggerFromShortcut$ = most.sample(function ({event, compositeKey}, state) {
    const matchingAction = head(state.shortcuts.filter(shortcut => shortcut.key === compositeKey))
    if (matchingAction) {
      const {command, args} = matchingAction
      return {type: command, data: args}
    }
    return undefined
  }, keyCombos$, keyCombos$, sources.state$)
    .filter(x => x !== undefined)

  return {setShortcut$, setShortcuts$, triggerFromShortcut$}
}

module.exports = actions
