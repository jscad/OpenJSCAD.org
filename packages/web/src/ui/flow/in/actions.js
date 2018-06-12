const makeActions = (sources) => {
  const {setActiveTool$} = require('./tools')({sources})
  const {setTheme$} = require('./themes')({sources})
  const {requestGetAvailableLanguages$,
    requestGetDefaultLanguage$, setAvailableLanguages$, requestGetLanguageData$, setLanguage$} = require('./languages')({sources})
  const {setShortcuts$, setShortcut$, triggerFromShortcut$} = require('./shortcuts')({sources})
  const {setErrors$, clearErrors$} = require('./errors')({sources})

  const {requestRemoteFile$} = require('./requestRemoteFile')({sources})
  const {requestExport$} = require('./exports')({sources})

  const {requestReadSettings$, requestWriteSettings$} = require('../settings')({sources})

  const actions = {
    // set shortcut(s)
    setShortcuts$,
    setShortcut$,
    triggerFromShortcut$, // generic key shortuct handler
    // generic clear error action
    clearErrors$,
    setErrors$,
    // translations, languages
    requestGetLanguageData$,
    requestGetAvailableLanguages$,
    requestGetDefaultLanguage$,
    setAvailableLanguages$,
    setLanguage$,
    // examples or other http files
    requestRemoteFile$,
    // ui
    setTheme$,
    setActiveTool$,
    // io
    requestExport$,
    // settings
    requestReadSettings$,
    requestWriteSettings$
  }

  console.log('actions', actions)
  return actions
}

module.exports = makeActions
