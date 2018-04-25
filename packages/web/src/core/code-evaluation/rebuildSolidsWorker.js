
module.exports = function (self) {
  const rebuildSolids = require('./rebuildSolids2')
  self.onmessage = function (event) {
    if (event.data instanceof Object) {
      // console.log('in web worker')
      const {data} = event
      if (data.cmd === 'render') {
        rebuildSolids(data, self.postMessage)
      }
    }
  }
}
