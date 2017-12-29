const {mergeArray} = require('most')
const packageMetadata = require('../package.json')
const {merge} = require('./utils')
const {getScriptFile, loadScript} = require('./core/scripLoading')
/*
let settings = require('./settings')
let themeName = store.get('ui.theme.name', settings.theme)
let designName = store.get('lastDesign.name', undefined)
let designPath = store.get('lastDesign.path', undefined) */

// very nice color for the cuts [0, 0.6, 1] to go with the orange
const themes = {
  light: {
    background: [1, 1, 1, 1],
    meshColor: [0, 0.6, 1, 1],
    grid: {
      color: [0.1, 0.1, 0.1, 0.5]
    }
  },
  dark: {
    background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
    meshColor: [0.4, 0.6, 0.5, 1],
    grid: {
      color: [1, 1, 1, 0.5]
    }
  }
}

const initialState = {
  appTitle: `${packageMetadata.name} v ${packageMetadata.version}`,
  themeName: 'light',
  design: {
    name: '',
    path: '',
    mainPath: '',
    previousParams: {}
  },
  exportFormat: '',
  availableExportFormats: [],
  autoReload: true,

  viewer: {
    background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
    meshColor: [0.4, 0.6, 0.5, 1], // nice orange : [1, 0.4, 0, 1]
    grid: {
      show: false,
      color: [1, 1, 1, 0.1]
    },
    axes: {
      show: true
    },
    lighting: {
      smooth: true
    }
  }
}

function makeState (actions) {
  // const reducers = //Object.assign({}, dataParamsReducers, cameraControlsReducers)
  actions = mergeArray(actions)
  const reducers = {
    toggleAutoReload: (state, autoReload) => {
      return Object.assign({}, state, {autoReload})
    },
    changeExportFormat: (state, exportFormat) => {
      console.log('changeExportFormat')
      return Object.assign({}, state, {exportFormat})
    },
    toggleGrid: (state, show) => {
      const grid = Object.assign({}, state.viewer.grid, {show})
      const viewer = Object.assign({}, state.viewer, {grid})
      return Object.assign({}, state, {viewer})
    },
    changeTheme: (state, themeName) => {
      const viewer = merge({}, state, themes[themeName])
      // TODO: move some of this to side effects
      // console.log('params in app', themedViewerOptions.background)
      // const background = themedViewerOptions.grid.color//.map(x => x * 255)
      // const bgColorRgba = `rgba(${[...background.map(x => x * 255)].join(', ')})`
      // console.log(bgColorRgba)
      const bgColorRgba = themeName === 'light' ? 'black' : 'white'
      document.getElementById('controls').style.color = bgColorRgba
      document.getElementById('params').style.color = bgColorRgba
      return Object.assign({}, state, {viewer})
    },
    setDesignPath: (state, paths) => {
      console.log('setDesignPath')
      const mainPath = getScriptFile(paths)
      const filePath = paths[0]
      const path = require('path')
      const designName = path.parse(path.basename(filePath)).name
      const designPath = path.dirname(filePath)

      // load script
      const {jscadScript, paramDefinitions, params} = loadScript(filePath)
      const {rebuildSolid} = require('./core/rebuildSolid')
      const paramControls = []
      const solids = rebuildSolid(jscadScript, paramControls)

      const design = {
        name: designName,
        path: designPath,
        mainPath,
        script: jscadScript,
        paramDefinitions,
        solids
      }

      const {supportedFormatsForObjects} = require('./io/formats')
      const formatsToIgnore = ['jscad', 'js']
      const availableExportFormats = supportedFormatsForObjects(solids)
        .filter(formatName => !formatsToIgnore.includes(formatName))
      let exportFormat = availableExportFormats[0]

      return Object.assign({}, state, {design}, {availableExportFormats, exportFormat})
    }
  }

  const state$ = actions
    .scan(function (state, action) {
      const reducer = reducers[action.type] ? reducers[action.type] : (state) => state
      const newState = reducer(state, action.data, initialState)
      // const newState = merge({}, state, updatedData)
      // console.log('SCAAAN', action, newState)
      return newState
    }, initialState)
    .filter(x => x !== undefined)// just in case ...
    .multicast()

  return state$
}

module.exports = makeState
