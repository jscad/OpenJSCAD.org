const most = require('most')
const {exportFilePathFromFormatAndDesign} = require('../../core/io/exportUtils')
const withLatestFrom = require('../../utils/observable-utils/withLatestFrom')
// const saveDataToFs = require('../../core/io/saveDataToFs')

const reducers = {
  initialize: (state) => {
    const exports = {
      exportFormat: '',
      exportFilePath: '', // default export file path
      availableExportFormats: []
    }
    return Object.assign({}, state, {io: exports})
  },
  setExportFormat: (exportFormat, state) => {
    console.log('exportformat', exportFormat, state)
    return Object.assign({}, state, exportFilePathFromFormatAndDesign(state.design, exportFormat))
  },
  requestExport: (state, event) => {
    console.log('event', event)
    const defaultExportFilePath = state.exportFilePath
    /* const filePath = undefined // dialog.showSaveDialog({properties: ['saveFile'], title: 'export design to', defaultPath: defaultExportFilePath})//, function (filePath) {
      console.log('saving', filePath)
      if (filePath !== undefined) {
        // FIXME: BAD ! does not use side effects!
        saveDataToFs(data, exportFormat, filePath)
      } */
      // return {defaultExportFilePath, exportFormat, data}
    return {defaultExportFilePath, exportFormat: state.exportFormat, data: state.design.solids}
  }
}

const actions = ({sources}) => {
  const initializeExports$ = most.just({})
    .thru(withLatestFrom(reducers.initialize, sources.state))
    .map(payload => Object.assign({}, {type: 'initializeExports', sink: 'state'}, {state: payload}))

  const changeExportFormat$ = sources.dom.select('#exportFormats').events('change')
    .map(e => e.target.value)
    .thru(withLatestFrom(reducers.setExportFormat, sources.state))
    .map(payload => Object.assign({}, {type: 'changeExportFormat', sink: 'state'}, {state: payload}))
    .multicast()

  const requestExport$ = sources.dom.select('#exportBtn').events('click')
    .thru(withLatestFrom(reducers.requestExport, sources.state))
    .map(data => ({type: 'exportRequested', data}))

  return {initializeExports$, requestExport$, changeExportFormat$}
}

 // TODO : move to side effect
 /*actions$.requestExport$.forEach(action => {
  console.log('export requested', action)
  const {saveAs} = require('file-saver')
  const {prepareOutput} = require('../../core/io/prepareOutput')
  const {convertToBlob} = require('../../core/io/convertToBlob')

  const outputData = action.data.data
  const format = action.data.exportFormat
  const blob = convertToBlob(prepareOutput(outputData, {format}))
  // fs.writeFileSync(filePath, buffer)
  saveAs(blob, action.data.defaultExportFilePath)
}) */

module.exports = actions
