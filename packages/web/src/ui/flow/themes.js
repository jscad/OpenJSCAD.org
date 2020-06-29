const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')
const holdUntil = require('@jscad/core/observable-utils/holdUntil')
const { merge } = require('../../utils/utils')

const reducers = {
  initialize: (state) => {
    const themes = {
      active: 'light',
      themeSettings: { mainTextColor: '#FFF' }
    }
    return { themes }
  },
  setTheme: (state, active) => {
    const available = require('../../../data/themes')
    const themeData = available[active]
    // console.log('setTheme', active, themeData)
    const viewer = state.viewer ? merge({}, state.viewer, themeData.viewer) : themeData.viewer
    const themes = Object.assign({}, state.themes, { available, active, themeSettings: themeData })
    // return {themes}
    return { viewer, themes }
  },
  requestSaveSettings: (themes) => ({ active: themes.active })
}

const actions = ({ sources }) => {
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map((payload) => Object.assign({}, { type: 'initializeThemes', sink: 'state' }, { state: payload }))

  const setTheme$ = most.mergeArray([
    sources.dom.select('#themeSwitcher').events('change')
      .map((e) => e.target.value),
    sources.store
      .filter((reply) => reply.key === 'themes' && reply.type === 'read' && reply.data && reply.data.active)
      .map((reply) => reply.data.active)
  ])
    .startWith('light')
    .thru(withLatestFrom(reducers.setTheme, sources.state))
    // .thru(holdUntil(initialize$))
    .map((payload) => Object.assign({}, { type: 'setTheme', sink: 'state' }, { state: payload }))

  const requestLoadSettings$ = initialize$
    .map((_) => ({ sink: 'store', key: 'themes', type: 'read' }))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter((state) => state.themes)
    .map((state) => state.themes)
    .thru(holdUntil(sources.store.filter((reply) => reply.key === 'themes' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map((data) => Object.assign({}, { data }, { sink: 'store', key: 'themes', type: 'write' }))
    .multicast()

  return {
    initialize$,
    setTheme$,

    requestLoadSettings$,
    requestSaveSettings$
  }
}

module.exports = actions
