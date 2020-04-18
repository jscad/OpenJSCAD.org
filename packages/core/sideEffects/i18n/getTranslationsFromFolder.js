const getTranslationsInFolder = (localesPath, baseTranslation) => {
  const path = require('path')
  const genericFile = require(path.join(localesPath, baseTranslation) + '.json')
  // Load all translation in locales folder
  // this works for desktop, not web
  const translations = {}
  translations[baseTranslation] = genericFile
  require('fs').readdirSync(localesPath).forEach((file) => {
    if (file.match(/\.json$/) !== null && baseTranslation + '.json' !== file) {
      let name = file.replace('.json', '')
      translations[name] = require(path.join(localesPath, file))
    }
  })
  return translations
}
