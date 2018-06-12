const most = require('most')

const actions = ({sources}) => {
  // send a request to get the list of available languages
  const requestGetAvailableLanguages$ = most
    .just({type: 'getAvailableLanguages', sink: 'i18n'})

  // send a request to get the default language
  const requestGetDefaultLanguage$ = most
    .just({type: 'getDefaultLocale', sink: 'i18n'})

  // send a request to get the translations for the specificed language
  const requestGetLanguageData$ = sources.state$
    .map(state => state.locale)
    .skipRepeats()
    .map(data => ({type: 'changeSettings', data, sink: 'i18n'}))

  // set the current language, either from defaults, previous settings or manually
  const setLanguage$ = most.mergeArray([
    sources.i18n
      .filter(reply => reply.type === 'getDefaultLocale')
      .map(reply => reply.data),
    sources.dom.select('#languageSwitcher').events('change')
      .map(e => e.target.value),
    sources.store
      .filter(reply => reply.target === 'settings' && reply.type === 'read' && reply.data && reply.data.locale)
      .map(reply => reply.data.locale)
  ])
  .map(data => ({type: 'changeLanguage', data}))

  // set the list of available languages in the app
  const setAvailableLanguages$ = most.mergeArray([
    sources.i18n
      .filter(command => command.type === 'getAvailableLanguages')
      .map(command => command.data)
  ])
    .map(data => ({type: 'setAvailableLanguages', data}))

  return {
    requestGetAvailableLanguages$,
    requestGetDefaultLanguage$,
    requestGetLanguageData$,
    setLanguage$,
    setAvailableLanguages$
  }
}

module.exports = actions
