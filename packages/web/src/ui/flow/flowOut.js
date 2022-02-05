const makeReactions = (inputs) => {
  const { sinks, outputs$ } = inputs
  const { store, fs, http, https, i18n, dom, solidWorker, state, dat } = sinks

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
}

module.exports = makeReactions
