const Store = require('electron-store')
const store = new Store()

function electronStoreSideEffect (outToStore$) {
  outToStore$.forEach(function (outToStore) {
    store.set(outToStore)
  })
  // store.get('ui.theme.name'
  // store.get('ui.theme.name')
  // return storeIn$
}

module.exports = electronStoreSideEffect
