const most = require('most')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')
const holdUntil = require('../../utils/observable-utils/holdUntil')

const reducers = {
  initialize: state => {
    const languages = {
      active: undefined,
      available: []
    }
    return Object.assign({}, state, {languages})
  },
  setLanguage: (state, active) => {
    //  console.log('setLanguage', active)
    const languages = Object.assign({}, state.languages, {active})
    return Object.assign({}, state, {languages})
  },
  setAvailableLanguages: (state, available) => {
    // console.log('setAvailableLanguages', available)
    const languages = Object.assign({}, state.languages, {available})
    return Object.assign({}, state, {languages})
  },
  requestSaveSettings: (languages) => {
    return {active: languages.active}
  }
}

const actions = ({sources}) => {
  // setup default 'empty' state
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(payload => Object.assign({}, {type: 'initializeLanguages', sink: 'state'}, {state: payload}))

  // send a request to get the list of available languages
  const requestGetAvailableLanguages$ = most
    .just({type: 'getAvailableLanguages', sink: 'i18n'})
    .delay(10) // so we do not do it at the same time as the initalization

  // send a request to get the default language
  const requestGetDefaultLanguage$ = most
    .just({type: 'getDefaultLocale', sink: 'i18n'})
    .delay(10)

  // send a request to get the translations for the specificed language
  const requestGetLanguageData$ = sources.state
    .filter(state => state.languages && state.languages.active !== undefined)
    .map(state => state.languages.active)
    .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
    .map(data => ({type: 'changeSettings', data, sink: 'i18n'}))
    .tap(x => console.log('requestGetLanguageData', x))

  // set the active language, either from defaults, previous settings or manually
  const setLanguage$ = most.mergeArray([
    sources.i18n
      .filter(reply => reply.type === 'getDefaultLocale')
      .map(reply => reply.data)
      .delay(10), // to get stuff after the available ones have been set
    sources.dom.select('#languageSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.locale)
      .map(reply => reply.data.locale)
      .delay(10)// to get stuff after the default locale has been set
  ])
    .thru(withLatestFrom(reducers.setLanguage, sources.state))
    .map(payload => Object.assign({}, {type: 'setLanguage', sink: 'state'}, {state: payload}))

  // set the list of available languages in the app
  const setAvailableLanguages$ = most.mergeArray([
    sources.i18n
      .filter(command => command.type === 'getAvailableLanguages')
      .map(command => command.data)
  ])
    .thru(withLatestFrom(reducers.setAvailableLanguages, sources.state))
    .map(payload => Object.assign({}, {type: 'setAvailableLanguages', sink: 'state'}, {state: payload}))

  // this means we wait until the data here has been initialized before saving
  const requestLoadSettings$ = initialize$
    .map(_ => ({sink: 'store', key: 'languages', type: 'read'}))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter(state => state.languages)
    .map(state => state.languages)
    .thru(holdUntil(sources.store.filter(reply => reply.key === 'languages' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map(data => Object.assign({}, {data}, {sink: 'store', key: 'languages', type: 'write'}))
    .multicast()

  return {
    initialize$,
    requestGetAvailableLanguages$,
    requestGetDefaultLanguage$,
    requestGetLanguageData$,
    setLanguage$,
    setAvailableLanguages$,

    requestLoadSettings$,
    requestSaveSettings$
  }
}

module.exports = actions
