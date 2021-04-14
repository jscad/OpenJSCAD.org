const { exportFilePathFromFormatAndDesign } = require('../../core/io/exportUtils')

const initialize = () => {
  return {
    exportFormat: '',
    exportFilePath: '', // default export file path
    availableExportFormats: []
  }
}
const changeExportFormat = (state, exportFormat) => {
  return Object.assign({}, state, exportFilePathFromFormatAndDesign(state.design, exportFormat))
}

module.exports = {
  initialize,
  changeExportFormat
}
