const callBackToStream = require('../../observable-utils/callbackToObservable')
const isElectron = require('is-electron')
const longNames = {
  en: 'english',
  de: 'german',
  fr: 'french',
  ja: 'japanese'
}

const getDefaultLocale = () => {
  let localeBase
  // console.log('is electron', isElectron())
  if (isElectron()) {
    // localeBase = require('electron').remote.app.getLocale().split('-')[0]
  } else {
    localeBase = ((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language)
  }
  // some browser (for ex Beaker ) have no languages
  return localeBase ? localeBase.split('-')[0] : ''
}

const initTranslations = (options) => {
  const defaults = {
    translations: {}
  }
  const { translations } = Object.assign({}, defaults, options)
  // adapted from https://gist.github.com/gmarcos87/565d57747b30e1755046002137228562

  // const genericFile = translations['en']
  return translations
}

const i18nImport = require('es2015-i18n-tag')
const i18n = i18nImport.default
const { i18nConfig } = i18nImport

const makei18nSideEffect = (options) => {
  const translationsCB = callBackToStream()
  let translations = initTranslations(options)

  // all available commands
  const commandsMap = {
    setAvailableTranslations: (command) => {
      translations = command.data
    },
    getDefaultLocale: (command) => {
      translationsCB.callback({ data: getDefaultLocale(), type: command.type })
    },
    changeSettings: (command) => {
      const locales = command.data
      i18nConfig({
        locales,
        translations: translations[locales]
      })
      translationsCB.callback({ data: i18n, type: 'changeSettings' })
    },
    getAvailableLanguages: (command) => {
      const availableLanguages = Object.keys(translations)
        .map((code) => {
          let fullName = longNames[code] ? longNames[code] : 'placeholder'
          const translation = translations[code]
          if (translation && 'language' in translation) fullName = translation.language
          return { code, fullName }
        })
      translationsCB.callback({ data: availableLanguages, type: 'getAvailableLanguages' })
    }
  }

  const sink = (out$) => {
    out$.forEach((command) => {
      const commandAction = commandsMap[command.type]
      if (commandAction) {
        commandAction(command)
      }
    })
  }
  const source = () => translationsCB.stream.multicast()
  return { sink, source }
}

module.exports = makei18nSideEffect
