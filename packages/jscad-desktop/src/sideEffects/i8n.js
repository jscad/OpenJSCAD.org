const i18next = require('i18next')

const {create} = require('@most/create')

module.exports = getTranslations = (translationPaths) => {
  return create((add, end, error) => {
    i18next.init({
      lng: 'en',
      resources: translationPaths
    }, (err, t) => {
      if (err) {
        error(err)
      } else {
        add(t)
      }
    })
  })
}