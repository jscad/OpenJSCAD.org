const makeActions = (sources) => {
  const {setActiveTool$} = require('./tools')({sources})
  const {setTheme$} = require('./themes')({sources})
  const {requestGetAvailableLanguages$,
    requestGetDefaultLanguage$, setAvailableLanguages$, requestGetLanguageData$, setLanguage$} = require('./languages')({sources})
  const {setShortcuts$, setShortcut$, triggerFromShortcut$} = require('./shortcuts')({sources})
  const {setErrors$, clearErrors$} = require('./errors')({sources})

  const {requestExport$, changeExportFormat$} = require('./exports')({sources})

  const {requestReadSettings$, requestWriteSettings$} = require('./settings')({sources})
  const { setDesignPath$,
    setDesignContent$,
    requestGeometryRecompute$,
    timeoutGeometryRecompute$,
    setDesignSolids$,
    setDesignParameters$,
    requestLoadRemoteData$,
    requestAddDesignData$,
    requestLoadDesign$,
    requestWatchDesign$,
    toggleAutoReload$,
    toggleInstantUpdate$,
    toggleVTreeMode$} = require('./design')({sources})

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
    // ui
    setTheme$,
    setActiveTool$,
    // io
    requestExport$,
    changeExportFormat$,
    // design
    setDesignPath$,
    setDesignContent$,
    requestGeometryRecompute$,
    timeoutGeometryRecompute$,
    setDesignSolids$,
    setDesignParameters$,
    requestLoadRemoteData$,
    requestAddDesignData$,
    requestLoadDesign$,
    requestWatchDesign$,
    toggleAutoReload$,
    toggleInstantUpdate$,
    toggleVTreeMode$,
    // settings
    requestReadSettings$,
    requestWriteSettings$
  }

  console.log('actions', actions)
  return actions
}

module.exports = makeActions
