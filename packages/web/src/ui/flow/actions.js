const makeActions = (sources) => {
  const toolActions = require('./tools')({sources})
  const themeActions = require('./themes')({sources})
  const languageActions = require('./languages')({sources})
  const shortcutActions = require('./shortcuts')({sources})
  const errorActions = require('./errors')({sources})
  const exportActions = require('./exports')({sources})

  // Todo: each 'store' needs to handle its own saving to settings, independantly from the others
  const settingsActions = require('./settings')({sources})
  const designActions = require('./design')({sources})

  //const actions = {
    // set shortcut(s)
    /* setShortcuts$,
    setShortcut$,
    triggerFromShortcut$, // generic key shortuct handler
    */
    // generic clear error action
    /* clearErrors$,
    setErrors$, */
    // translations, languages
    // ui
    // setActiveTool$,
    // io
    /* initializeExports$,
    requestExport$,
    changeExportFormat$, */
    // design
    /* setDesignPath$,
    setDesignContent$,
    requestGeometryRecompute$,
    timeoutGeometryRecompute$,
    setDesignSolids$,
    setDesignParameters$,
    requestLoadRemoteData$,
    requestAddDesignData$,
    requestLoadDesign$,
    requestWriteCachedGeometry$,
    requestWatchDesign$,
    toggleAutoReload$,
    toggleInstantUpdate$,
    toggleVTreeMode$ */
    // settings
    /* requestReadSettings$,
    requestWriteSettings$ */

  return Object.assign({},
    errorActions,
    designActions,
    exportActions,

    settingsActions,

    toolActions,
    themeActions,
    languageActions,
    shortcutActions
  )
}

module.exports = makeActions
