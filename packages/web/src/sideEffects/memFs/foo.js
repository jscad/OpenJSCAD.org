const {walkFileTree} = require('./exp/walkFileTree')
  const isCommonJsModule = require('@jscad/core/code-loading/isCommonJsModule')


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
    const fakeFs = {
      statSync: path => {
        const entry = findMatch(path)
        return {
          isFile: _ => {
            return entry && ('source' in entry && !('children' in entry))
          },
          isDirectory: _ => {
            return entry && (!('source' in entry) && ('children' in entry))
          }
        }
      },
      existsSync: (path) => {
        const entry = findMatch(path)
        console.log('does ', path, 'exist ?', entry !== undefined)
        return entry !== undefined
      },
      readdirSync: (path) => {
        const entry = findMatch(path)
        return entry.children.map(x => x.name)
         // filesAndFolders
      }
    }
    return fakeFs
  }

  const {getDesignEntryPoint} = require('./exp/requireDesignUtilsFs')