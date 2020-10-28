const { deserializers } = require('@jscad/io')

const isCommonJsModule = require('./isCommonJsModule')
const modulifySource = require('./modulifySource')

const passThroughTransform = (options, entry) => entry

/* function to turn old style jscad code with implicit imports
into code with explicit exports/imports */
// FIXME wouldn't a javascript error be better then 'hacking' the users code?
const modulifyTransform = (options, entry) => {
  const { apiMainPath } = options
  const isFileCommonJs = isCommonJsModule(entry.source)
  const source = !isFileCommonJs ? modulifySource(entry.source, apiMainPath) : entry.source
  return Object.assign({}, entry, { source })
}

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
  // console.log('***** transformSources', options, filesAndFolders)

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
