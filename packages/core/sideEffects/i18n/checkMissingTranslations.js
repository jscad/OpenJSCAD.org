const checkMissingTranslations = (translations, genericFile) => {
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
}

const missing = (master, slave) => {
  const slaveKeys = Object.keys(slave)
  return Object.keys(master).filter(key => slaveKeys.indexOf(key) === -1)
}

module.exports = checkMissingTranslations
