
module.exports = self => {
  const rebuildGeometry = require('./rebuildGeometry')
  self.onmessage = function (event) {
    if (event.data instanceof Object) {
      const { data } = event
      if (data.cmd === 'generate') {
        rebuildGeometry(data, self.postMessage)
      }
    }
  }
}
