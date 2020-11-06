// UI
const SET_SHORTCUTS = 'setShortcuts'
const SET_SHORTCUT = 'setShortcut'
const SET_THEME = 'setTheme'
const SET_LANGUAGE = 'changeLanguage'
const SET_AVAILABLE_LANGUAGES = 'setAvailableLanguages'
const SET_ACTIVE_TOOL = 'setActiveTool'
const SET_SETTINGS = 'changeSettings'
// GENERIC
const SET_ERRORS = 'setErrors'
// DESIGN
const SET_DESIGN_PATH = 'setDesignPath'
const SET_DESIGN_CONTENT = 'setDesignContent'
const SET_DESIGN_SOLIDS = 'setDesignSolids'
const CANCEL_DESIGN_GENERATION = 'timeOutDesignGeneration'
const UPDATE_DESIGN_FROM_PARAMS = 'updateDesignFromParams'
const TOGGLE_GEOMETRY_CACHING = 'toggleVtreeMode'
const TOGGLE_AUTORELOAD = 'toggleAutoReload'
const TOGGLE_INSTANT_UPDATE = 'toggleInstantUpdate'
// IO
const REQUEST_EXPORT = 'exportRequested'
const CHANGE_EXPORT_FORMAT = 'changeExportFormat'
// VIEWER
const TOGGLE_VIEWER_GRID = 'toggleGrid'
const TOGGLE_VIEWER_AXES = 'toggleAxes'
const TOGGLE_VIEWER_AUTOROTATE = 'toggleAutoRotate'

module.exports = {
  SET_SHORTCUTS,
  SET_SHORTCUT,
  SET_THEME,
  SET_LANGUAGE,
  SET_AVAILABLE_LANGUAGES,
  SET_ACTIVE_TOOL,
  SET_SETTINGS,
  SET_ERRORS,

  SET_DESIGN_PATH,
  SET_DESIGN_CONTENT,
  SET_DESIGN_SOLIDS,
  UPDATE_DESIGN_FROM_PARAMS,
  CANCEL_DESIGN_GENERATION,
  TOGGLE_GEOMETRY_CACHING,
  TOGGLE_AUTORELOAD,
  TOGGLE_INSTANT_UPDATE,

  CHANGE_EXPORT_FORMAT,
  REQUEST_EXPORT,

  TOGGLE_VIEWER_AXES,
  TOGGLE_VIEWER_GRID,
  TOGGLE_VIEWER_AUTOROTATE
}
