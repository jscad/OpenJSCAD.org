const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

module.exports = function makeStorageSideEffect ({name}) {
  const reply = callBackToStream()

  function sink (outToStore$) {
    if (outToStore$) {
      outToStore$.forEach(function (command) {
        const {type, key, options, data} = command
        // const storage = target === `local` ? localStorage : sessionStorage
        if (type === 'write') {
          // console.log('writing settings', data)
          localStorage.setItem(`jscad:${name}-${key}`, JSON.stringify(data))
        } else if (type === 'read') {
          const settings = localStorage.getItem(`jscad:${name}-${key}`)
          const allData = JSON.parse(settings) || {}
          reply.callback({type, key, data: allData})
        }
      })
    }
  }

  function source () {
    const reply$ = reply.stream.multicast()

    return reply$
  }
  return {sink, source}
}
