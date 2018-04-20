const most = require('most')

module.exports = function makeStorageSideEffect (outToStore$) {
  function sink (outToStore$) {
    if (outToStore$) {
      outToStore$.forEach(function (outToStore) {
        console.log('operation storage')
        const {operation, data, target} = outToStore
        const storage = target === `local` ? localStorage : sessionStorage;
        storage[operation](data)
        // store.set(outToStore)
      })
    }
  }

  function source () {
    return most.just({})
    // return most.just(store).multicast()
  }

  return {sink, source}
}
