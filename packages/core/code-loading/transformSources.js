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

/*
 * Create a new entry for a script (JSCAD) from the given entry and source
 */
const createJscadEntry = (entry, source) => {
  const ext = 'jscad'
  const name = entry.name.substring(0, entry.name.lastIndexOf('.') + 1) + ext
  const fullPath = '/' + name

  return Object.assign({}, entry, { ext, name, fullPath, source })
}

const transformAmfToJscad = (options, entry) => {
  // console.log('***** transformAmfToJscad',options,entry)
  const deserialize = require('@jscad/io').amfDeSerializer.deserialize
  const source = deserialize(options, entry.source)
  return createJscadEntry(entry, source)
}

const transformDxfToJscad = (options, entry) => {
  // console.log('***** transformDxfToJscad',options,entry)
  const deserialize = require('@jscad/io').dxfDeSerializer.deserialize
  const source = deserialize(options, entry.source)
  return createJscadEntry(entry, source)
}

const transformObjToJscad = (options, entry) => {
  // console.log('***** transformObjToJscad',options,entry)
  const deserialize = require('@jscad/io').objDeSerializer.deserialize
  const source = deserialize(options, entry.source)
  return createJscadEntry(entry, source)
}

const transformStlToJscad = (options, entry) => {
  // console.log('***** transformStlToJscad',options,entry)
  const deserialize = require('@jscad/io').stlDeSerializer.deserialize
  const source = deserialize(options, entry.source)
  return createJscadEntry(entry, source)
}

const transformSvgToJscad = (options, entry) => {
  // console.log('***** transformSvgToJscad',options,entry)
  const deserialize = require('@jscad/io').svgDeSerializer.deserialize
  const source = deserialize(options, entry.source)
  return createJscadEntry(entry, source)
}

const transformSources = (options, filesAndFolders) => {
  // console.log('***** transformSources', options, filesAndFolders)
  // FIXME this table should come from IO
  const transformsPerFormat = {
    js: [modulifyTransform],
    jscad: [modulifyTransform],
    // formats that require translation
    amf: [transformAmfToJscad, modulifyTransform],
    dxf: [transformDxfToJscad, modulifyTransform],
    obj: [transformObjToJscad, modulifyTransform],
    stl: [transformStlToJscad, modulifyTransform],
    svg: [transformSvgToJscad, modulifyTransform]
  }

  function updateEntry (entry) {
    if (entry.source) {
      const transformOptions = Object.assign({}, options, { filename: entry.name })
      const transforms = transformsPerFormat[entry.ext] ? transformsPerFormat[entry.ext] : [passThroughTransform]
      const transformedEntry = transforms.reduce((entry, transform) => {
        return transform(transformOptions, entry)
      }, entry)

      return transformedEntry
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
