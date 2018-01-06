const path = require('path')
const most = require('most')
const {remote} = require('electron')
const {dialog} = remote
const {getScriptFile} = require('./core/scripLoading')

const makeActions = (sources) => {
  /* sources.store
    // .map(data => ({type: 'setStatePartial', data}))
    .forEach(function (storeData) {
      console.log('storedData', storeData)
    }) */
  sources.watcher.forEach(function (data) {
    console.log('watchedFile', data)
  })

  sources.drops.forEach(function (data) {
    console.log('drop', data)
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
  .map(function (event) {
    console.log('exporting data to', event.target.value)
    /* const extension = formats[format].extension
    const defaultFileName = `${designName}.${extension}`
    const defaultFilePath = path.join(designPath, defaultFileName)
    const defaultPath = defaultFilePath */
    const filePath = dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to'})// defaultPath})//, function (filePath) {
    console.log('saving', filePath)
      /* if (filePath !== undefined) {
        const blob = convertToBlob(prepareOutput(outputData, {format}))
        const toBuffer = require('blob-to-buffer')
        toBuffer(blob, function (err, buffer) {
          if (err) {
            throw new Error(err)
          }
          fs.writeFileSync(filePath, buffer)
        })
        // const buffers = data.map(blob => Buffer.from(blob))
        // let rawData = Buffer.concat(buffers)
      } */
    // })
  })
  // .map(x => true)
  .map(data => ({type: 'exportRequested', data}))

  const changeTheme$ = most.mergeArray([
    most.fromEvent('change', document.getElementById('themeSwitcher')).map(e => e.target.value),
    sources.store.map(data => data.themeName)
  ])
  .map(data => ({type: 'changeTheme', data}))

  const setDesignPath$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('fileLoader'))
      .map(function () {
        const paths = dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']})
        return paths
      }),
    sources.store// .tap(x => console.log('gnagna', x))
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
    /* .map(function (paths) {
      const mainPath = getScriptFile(paths)
      const filePath = paths[0]
      const designName = path.parse(path.basename(filePath)).name
      const designPath = path.dirname(filePath)

      const design = {
        name: designName,
        path: designPath,
        mainPath
      }
      return design
    }) */
    .map(data => ({type: 'setDesignPath', data}))

  const updateDesignFromParams$ = most.fromEvent('click', document.getElementById('updateDesignFromParams'))
    .map(function () {
      const controls = Array.from(document.getElementById('paramsMain').getElementsByTagName('input'))
      const paramValues = controls.reduce(function (acc, control) {
        // TODO : reuse in one way or the other getParamValues
        // console.log('control', control.name, control.value, control.paramType)
        const value = control.type === 'number' ? parseFloat(control.value) : control.value
        acc[control.name] = value
        return acc
      }, {})
      return paramValues
    })
    .map(data => ({type: 'updateDesignFromParams', data}))

  return [
    toggleGrid$,
    toggleAutorotate$,
    toggleAutoReload$,
    changeExportFormat$,
    exportRequested$,
    changeTheme$,
    setDesignPath$,
    updateDesignFromParams$
  ]
}

module.exports = makeActions
