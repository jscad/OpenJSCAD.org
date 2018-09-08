const isCommonJsModule = require('./isCommonJsModule')
const modulifySource = require('./modulifySource')

const passThroughTransform = (options, entry) => entry

/* function to turn old style jscad code with implicit imports
into code with explicit exports/imports */
const modulifyTransform = (options, entry) => {
  const {apiMainPath} = options
  const isFileCommonJs = isCommonJsModule(entry.source)
  const source = !isFileCommonJs ? modulifySource(entry.source, apiMainPath) : entry.source
  return Object.assign({}, entry, {source})
}

const translateToJscad = (options, entry) => {
  // console.log('translateToJscad', entry)
  const {apiMainPath} = options
  const deserializeStl = require('@jscad/io').stlDeSerializer.deserialize
  const source = deserializeStl(entry.source, entry.name, options)
  // const ext = 'js'
  // const name = entry.name.split('.') + ext
  // const fullPath = entry.fullPath.split('.') + ext
  return Object.assign({}, entry, {source})
}

const transformSources = (options, filesAndFolders) => {
  // console.log('transformSources', options, filesAndFolders)
  const transformsPerFormat = {
    'js': [modulifyTransform],
    'jscad': [modulifyTransform],
    'stl': [translateToJscad, modulifyTransform],
    'amf': [translateToJscad, modulifyTransform]
  }

  function updateEntry (entry) {
    if (entry.source) {
      const transforms = transformsPerFormat[entry.ext] ? transformsPerFormat[entry.ext] : [passThroughTransform]
      const transformedEntry = transforms.reduce((entry, transform) => {
        return transform(options, entry)
      }, entry)

      // console.log('source after transform', transformedEntry)
      return transformedEntry// Object.assign({}, entry, {source: transformedEntry.source})
    }
    if (entry.children) {
      entry.children = entry.children.map(function (childEntry) {
        return updateEntry(childEntry)
      })
    }
    return entry
  }

  if (filesAndFolders) {
    filesAndFolders = filesAndFolders.map(entry => {
      return updateEntry(entry)
    })
  }
  return filesAndFolders
}

module.exports = transformSources
