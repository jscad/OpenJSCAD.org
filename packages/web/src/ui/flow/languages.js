const most = require('most')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')
const holdUntil = require('@jscad/core/observable-utils/holdUntil')

const reducers = {
  initialize: (state) => {
    const languages = {
      active: undefined,
      available: []
    }
    return { languages }
  },
  setLanguage: (state, active) => {
    const languages = Object.assign({}, state.languages, { active })
    return { languages }
  },
  setAvailableLanguages: (state, available) => {
    // console.log('setAvailableLanguages', available)
    const languages = Object.assign({}, state.languages, { available })
    return { languages }
  },
  requestSaveSettings: (languages) => ({ active: languages.active })
}

const actions = ({ sources }) => {
  // setup default 'empty' state
  const initialize$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map((payload) => Object.assign({}, { type: 'initializeLanguages', sink: 'state' }, { state: payload }))

  // send a request to get the list of available languages
  // we wait until the data here has been initialized before requesting the data
  const requestGetAvailableLanguages$ = initialize$
    .map((_) => ({ type: 'getAvailableLanguages', sink: 'i18n' }))

  // send a request to get the default language
  // we wait until the request for available languages has been sent
  const requestGetDefaultLanguage$ = requestGetAvailableLanguages$
    .map((_) => ({ type: 'getDefaultLocale', sink: 'i18n' }))

  // send a request to get the translations for the specified language
  const requestGetLanguageData$ = sources.state
    .filter((state) => state.languages && state.languages.active !== undefined)
    .map((state) => state.languages.active)
    .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
    .map((data) => ({ type: 'changeSettings', data, sink: 'i18n' }))

  // set the list of available languages in the app
  const setAvailableLanguages$ = most.mergeArray([
    sources.i18n
      .filter((command) => command.type === 'getAvailableLanguages')
      .map((command) => command.data)
  ])
    .thru(withLatestFrom(reducers.setAvailableLanguages, sources.state))
    .map((payload) => Object.assign({}, { type: 'setAvailableLanguages', sink: 'state' }, { state: payload }))
    .multicast()

  // this means we wait until the data here has been initialized before loading
  const requestLoadSettings$ = initialize$
    .map((_) => ({ sink: 'store', key: 'languages', type: 'read' }))

  // set the active language, either from defaults, previous settings or manually
  const setLanguageFromDefault$ = sources.i18n
    .thru(holdUntil(setAvailableLanguages$))
    .filter((reply) => reply.type === 'getDefaultLocale')
    .map((reply) => reply.data)
    .multicast()
    .delay(1) // FIXME : needed because of bug with event firing too close to another ?

  // we want to get results from storage AFTER the defaults have been recieved
  const setLanguageFromStore$ = sources.store
    .filter((reply) => reply.key === 'languages' && reply.type === 'read')
    .thru(holdUntil(setLanguageFromDefault$))
    .map((reply) => reply.data.active)
    .filter((active) => active !== undefined)

  const setLanguage$ = most.mergeArray([
    setLanguageFromDefault$,
    sources.dom.select('#languageSwitcher').events('change')
      .map((e) => e.target.value),
    setLanguageFromStore$
  ])
    .thru(withLatestFrom(reducers.setLanguage, sources.state))
    .map((payload) => Object.assign({}, { type: 'setLanguage', sink: 'state' }, { state: payload }))

  // starts emmiting to storage only AFTER initial settings have been loaded
  const requestSaveSettings$ = sources.state
    .filter((state) => state.languages)
    .map((state) => state.languages)
    .thru(holdUntil(sources.store.filter((reply) => reply.key === 'languages' && reply.type === 'read')))
    .map(reducers.requestSaveSettings)
    .map((data) => Object.assign({}, { data }, { sink: 'store', key: 'languages', type: 'write' }))
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
