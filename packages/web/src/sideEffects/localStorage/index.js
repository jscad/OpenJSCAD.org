const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

module.exports = function makeStorageSideEffect ({ name }) {
  const reply = callBackToStream()

  function sink (outToStore$) {
    let enabled = true
    try {
      localStorage.getItem('jscad:')
    } catch (e) {
      enabled = false
    }

    if (!enabled) {
      commandResponses.callback({ type, id, error: new Error('Local storage not supported in this environment!') })
    } else {
      if (outToStore$) {
        outToStore$.forEach(function (command) {
          const { type, key, options, data } = command
          // const storage = target === `local` ? localStorage : sessionStorage
          if (type === 'write') {
            // console.log('writing settings', data)
            localStorage.setItem(`jscad:${name}-${key}`, JSON.stringify(data))
          } else if (type === 'read') {
            const settings = localStorage.getItem(`jscad:${name}-${key}`)
            const allData = JSON.parse(settings) || {}
            reply.callback({ type, key, data: allData })
          }
        })
      }
    }
  }

  const source = () => {
    const reply$ = reply.stream.multicast()
    return reply$
  }
  return { sink, source }
}
