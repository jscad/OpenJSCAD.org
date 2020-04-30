const Store = require('electron-store')
const store = new Store()
const most = require('most')

function electronStoreSink (outToStore$) {
  if (outToStore$) {
    outToStore$.forEach(function (outToStore) {
      store.set(outToStore)
    })
  }
}

function electronStoreSource () {
  return most.just(store.store).multicast()
}

module.exports = function makeElectronStoreSideEffect (outToStore$) {
  return { sink: electronStoreSink, source: electronStoreSource }
}
