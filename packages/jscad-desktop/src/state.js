const {mergeArray} = require('most')
const packageMetadata = require('../package.json')
const {merge, toArray} = require('./utils')
const {getScriptFile, loadScript} = require('./core/scripLoading')

// very nice color for the cuts [0, 0.6, 1] to go with the orange
const themes = {
  light: require('../data/theme.light'),
  dark: require('../data/theme.dark')
}

const initialState = {
  appTitle: `jscad v ${packageMetadata.version}`,
  // for possible errors
  error: undefined,
  // design data
  design: {
    name: '',
    path: '',
    mainPath: '',
    script: '',
    paramDefinitions: [],
    paramValues: {},
    previousParams: {},
    solids: [],
    // list of all paths of require() calls + main
    modulePaths: []
  },
  // export
  exportFormat: '',
  exportFilePath: '', // default export file path
  availableExportFormats: [],
  // status/toggles
  autoReload: true,
  instantUpdate: true,
  busy: false,
  // visuals
  themeName: 'light',
  mainTextColor: '#FFF',
  viewer: {// ridiculous shadowing of viewer state ?? or actually logical
    // camera: {position: [150, 150, 250]},
    rendering: {
      background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
      meshColor: [0.4, 0.6, 0.5, 1] // nice orange : [1, 0.4, 0, 1]
    },
    grid: {
      show: false,
      color: [1, 1, 1, 0.1]
    },
    axes: {
      show: true
    },
    smoothNormals: true,
    // UGH
    behaviours: {
      resetViewOn: []
    }
  },
  // UI
  shortcuts: require('../data/keybindings.json')
}

function makeState (actions) {
  // const reducers = //Object.assign({}, dataParamsReducers, cameraControlsReducers)
  actions = mergeArray(actions)
  const reducers = {
    toggleAutorotate: (state, autoRotate) => {
      const controls = Object.assign({}, state.viewer.controls, {autoRotate: {enabled: autoRotate}})
      const viewer = Object.assign({}, state.viewer, {controls})
      return Object.assign({}, state, {viewer})
    },
    toggleGrid: (state, show) => {
      const grid = Object.assign({}, state.viewer.grid, {show})
      const viewer = Object.assign({}, state.viewer, {grid})
      return Object.assign({}, state, {viewer})
    },
    toggleAxes: (state, show) => {
      const axes = Object.assign({}, state.viewer.axes, {show})
      const viewer = Object.assign({}, state.viewer, {axes})
      return Object.assign({}, state, {viewer})
    },
    toPresetView: (state, viewName) => {
      const viewer = Object.assign({}, state.viewer, {camera: {position: viewName}})
      return Object.assign({}, state, {viewer})
    },
    setProjectionType: (state, projectionType) => {
      const viewer = Object.assign({}, state.viewer, {camera: {projectionType}})
      return Object.assign({}, state, {viewer})
    },
    changeTheme: (state, themeName) => {
      const themeData = themes[themeName]
      // console.log('changeTheme', themeName, themeData)
      const viewer = merge({}, state.viewer, themeData.viewer)
      return Object.assign({}, state, {viewer, themeName, mainTextColor: themeData.mainTextColor})
    },
    toggleAutoReload: (state, autoReload) => {
      return Object.assign({}, state, {autoReload})
    },
    toggleInstantUpdate: (state, instantUpdate) => {
      // console.log('toggleInstantUpdate', instantUpdate)
      return Object.assign({}, state, {instantUpdate})
    },
    changeExportFormat: (state, exportFormat) => {
      return Object.assign({}, state, exportFilePathFromFormatAndDesign(state.design, exportFormat))
    },
    setDesignPath: (state, paths) => {
      console.log('setDesignPath')
      const mainPath = getScriptFile(paths)
      const filePath = paths[0]
      const path = require('path')
      const designName = path.parse(path.basename(filePath)).name
      const designPath = path.dirname(filePath)

      const design = Object.assign({}, state.design, {
        name: designName,
        path: designPath,
        mainPath
      })

      // we want the viewer to focus on new entities for our 'session' (until design change)
      const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: ['new-entities']}})
      return Object.assign({}, state, {busy: true, viewer, design})
    },
    setDesignContent: (state, mainScriptAsText) => {
      console.log('setDesignContent')
      const path = require('path')
      // experimental
      // const {astFromSource, csgTree} = require('./core/code-analysis/index')
      // const ast = astFromSource(mainScriptAsText)
      // const prevAst = astFromSource(state.design.script)
      /*console.log('ast', ast)

      const differences = findByPredicate(isDifference, node => node, ast)
      console.log('differences', differences)

      const cubes = findByPredicate(isCube, node => node, ast)
      console.log('cubes', cubes)

      const spheres = findByPredicate(isSphere, node => node, ast)
      console.log('spheres', spheres) */
      // console.log('previous ast')
      // csgTree(prevAst)
      // console.log('current ast', ast)
      // csgTree(ast)
      //
      // console.log('setDesignContent')
      const detective = require('detective-cjs')
      const rawDependencies = detective(mainScriptAsText)
      const dependencies = Array.from(new Set(rawDependencies))
      const {mainPath} = state.design

      const dependencyAbsPaths = dependencies.map(depPath => path.join(state.design.path, depPath))
      const scriptModulePaths = [mainPath, ...dependencyAbsPaths]
      // console.log('all script paths', scriptModulePaths)
      // require('./core/scripLoading').requireUncached(mainPath)
      // load script
      const {scriptRootModule, paramDefinitions, params} = loadScript(mainScriptAsText, mainPath)
      // console.log('paramDefinitions', paramDefinitions, 'params', params)
      let solids = toArray(scriptRootModule.main(params))
      /*
        func(paramDefinitions) => paramsUI
        func(paramsUI + interaction) => params
      */
      const design = Object.assign({}, state.design, {
        script: scriptRootModule,
        paramDefinitions,
        paramValues: params,
        solids,
        modulePaths: scriptModulePaths
      })

      const {supportedFormatsForObjects, formats} = require('./io/formats')
      const formatsToIgnore = ['jscad', 'js']
      const availableExportFormats = supportedFormatsForObjects(solids)
        .filter(formatName => !formatsToIgnore.includes(formatName))
        .map(function (formatName) {
          return {name: formatName, displayName: formats[formatName].displayName}
        })
      let exportFormat = availableExportFormats[0].name

      console.log('done updating design from path')
      // FIXME: UGHH so goddam verbose !
      const viewer = Object.assign({}, state.viewer, {behaviours: {resetViewOn: [''], zoomToFitOn: ['new-entities']}})
      const exportInfos = exportFilePathFromFormatAndDesign(design, exportFormat)
      const appTitle = `jscad v ${packageMetadata.version}: ${state.design.name}`
      return Object.assign({}, state, {design, viewer}, {
        availableExportFormats,
        exportFormat,
        appTitle,
        busy: false,
        error: undefined
      },
      exportInfos)
    },
    updateDesignFromParams: (state, {paramValues, origin, error}) => {
      if (error) {
        throw error
        // return Object.assign({}, state, {error})
      }
      // console.log('updateDesignFromParams')
      // disregard live updates if not enabled
      if (state.instantUpdate === false && origin === 'instantUpdate') {
        return state
      }
      let originalDesign = state.design
      const {script} = originalDesign

      const solids = toArray(script.main(paramValues))
      const design = Object.assign({}, originalDesign, {solids, paramValues})
      return Object.assign({}, state, {design, error: undefined})
    },

    clearErrors: (state, _) => {
      console.log('clear errors')
      return Object.assign({}, state, {error: undefined})
    }
  }

  const state$ = actions
    .scan(function (state, action) {
      const reducer = reducers[action.type] ? reducers[action.type] : (state) => state
      try {
        const newState = reducer(state, action.data, initialState)
        return newState
      } catch (error) {
        console.error('caught error', error)
        return Object.assign({}, state, {error})
      }
      // const newState = merge({}, state, updatedData)
      // console.log('SCAAAN', action, newState)
    }, initialState)
    .filter(x => x !== undefined)// just in case ...
    .multicast()

  return state$
}

module.exports = {makeState, initialState}

// state utilities , extract at some point
const exportFilePathFromFormatAndDesign = (design, exportFormat) => {
  const path = require('path')
  const {formats} = require('./io/formats')

  const extension = formats[exportFormat].extension
  const defaultFileName = `${design.name}.${extension}`
  const exportFilePath = path.join(design.path, defaultFileName)

  return {exportFormat, exportFilePath}
}
