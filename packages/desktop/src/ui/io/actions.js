const { remote } = require('electron')
const { dialog } = remote
const saveDataToFs = require('../../core/io/saveDataToFs')

const actions = (sources) => {
  const changeExportFormat$ = sources.dom.select('#exportFormats').events('change')
    .map(e => e.target.value)
    .map(data => ({ type: 'changeExportFormat', data }))

  const exportRequested$ = sources.dom.select('#exportBtn').events('click')
    .sample(function (state, event) {
      const defaultExportFilePath = state.exportFilePath
      return { defaultExportFilePath, exportFormat: state.exportFormat, data: state.design.solids }
    }, sources.state$)
    .map(function ({ defaultExportFilePath, exportFormat, data }) {
      // console.log('exporting data to', defaultExportFilePath)
      const filePath = dialog.showSaveDialog({ properties: ['saveFile'], title: 'export design to', defaultPath: defaultExportFilePath })//, function (filePath) {
      // console.log('saving', filePath)
      if (filePath !== undefined) {
        // FIXME: BAD ! does not use side effects!
        saveDataToFs(data, exportFormat, filePath)
      }
    })
    .map(data => ({ type: 'exportRequested', data }))

  return {
    changeExportFormat$,
    exportRequested$
  }
}

module.exports = actions
