const { exportFilePathFromFormatAndDesign } = require('../../core/io/exportUtils')

const initialize = () => ({
  exportFormat: '',
  exportFilePath: '', // default export file path
  availableExportFormats: []
})
const changeExportFormat = (state, exportFormat) => Object.assign({}, state, exportFilePathFromFormatAndDesign(state.design, exportFormat))

module.exports = {
  initialize,
  changeExportFormat
}
