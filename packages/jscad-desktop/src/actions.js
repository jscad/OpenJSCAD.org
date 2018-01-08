const path = require('path')
const most = require('most')
const {remote} = require('electron')
const {dialog} = remote
const {getScriptFile} = require('./core/scripLoading')

const makeActions = (sources) => {
  sources.watcher.forEach(function (data) {
    console.log('watchedFile', data)
  })

  sources.drops.forEach(function (data) {
    console.log('drop', data)
  })

  sources.fs.forEach(function (data) {
    console.log('fs operations', data)
  })

  sources.paramChanges.forEach(function (data) {
    console.log('param changes', data)
  })

  const toggleGrid$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('grid')).map(e => e.target.checked),
    sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleGrid', data}))

  const toggleAutorotate$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('autoRotate')).map(e => e.target.checked)
      // sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleAutorotate', data}))

  const toggleAutoReload$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('autoReload'))
      .map(e => e.target.checked),
    sources.store.map(data => data.autoReload)
  ])
  .map(data => ({type: 'toggleAutoReload', data}))

  const changeExportFormat$ = most.fromEvent('change', document.getElementById('exportFormats'))
    .map(e => e.target.value)
    .map(data => ({type: 'changeExportFormat', data}))

  const exportRequested$ = most.fromEvent('click', document.getElementById('exportBtn'))
    .sample(function (state, event) {
      console.log('state stuff', state, event)
      const defaultExportFilePath = state.exportFilePath
      return {defaultExportFilePath, exportFormat: state.exportFormat, data: state.design.solids}
    }, sources.state$)
    .map(function ({defaultExportFilePath, exportFormat, data}) {
      console.log('exporting data to', defaultExportFilePath)
      /* const extension = formats[format].extension
      const defaultExportFileName = `${designName}.${extension}`
      const defaultExportFilePath = path.join(designPath, defaultFileName)
      const defaultPath = defaultExportFilePath */
      const filePath = dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to', defaultPath: defaultExportFilePath})//, function (filePath) {
      console.log('saving', filePath)
      if (filePath !== undefined) {
        const saveDataToFs = require('./io/saveDataToFs')
        saveDataToFs(data, exportFormat, filePath)
      }
    })
    .map(data => ({type: 'exportRequested', data}))

  const changeTheme$ = most.mergeArray([
    most.fromEvent('change', document.getElementById('themeSwitcher')).map(e => e.target.value),
    sources.store.map(data => data.themeName)
  ])
  .map(data => ({type: 'changeTheme', data}))

  // non visual related actions
  const toggleInstantUpdate$ = most.fromEvent('click', document.getElementById('instantUpdate'))
    .map(event => ({type: 'toggleInstantUpdate', data: event.target.checked}))

  const designPath$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('fileLoader'))
      .map(function () {
        const paths = dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
        return paths
      }),
    sources.store
      .map(data => data.design.mainPath)
      .filter(data => data !== '')
      .map(data => [data]),
    sources.drops
      .filter(drop => drop.type === 'fileOrFolder' && drop.data.length > 0)
      .map(drop => drop.data.map(fileOrFolder => fileOrFolder.path)),
    sources.watcher
      .map(path => [path])
  ])
    .filter(data => data !== undefined)
    .multicast()

  const designLoadRequested$ = designPath$
    .map(data => ({type: 'designLoadRequested', data}))

  const setDesignPath$ = designPath$
    .map(data => ({type: 'setDesignPath', data}))
    .delay(1)

  const setDesignScriptContent$ = most.mergeArray([
    sources.fs.filter()
  ])
    .map(data => ({type: 'setDesignScriptContent', data}))

  const updateDesignFromParams$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('updateDesignFromParams'))
      .map(function () {
        const controls = Array.from(document.getElementById('paramsMain').getElementsByTagName('input'))
        const paramValues = require('./core/getParamValues')(controls)
        return paramValues
      }),
    sources.paramChanges.map(function (controls) {
      const paramValues = require('./core/getParamValues')(controls)
      console.log('paramValues', paramValues)
      return paramValues
    })
  ])
    .map(data => ({type: 'updateDesignFromParams', data}))

  return {
    toggleGrid$,
    toggleAutorotate$,
    toggleAutoReload$,
    toggleInstantUpdate$,
    changeExportFormat$,
    exportRequested$,
    changeTheme$,
    setDesignPath$,
    designLoadRequested$,
    updateDesignFromParams$
  }
}

module.exports = makeActions
