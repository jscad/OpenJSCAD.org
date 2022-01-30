const callbackToObservable = require('../../most-utils/callbackToObservable')

const makeFileDialog = (params) => {
  // const defaults = {
  //   logging: true
  // }
  // const { logging } = Object.assign({}, defaults, params)
  // const log = makeLogger({ enabled: logging })

  const commandResponses = callbackToObservable()

  const source = () => { }
  // FIXME const commandResponses$ = commandResponses.stream.multicast()

  const sink = (out$) => {
    out$.forEach((command) => {
      commandResponses.callback(command)

      /* const {saveAs} = require('file-saver')
      const filePath = 'foo.txt'
      const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
      saveAs(blob, filePath) */

      const input = document.createElement('input')
      input.id = 'foo'
      input.name = 'gna'
      input.setAttribute('type', 'file')
      input.click()
      // add onchange handler if you wish to get the file :)
      // input.trigger('click')// opening dialog
      // return false; // avoiding navigation
      input.addEventListener('change', () => {
      })
    })
  }
  return { source, sink }
}

module.exports = makeFileDialog
