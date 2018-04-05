const Store = require('electron-store')
const store = new Store()
const most = require('most')

function electronStoreSideEffect (outToStore$) {
  if (outToStore$) {
    outToStore$.forEach(function (outToStore) {
      // console.log('outToStore', outToStore)
      store.set(outToStore)
    })
  }

  // store.get('ui.theme.name'
  // store.get('ui.theme.name')
  return most.just(store.store).multicast()
}
function electronStoreSink (outToStore$) {
  if (outToStore$) {
    outToStore$.forEach(function (outToStore) {
      // console.log('outToStore', outToStore)
      store.set(outToStore)
    })
  }
}

function electronStoreSource () {
  return most.just(store.store).multicast()
}

module.exports = {
  electronStoreSource,
  electronStoreSink
}
