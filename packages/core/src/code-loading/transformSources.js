const { deserializers } = require('@jscad/io')

/*
 * Transform the entry into a ready-to-use module.
 */
const modulifyTransform = (options, entry) => Object.assign({}, entry, { source: entry.source })

/*
 * Create a new entry for a script (JSCAD) from the given entry and source
 */
const createJscadEntry = (entry, source) => {
  const ext = 'jscad'
  const name = entry.name.substring(0, entry.name.lastIndexOf('.') + 1) + ext
  const fullPath = '/' + name

  return Object.assign({}, entry, { ext, name, fullPath, source })
}

/*
 * Transform the given files and folders if necessary.
 * Transforms are only applied to single files as current deserializers create source with a main() function. Only one.
 * Transforms are NOT applied to projects.
 */
const transformSources = (options, filesAndFolders) => {
  if (filesAndFolders && filesAndFolders.length > 1) return filesAndFolders // skip projects

  const codeTransforms = {
    js: [modulifyTransform],
    jscad: [modulifyTransform]
  }

  const updateEntry = (entry) => {
    if (entry.source && entry.ext) {
      const transformOptions = Object.assign({}, options, { filename: entry.name, output: 'script' })
      if (entry.ext in deserializers) {
        const deserializer = deserializers[entry.ext]
        const source = deserializer(transformOptions, entry.source)
        return createJscadEntry(entry, source)
      }
      if (entry.ext in codeTransforms) {
        const transforms = codeTransforms[entry.ext]
        const transformedEntry = transforms.reduce((entry, transform) => transform(transformOptions, entry), entry)
        return transformedEntry
      }
    }
    return entry
  }

  if (filesAndFolders) {
    filesAndFolders = filesAndFolders.map((entry) => updateEntry(entry))
  }
  return filesAndFolders
}

module.exports = transformSources
