const most = require('most')
const {flatten} = require('@jscad/core/utils/arrays')

const makeOutput = ({sources}) => {
  const addDataToFs$ = most.mergeArray([
    // injection from drag & drop
    sources.drops
      .map(({data}) => ({data, id: 'droppedData'})),
    // data retrieved from http requests
    sources.http
      .filter(response => response.id === 'loadRemote' && response.type === 'read' && !('error' in response))
      .map(({data, url}) => ({data, id: 'remoteFile', path: url, options: {isRawData: true}}))
  ])
    .map(payload => Object.assign({}, {type: 'add', sink: 'fs'}, payload))

  const watchDataFs$ = most.mergeArray([
    // watched data
    sources.state$
      .filter(state => state.design.mainPath !== '')
      .map(state => ({path: state.design.mainPath, enabled: state.autoReload}))
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(({path, enabled}) => ({
        id: 'watchScript',
        path,
        options: {enabled}})// enable/disable watch if autoreload is set to false
      )
  ])
    .map(payload => Object.assign({}, {type: 'watch', sink: 'fs'}, payload))

  const readDataFromFs$ = most.mergeArray([
    // after data was added to memfs, we get an answer back
    sources.fs
      .filter(response => response.type === 'add')
      .map(({data}) => ({data, id: 'loadDesign', path: data[0].fullPath}))
      .delay(1), // FIXME !! we have to add a 1 ms delay otherwise the source & the sink are fired at the same time
      // this needs to be fixed in callBackToStream
    // files to read/write
    sources.state$
      .filter(state => state.design.mainPath !== '')
      .map(state => state.design.mainPath)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(path => ({id: 'loadDesign', path}))
  ])
    .map(payload => Object.assign({}, {type: 'read', sink: 'fs'}, payload))

  const writeDataToFs$ = most.mergeArray([
    /* most.just()
      .map(function () {
        const electron = require('electron').remote
        const userDataPath = electron.app.getPath('userData')
        const path = require('path')

        const cachePath = path.join(userDataPath, '/cache.js')
        // const cachePath = 'gnagna'
        return {type: 'write', id: 'loadCachedGeometry', path: cachePath}
      }) */
  ])
    .map(payload => Object.assign({}, {type: 'write', sink: 'fs'}, payload))

  return most.mergeArray(flatten([
    addDataToFs$,
    watchDataFs$,
    readDataFromFs$,
    writeDataToFs$
  ]))
}

module.exports = makeOutput
