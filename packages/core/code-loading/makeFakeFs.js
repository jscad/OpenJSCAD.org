const makeFakeFs = (filesAndFolders) => {
  const findMatch = (path, inputs = filesAndFolders) => {
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

  const statSync = (path) => {
    const entry = findMatch(path)
    return {
      isFile: (_) => (entry && ('source' in entry && !('children' in entry))),
      isDirectory: (_) => (entry && (!('source' in entry) && ('children' in entry)))
    }
  }
  const fakeFs = {
    statSync,
    existsSync: (path) => {
      const entry = findMatch(path)
      // console.log('does ', path, 'exist ?', entry !== undefined)
      return entry !== undefined
    },
    readdirSync: (path) => {
      const entry = findMatch(path)
      return entry.children.map((x) => x.name)
      // filesAndFolders
    },
    readDir: (path, callback) => {
      // console.log('readDir', path, callback)
      const entry = findMatch(path)
      callback(null, entry)
    },
    readFile: (path, encoding, callback) => {
      const entry = findMatch(path)
      if (!entry) {
        throw new Error(`ENOENT: no such file or directory, open '${path}'`)
      }
      if (!statSync(path).isFile()) {
        callback(new Error(`${entry} is not a file, cannot read`))
      } else {
        // console.log('readFile', path, entry)
        callback(null, entry.source)
      }
    },
    readFileSync: (path, encoding) => {
      const entry = findMatch(path)
      if (!entry) {
        throw new Error(`ENOENT: no such file or directory, open '${path}'`)
      }
      if (!statSync(path).isFile()) {
        throw new Error(`${entry} is not a file, cannot read`)
      } else {
        // console.log('readFile sync', path, entry)
        return entry.source
      }
    }
  }
  return fakeFs
}

module.exports = makeFakeFs
