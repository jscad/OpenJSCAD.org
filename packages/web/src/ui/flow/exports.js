const most = require('most')
const { exportFilePathFromFormatAndDesign } = require('../../core/io/exportUtils')
const { solidsAsBlob } = require('@jscad/io')
const withLatestFrom = require('@jscad/core/observable-utils/withLatestFrom')

const reducers = {
  initialize: (state) => {
    const io = {
      exportFormat: '',
      exportFilePath: '', // default export file path
      availableExportFormats: []
    }
    return { io }
  },
  setExportFormat: (state, exportFormat) => {
    console.log('exportformat', exportFormat, state)
    const io = Object.assign({}, state.io, exportFilePathFromFormatAndDesign(state.design, exportFormat))
    return { io }
  },
  requestExport: (state, _) => {
    const { exportFilePath, exportFormat } = state.io
    const { solids } = state.design
    /* const filePath = undefined // dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to', defaultPath: defaultExportFilePath})//, function (filePath) {
      */
    // return {defaultExportFilePath, exportFormat, data}
    console.log('export requested', solids, exportFilePath)
    const { saveAs } = require('file-saver')
    const format = exportFormat
    const blob = solidsAsBlob(solids, { format })
    // FIXME: BAD ! does not use side effects!
    // fs.writeFileSync(filePath, buffer)
    saveAs(blob, exportFilePath)
    // const io = Object.assign({}, state.io, {defaultExportFilePath, exportFormat: state.exportFormat, data: state.design.solids})
    // return {io}
  }
}
// boilerplate ? const initializeExports$ = init({}, 'export', 'state', reducers.initialize)

const actions = ({ sources }) => {
  const initializeExports$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(payload => Object.assign({}, { type: 'initializeExports', sink: 'state' }, { state: payload }))

  const changeExportFormat$ = sources.dom.select('#exportFormats').events('change')
    .map(e => e.target.value)
    .thru(withLatestFrom(reducers.setExportFormat, sources.state))
    .map(payload => Object.assign({}, { type: 'changeExportFormat', sink: 'state' }, { state: payload }))
    .multicast()

  const requestExport$ = sources.dom.select('#exportBtn').events('click')
    .thru(withLatestFrom(reducers.requestExport, sources.state))
    .map(data => ({ type: 'exportRequested', data }))

  return { initializeExports$, requestExport$, changeExportFormat$ }
}

module.exports = actions
