const path = require('path')
const most = require('most')
const {remote} = require('electron')
const {dialog} = remote
const {getScriptFile} = require('../core/scripLoading')
const {head} = require('../utils')

function compositeKeyFromKeyEvent (event) {
  const ctrl = event.ctrlKey ? 'ctrl+' : ''
  const shift = event.shiftKey ? 'shift+' : ''
  const meta = event.metaKey ? 'command+' : ''
  let key = event.key.toLowerCase()
  if (ctrl && key === 'control') {
    key = ''
  }
  if (shift && key === 'shift') {
    key = ''
  }
  if (meta && key === 'meta') {
    key = ''
  }
  const compositeKey = `${ctrl}${shift}${meta}${key}`
  return compositeKey
}

const makeActions = (sources) => {
  /* sources.watcher.forEach(function (data) {
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
  }) */

  // keyboard shortcut handling
  const keyDowns$ = most.fromEvent('keyup', document)
  const actionsFromKey$ = most.sample(function (event, state) {
    const compositeKey = compositeKeyFromKeyEvent(event)
    const matchingAction = head(state.shortcuts.filter(shortcut => shortcut.key === compositeKey))
    if (matchingAction) {
      const {command, args} = matchingAction
      return {type: command, data: args}
    }
    return undefined
  }, keyDowns$, keyDowns$, sources.state$)
    .filter(x => x !== undefined)

  const toggleGrid$ = most.mergeArray([
    sources.dom.select('#grid').events('click')
      .map(e => e.target.checked),
    sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleGrid', data}))

  const toggleAxes$ = most.mergeArray([
    sources.dom.select('#toggleAxes').events('click')
      .map(e => e.target.checked)
    // sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleAxes', data}))

  const toggleAutorotate$ = most.mergeArray([
    sources.dom.select('#autoRotate').events('click')
    .map(e => e.target.checked)
      // sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleAutorotate', data}))

  const changeTheme$ = most.mergeArray([
    sources.dom.select('#themeSwitcher').events('change')
      .map(e => e.target.value),
    sources.store.map(data => data.themeName)
  ])
  .map(data => ({type: 'changeTheme', data}))

  // non visual related actions
  const toggleAutoReload$ = most.mergeArray([
    sources.dom.select('#autoReload').events('click')
      .map(e => e.target.checked),
    sources.store
      .map(data => data.autoReload)
  ])
  .map(data => ({type: 'toggleAutoReload', data}))

  const toggleInstantUpdate$ = most.mergeArray([
    sources.dom.select('#instantUpdate').events('click').map(event => event.target.checked),
    sources.store.map(data => data.instantUpdate)
  ])
    .map(data => ({type: 'toggleInstantUpdate', data}))

  const changeExportFormat$ = sources.dom.select('#exportFormats').events('change')
    .map(e => e.target.value)
    .map(data => ({type: 'changeExportFormat', data}))

  const exportRequested$ = sources.dom.select('#exportBtn').events('click')
    .sample(function (state, event) {
      const defaultExportFilePath = state.exportFilePath
      return {defaultExportFilePath, exportFormat: state.exportFormat, data: state.design.solids}
    }, sources.state$)
    .map(function ({defaultExportFilePath, exportFormat, data}) {
      // console.log('exporting data to', defaultExportFilePath)
      const filePath = dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to', defaultPath: defaultExportFilePath})//, function (filePath) {
      // console.log('saving', filePath)
      if (filePath !== undefined) {
        const saveDataToFs = require('../io/saveDataToFs')
        saveDataToFs(data, exportFormat, filePath)
      }
    })
    .map(data => ({type: 'exportRequested', data}))

  const designPath$ = most.mergeArray([
    sources.dom.select('#fileLoader').events('click')
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
      .map(drop => drop.data.map(fileOrFolder => fileOrFolder.path))
  ])
    .filter(data => data !== undefined)
    .debounce(50)
    .multicast()

  const setDesignPath$ = designPath$
    .map(data => ({type: 'setDesignPath', data}))
    .delay(1)

  const setDesignContent$ = most.mergeArray([
    sources.fs.filter(data => data.operation === 'read').map(raw => raw.data),
    sources.watcher.map(({filePath, contents}) => contents)
  ])
    .map(data => ({type: 'setDesignContent', data}))

  // design parameter change actions
  const updateDesignFromParams$ = most.mergeArray([
    sources.dom.select('#updateDesignFromParams').events('click')
      .map(function () {
        const controls = Array.from(document.getElementById('paramsMain').getElementsByTagName('input'))
          .concat(Array.from(document.getElementById('paramsMain').getElementsByTagName('select')))
        const paramValues = require('../core/getParameterValues')(controls)
        return {paramValues, origin: 'manualUpdate'}
      })
      .multicast(),
    sources.paramChanges.multicast().map(function (_controls) {
      // FIXME: clunky
      try {
        const controls = Array.from(document.getElementById('paramsMain').getElementsByTagName('input'))
          .concat(Array.from(document.getElementById('paramsMain').getElementsByTagName('select')))
        const paramValues = require('../core/getParameterValues')(controls)
        return {paramValues, origin: 'instantUpdate'}
      } catch (error) {
        return {error, origin: 'instantUpdate'}
      }
    })

  ])
    // .map(data => ({type: 'updateDesignFromParams', data}))

  const setDesignSolids$ = most.mergeArray([
    sources.solidWorker
      .filter(event => !('error' in event))
      .map(function (event) {
        try {
          if (event.data instanceof Object) {
            const { CAG, CSG } = require('@jscad/csg')
            const solids = event.data.solids.map(function (object) {
              if (object['class'] === 'CSG') { return CSG.fromCompactBinary(object) }
              if (object['class'] === 'CAG') { return CAG.fromCompactBinary(object) }
            })
            const {paramDefaults, paramValues, paramDefinitions} = event.data
            return {solids, paramDefaults, paramValues, paramDefinitions}
          }
        } catch (error) {
          return {error}
        }
      })
  ])
    .map(data => ({type: 'setDesignSolids', data}))

  const setErrors$ = most.mergeArray([
    sources.solidWorker.filter(event => 'error' in event)
  ])
    .map(data => ({type: 'setErrors', data}))

  const clearErrors$ = most.never() /* sources.state$
    .filter(state => state.error !== undefined)
    .map(state => state.error)
    .skipRepeats()
    .map(x => undefined)
    .map(data => ({type: 'clearErrors', data}))
    .delay(30000) */
    // .forEach(x => console.log('clear errors', x))

  const timeOutDesignGeneration$ = designPath$
    .delay(20000)
    .map(data => ({type: 'timeOutDesignGeneration', data}))
    .tap(x => console.log('timeOutDesignGeneration'))

  return {
    // generic key shortuct handler
    actionsFromKey$,
    // generic clear error action
    clearErrors$,
    setErrors$,
    // 3d viewer
    toggleGrid$,
    toggleAxes$,
    toggleAutorotate$,
    // ui
    changeTheme$,
    toggleAutoReload$,
    toggleInstantUpdate$,
    // design
    setDesignPath$,
    setDesignContent$,
    updateDesignFromParams$,
    timeOutDesignGeneration$,
    setDesignSolids$,
    // exports
    changeExportFormat$,
    exportRequested$
  }
}

module.exports = makeActions
