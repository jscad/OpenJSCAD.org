const Store = require('electron-store')
const store = new Store()
const most = require('most')

const electronStoreSink = (outToStore$) => {
  if (outToStore$) {
    outToStore$.forEach((outToStore) => {
      store.set(outToStore)
    })
  }
}

const electronStoreSource = () => most.just(store.store).multicast()

module.exports = function makeElectronStoreSideEffect (outToStore$) {
  return { sink: electronStoreSink, source: electronStoreSource }
}
