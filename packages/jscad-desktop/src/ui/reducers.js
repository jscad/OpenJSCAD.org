const {merge} = require('../utils/utils')

const changeTheme = (state, themeName) => {
  // very nice color for the cuts [0, 0.6, 1] to go with the orange
  const themes = {
    light: require('../../data/theme.light'),
    dark: require('../../data/theme.dark')
  }
  const themeData = themes[themeName]
  // console.log('changeTheme', themeName, themeData)
  const viewer = merge({}, state.viewer, themeData.viewer)
  return Object.assign({}, state, {viewer, themeName, themeSettings: themeData})
}

const changeLanguage = (state, locale) => {
  return Object.assign({}, state, {locale})
}

const setAvailableLanguages = (state, availableLanguages) => {
  return Object.assign({}, state, {availableLanguages})
}

const toggleOptions = (state) => {
  return Object.assign({}, state, {showOptions: !state.showOptions})
}

const clearErrors = (state, _) => {
  console.log('clear errors')
  return Object.assign({}, state, {error: undefined})
}
const setErrors = (state, {error}) => {
  console.log('set Errors', error)
  const formattedError = error// {message: error.message, lineno:}
  return Object.assign({}, state, {error: formattedError, busy: false})
}
const setAppUpdatesAvailable = (state, {version, available}) => {
  console.log('updates available', version, available)
  return Object.assign({}, state, {appUpdates: {version, available}})
}

module.exports = {
  changeTheme,
  changeLanguage,
  toggleOptions,
  clearErrors,
  setErrors,
  setAppUpdatesAvailable,
  setAvailableLanguages
}
