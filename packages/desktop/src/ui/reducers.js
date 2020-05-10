const { merge } = require('../utils/utils')

const changeTheme = (state, themeName) => {
  // very nice color for the cuts [0, 0.6, 1] to go with the orange
  const themes = {
    light: require('../../data/theme.light'),
    dark: require('../../data/theme.dark')
  }
  const themeData = themes[themeName]
  // console.log('changeTheme', themeName, themeData)
  const viewer = merge({}, state.viewer, themeData.viewer)
  return Object.assign({}, state, { viewer, themeName, themeSettings: themeData })
}

// set all shortcuts
const setShortcuts = (state, shortcuts) => {
  return Object.assign({}, state, { shortcuts })
}

// set a specific shortcut
const setShortcut = (state, shortcutData) => {
  const alreadyExists = key => {
    return state.shortcuts
      .filter(shortcut => shortcut.key === key)
      .length > 0
  }
  const shortcuts = state.shortcuts.map(shortcut => {
    const match = shortcut.command === shortcutData.command && shortcut.args === shortcutData.args
    if (!match) {
      return shortcut
    } else {
      if ('inProgress' in shortcutData) {
        const { inProgress, tmpKey } = shortcutData
        if (inProgress) {
          const error = alreadyExists(tmpKey) ? 'shortcut already exists' : undefined
          return Object.assign({}, shortcut, { inProgress, tmpKey: tmpKey, error })
        } else {
          return Object.assign({}, shortcut, { inProgress, tmpKey: tmpKey })
        }
      }
      if (shortcutData.done && !alreadyExists(shortcutData.key)) {
        const { command, args } = shortcut
        const updatedShortcut = { key: shortcutData.key, command, args }
        return updatedShortcut
      }
      return shortcut
    }
  })
  return Object.assign({}, state, { shortcuts })
}

const changeLanguage = (state, locale) => {
  return Object.assign({}, state, { locale })
}

const setAvailableLanguages = (state, availableLanguages) => {
  return Object.assign({}, state, { availableLanguages })
}

const toggleOptions = (state) => {
  return Object.assign({}, state, { showOptions: !state.showOptions })
}

const clearErrors = (state, _) => {
  console.log('clear errors')
  return Object.assign({}, state, { error: undefined })
}
const setErrors = (state, { error }) => {
  console.log('set Errors', error)
  const formattedError = error// {message: error.message, lineno:}
  return Object.assign({}, state, { error: formattedError, busy: false })
}
const setAppUpdatesAvailable = (state, appUpdates) => {
  // console.log('updates available', appUpdates)
  return Object.assign({}, state, { appUpdates })
}

module.exports = {
  changeTheme,
  setShortcuts,
  setShortcut,
  changeLanguage,
  toggleOptions,
  clearErrors,
  setErrors,
  setAppUpdatesAvailable,
  setAvailableLanguages
}
