const most = require('most')

const makeOutput = ({sources}) => {
  return most.mergeArray([
    // injection from drag & drop
    sources.drops
      .map((data) => ({type: 'add', data: data.data, id: 'droppedData'})),
    // data retrieved from http requests
    sources.http
      .filter(response => response.id === 'loadRemote' && response.type === 'read' && !('error' in response))
      .map(response => ({type: 'add', data: response.data, id: 'remoteFile', path: response.url, options: {isRawData: true}})),
    // after data was added to memfs, we get an answer back
    sources.fs
      .filter(response => response.type === 'add')
      .map(({data}) => ({type: 'read', data, id: 'loadDesign', path: data[0].fullPath}))
      .delay(1), // FIXME !! we have to add a 1 ms delay otherwise the source & the sink are fired at the same time
      // this needs to be fixed in callBackToStream
    // watched data
    sources.state$
      .filter(state => state.design.mainPath !== '')
      .map(state => ({path: state.design.mainPath, enabled: state.autoReload}))
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(({path, enabled}) => ({
        type: 'watch',
        id: 'watchScript',
        path,
        options: {enabled}})// enable/disable watch if autoreload is set to false
      ),
    // files to read/write
    sources.state$
      .filter(state => state.design.mainPath !== '')
      .map(state => state.design.mainPath)
      .skipRepeatsWith((state, previousState) => {
        return JSON.stringify(state) === JSON.stringify(previousState)
      })
      .map(path => ({type: 'read', id: 'loadDesign', path}))
    /* most.just()
      .map(function () {
         const electron = require('electron').remote
        const userDataPath = electron.app.getPath('userData')
        const path = require('path')

        const cachePath = path.join(userDataPath, '/cache.js')
        const cachePath = 'gnagna'
        return {type: 'read', id: 'loadCachedGeometry', path: cachePath}
      }) */
  ])
}

module.exports = makeOutput
