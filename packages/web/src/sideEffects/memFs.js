const most = require('most')
const callBackToStream = require('@jscad/core/observable-utils/callbackToObservable')

const makeFakeFs = (filesAndFolders) => {
  const findMatch = (path, inputs = filesAndFolders) => {
    let result
    for (let i = 0; i < inputs.length; i++) {
      const entry = inputs[i]
      if (path === entry.fullPath || ('/' + path) === entry.fullPath) {
        return entry
      }
      if (entry.children) {
        const res = findMatch(path, entry.children)
        if (res !== undefined) {
          return res
        }
      }
    }
    return undefined
    // return filesAndFolders
  }

  const statSync = path => {
    const entry = findMatch(path)
    return {
      isFile: _ => {
        return entry && ('source' in entry && !('children' in entry))
      },
      isDirectory: _ => {
        return entry && (!('source' in entry) && ('children' in entry))
      }
    }
  }
  const fakeFs = {
    statSync,
    existsSync: (path) => {
      const entry = findMatch(path)
      console.log('does ', path, 'exist ?', entry !== undefined)
      return entry !== undefined
    },
    readdirSync: (path) => {
      const entry = findMatch(path)
      return entry.children.map(x => x.name)
       // filesAndFolders
    },
    readFile: (path, encoding, callback) => {
      const entry = findMatch(path)
      if (!statSync(path).isFile()) {
        callback(new Error(`${entry} is not a file, cannot read`))
      } else {
        console.log('readFile', path, entry)
        callback(null, entry.source)
      }
    }
  }
  return fakeFs
}

const makeMemFsSideEffect = () => {
  const readFileToCB = callBackToStream()
  // for watchers
  const scriptDataFromCB = callBackToStream()
  let filesAndFolders = []
  let fs
  const sink = (out$) => {
    out$.forEach(function ({path, operation, id, data, options}) {
      console.log('read/writing to', path, operation, id, data, options)
      if (operation === 'read') {
        fs.readFile(path, 'utf8', function (error, data) {
          if (error) {
            readFileToCB.callback({path, operation, error, id})
          } else {
            readFileToCB.callback({path, operation, data, id, fs})
          }
        })
      }
      if (operation === 'add') {
        // data.forEach(function (entry) {

        // })
        filesAndFolders = data
        fs = makeFakeFs(filesAndFolders)
        console.log('filesAndFolders', filesAndFolders)
        /* const fakeRequire = makeFakeRequire({}, filesAndFolders)
        const fakeRequire = makeFakeRequire({}, filesAndFolders)

        const entryPoint = getDesignEntryPoint(fakeFs, fakeRequire._require, paths)
        console.log('design entry point', entryPoint)

        const rootModule = fakeRequire._require(entryPoint)
        console.log('rootModule', rootModule) */
      }
    })
  }

  const source = () => {
    const fs$ = readFileToCB.stream.multicast()
    const watch$ = scriptDataFromCB.stream
      .debounce(400)
      .skipRepeats()
      .multicast()
    return most.mergeArray([
      fs$,
      watch$
    ])
  }
  // console.log('dropped', filesAndFolders)
  // const paths = filesAndFolders.map(x => x.name)
  // const fakeFs = makeFakeFs(filesAndFolders)

  return {source, sink}
}

module.exports = makeMemFsSideEffect
