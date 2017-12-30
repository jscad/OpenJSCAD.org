const most = require('most')
const {remote} = require('electron')
const {dialog} = remote

const makeActions = (sources) => {
  /* sources.store
    // .map(data => ({type: 'setStatePartial', data}))
    .forEach(function (storeData) {
      console.log('storedData', storeData)
    }) */

  const toggleGrid$ = most.mergeArray([
    most.fromEvent('click', document.getElementById('grid')).map(e => e.target.checked),
    sources.store.map(data => data.viewer.grid.show)
  ])
    .map(data => ({type: 'toggleGrid', data}))

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
      .map(data => [data])
  ])
    .filter(data => data !== undefined)
    .map(data => ({type: 'setDesignPath', data}))

  const updateDesignFromParams$ = most.never()
  //most.fromEvent('click', document.getElementById('updateDesignFromParams'))
    .map(data => ({type: 'updateDesignFromParams', data}))

/*  format = event.target.value
  const exportText = `export to ${format}`
  formatButton.value = exportText
} */
/* toggleGrid$.forEach(x => console.log('grid', x))
toggleAutoReload$.forEach(x => console.log('autoReload', x))
changeExportFormat$.forEach(x => console.log('changeExportFormat$', x))
exportRequested$.forEach(x => console.log('export requested'))
changeTheme$.forEach(x => console.log('changeTheme requested', x)) */

  return actions = [
    toggleGrid$,
    toggleAutoReload$,
    changeExportFormat$,
    exportRequested$,
    changeTheme$,
    setDesignPath$,
    updateDesignFromParams$
  ]
}

module.exports = makeActions
