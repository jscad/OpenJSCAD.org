const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

module.exports = function makeStorageSideEffect (name) {
  const reply = callBackToStream()

  function sink (outToStore$) {
    if (outToStore$) {
      outToStore$.forEach(function (command) {
        const {type, target, options, data} = command
        // const storage = target === `local` ? localStorage : sessionStorage
        if (type === 'write') {
          if (target === 'settings') {
            // console.log('writing settings', data)
            localStorage.setItem(`jscad:${name}-${target}`, JSON.stringify(data))
          }
        } else if (type === 'read') {
          if (target === 'settings') {
            const settings = localStorage.getItem(`jscad:${name}-${target}`)
            const allData = JSON.parse(settings) || {}
            reply.callback({type, target, data: allData})
          }
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
