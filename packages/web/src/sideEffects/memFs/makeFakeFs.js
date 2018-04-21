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

module.exports = makeFakeFs
