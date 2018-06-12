const most = require('most')

const actions = ({sources}) => {
  const requestGetAvailableLanguages$ = most
    .just({type: 'getAvailableLanguages', sink: 'i18n'})

  const requestGetDefaultLanguage$ = most
    .just({type: 'getDefaultLocale', sink: 'i18n'})

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

  const setAvailableLanguages$ = most.mergeArray([
    sources.i18n
      .filter(command => command.type === 'getAvailableLanguages')
      .map(command => command.data)
  ])
  .map(data => ({type: 'setAvailableLanguages', data}))

  return {
    requestGetAvailableLanguages$,
    requestGetDefaultLanguage$,
    setLanguage$,
    setAvailableLanguages$
  }
}

module.exports = actions
