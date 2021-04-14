const makeReactions = (inputs) => {
  const { sinks, outputs$ } = inputs
  const { store, fs, http, https, i18n, dom, solidWorker, state, dat } = sinks

  /* outputs$
    .filter(x => 'sink' in x && x.sink === 'dom')
    .forEach(x => console.log(' out to dom', x))
  outputs$
    .filter(x => 'sink' in x && x.sink === 'state')
    .forEach(x => console.log(' out to state', x))

  outputs$
    .filter(x => 'sink' in x && x.sink === 'i18n')
    .forEach(x => console.log(' out to i18n', x))

  outputs$
    .filter(x => 'sink' in x && x.sink === 'store')
    .forEach(x => console.log(' out to store', x))
  outputs$
    .filter(x => 'sink' in x && x.sink === 'fs')
    .forEach(x => console.log(' out to fs', x)) */

  // output to dom
  dom(require('./dom')(inputs))
  // output to i18n
  i18n(outputs$.filter((x) => 'sink' in x && x.sink === 'i18n'))
  // output to storage
  store(outputs$.filter((x) => 'sink' in x && x.sink === 'store'))
  // output to http
  http(outputs$.filter((x) => 'sink' in x && x.sink === 'http'))
  https(outputs$.filter((x) => 'sink' in x && x.sink === 'https'))
  // data out to file system sink
  // drag & drops of files/folders have DUAL meaning:
  // * ADD this file/folder to the available ones
  // * OPEN this file/folder
  fs(outputs$.filter((x) => 'sink' in x && x.sink === 'fs'))
  // web worker sink
  solidWorker(outputs$.filter((x) => 'sink' in x && x.sink === 'geometryWorker'))
  // state sink
  state(outputs$.filter((x) => 'sink' in x && x.sink === 'state'))

  dat(outputs$.filter((x) => 'sink' in x && x.sink === 'dat'))

  // titlebar & store side effects
  // FIXME/ not compatible with multiple instances !!
  /* titleBar.sink(
    state.map(state => state.appTitle).skipRepeats()
  ) */
}

module.exports = makeReactions
