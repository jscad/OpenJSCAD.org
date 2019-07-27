const isCommonJsModule = require('./isCommonJsModule')
const modulifySource = require('./modulifySource')

const passThroughTransform = (options, entry) => entry

/* function to turn old style jscad code with implicit imports
into code with explicit exports/imports */
const modulifyTransform = (options, entry) => {
  const { apiMainPath } = options
  const isFileCommonJs = isCommonJsModule(entry.source)
  const source = !isFileCommonJs ? modulifySource(entry.source, apiMainPath) : entry.source
  return Object.assign({}, entry, { source })
}

const transformDxfToJscad = (options, entry) => {
  // console.log('***** transformDxfToJscad',options,entry)
  const deserialize = require('@jscad/io').dxfDeSerializer.deserialize
  const source = deserialize(entry.source, entry.name, options)

  const ext = 'jscad'
  const name = entry.name.substring(0, entry.name.lastIndexOf('.') + 1) + ext
  const fullPath = '/' + name

  return Object.assign({}, entry, { ext, name, fullPath, source })
}

const transformStlToJscad = (options, entry) => {
  console.log('***** transformStlToJscad',options,entry)
  const deserialize = require('@jscad/io').stlDeSerializer.deserialize
  const source = deserialize(entry.source, entry.name, options)

  const ext = 'jscad'
  const name = entry.name.substring(0, entry.name.lastIndexOf('.') + 1) + ext
  const fullPath = '/' + name

  return Object.assign({}, entry, { ext, name, fullPath, source })
}

const transformSources = (options, filesAndFolders) => {
  console.log('***** transformSources', options, filesAndFolders)
  const transformsPerFormat = {
    'js': [modulifyTransform],
    'jscad': [modulifyTransform],
    // formats that require translation
    //'amf': [transformToJscad, modulifyTransform],
    'dxf': [transformDxfToJscad, modulifyTransform],
    //'obj': [transformToJscad, modulifyTransform],
    'stl': [transformStlToJscad, modulifyTransform],
    //'svg': [transformToJscad, modulifyTransform]
  }

  function updateEntry (entry) {
    if (entry.source) {
      const transforms = transformsPerFormat[entry.ext] ? transformsPerFormat[entry.ext] : [passThroughTransform]
      const transformedEntry = transforms.reduce((entry, transform) => {
        return transform(options, entry)
      }, entry)

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
