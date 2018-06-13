
module.exports = function (self) {
  const rebuildSolids = require('./rebuildGeometry')
  self.onmessage = function (event) {
    if (event.data instanceof Object) {
      // console.log('in web worker')
      const {data} = event
      if (data.cmd === 'generate') {
        rebuildSolids(data, self.postMessage)
      }
    }
  }
}
