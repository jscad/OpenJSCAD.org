const callBackToStream = require('../../observable-utils/callbackToObservable')
const isElectron = require('is-electron')
const longNames = {
  en: 'english',
  de: 'german',
  fr: 'french'
}

const getDefaultLocale = () => {
  let localeBase
  // console.log('is electron', isElectron())
  if (isElectron()) {
    // localeBase = require('electron').remote.app.getLocale().split('-')[0]
  } else {
    localeBase = ((navigator.languages && navigator.languages.length) ? navigator.languages[0] : navigator.language)
  }
  return localeBase.split('-')[0]
}

const initTranslations = (options) => {
  const defaults = {
    localesPath: undefined,
    translations: {},
    baseTranslation: 'en'
  }
  const {localesPath, translations, baseTranslation} = Object.assign({}, defaults, options)
  // adapted from https://gist.github.com/gmarcos87/565d57747b30e1755046002137228562

  const genericFile = translations['en']
  //   const path = require('path')
  // const genericFile = require(path.join(localesPath, baseTranslation) + '.json')
  // Load all translation in locales folder
  // this works for desktop, not web

  // translations[baseTranslation] = {}// genericFile
  /* require('fs').readdirSync(localesPath).forEach((file) => {
    if (file.match(/\.json$/) !== null && baseTranslation + '.json' !== file) {
      let name = file.replace('.json', '')
      translations[name] = require(path.join(localesPath, file))
    }
  }) */

  // check translations
  Object.keys(translations)
    .forEach(lang => {
      const translationsMissing = missing(genericFile, translations[lang])
      const translationsSurplus = missing(translations[lang], genericFile)
      // Print Output
      // console.log('checking language', lang + '.json')
      translationsMissing.map(x => console.log('   missing ' + x))
      translationsSurplus.map(x => console.log('   extre ' + x))
    })
  return translations
}

const missing = (master, slave) => {
  const slaveKeys = Object.keys(slave)
  return Object.keys(master).filter(key => slaveKeys.indexOf(key) === -1)
}

const i18nImport = require('es2015-i18n-tag')
const i18n = i18nImport.default
const {i18nConfig} = i18nImport
// i18n, { i18nConfig }

const makei18nSideEffect = (options) => {
  const translationsCB = callBackToStream()
  const defaultLocale = getDefaultLocale()
  let translations = initTranslations(options)

  // all available commands
  const commandsMap = {
    setAvailableTranslations: command => {
      translations = command.data
    },
    getDefaultLocale: command => {
      translationsCB.callback({data: getDefaultLocale(), type: command.type})
    },
    changeSettings: command => {
      const locales = command.data
      i18nConfig({
        locales,
        translations: translations[locales]
      })
      translationsCB.callback({data: i18n, type: 'changeSettings'})
    },
    getAvailableLanguages: command => {
      const availableLanguages = Object.keys(translations)
          .map(code => {
            const fullName = longNames[code] ? longNames[code] : 'placeholder'
            return {code, fullName}
          })
      translationsCB.callback({data: availableLanguages, type: 'getAvailableLanguages'})
    }
  }

  const sink = (out$) => {
    out$.forEach(command => {
      const commandAction = commandsMap[command.type]
      if (commandAction) {
        commandAction(command)
      }
    })
  }
  const source = () => {
    return translationsCB.stream
      .multicast()
  }
  return {sink, source}
}

module.exports = makei18nSideEffect
