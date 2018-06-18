const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')
const {merge} = require('../../utils/utils')

const reducers = {
  initialize: state => {
    const themes = {
      active: 'light',
      themeSettings: {mainTextColor: '#FFF'}
    }
    return Object.assign({}, state, {themes})
  },
  setTheme: (state, active) => {
    // very nice color for the cuts [0, 0.6, 1] to go with the orange
    const available = {
      light: require('../../../data/theme.light'),
      dark: require('../../../data/theme.dark')
    }
    const themeData = available[active]
    // console.log('setTheme', active, themeData)
    const viewer = merge({}, state.viewer, themeData.viewer)
    const themes = Object.assign({}, state.themes, {available, active, themeSettings: themeData})
    return Object.assign({}, state, {viewer}, {themes})
  }
}

const actions = ({sources}) => {
  const initalizeThemes$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(payload => Object.assign({}, {type: 'initalizeThemes', sink: 'state'}, {state: payload}))

  const setTheme$ = most.mergeArray([
    sources.dom.select('#themeSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.themeName)
      .map(reply => reply.data.themeName)
  ])
    .startWith('light')
    .thru(withLatestFrom(reducers.setTheme, sources.state))
    .map(payload => Object.assign({}, {type: 'setTheme', sink: 'state'}, {state: payload}))

  return {initalizeThemes$, setTheme$}
}

module.exports = actions
