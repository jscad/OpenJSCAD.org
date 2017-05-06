const { conversionFormats } = require('../../io/formats')
const {findMainFile, changedFiles} = require('./helpers')

function flatten (array) {
  return [].concat(...array)
}

const readFileAsync = function (file, fileMeta) {
  const isBinaryFile = file.name.match(/\.(stl|gcode)$/) // FIXME how to determine?
  const reader = new FileReader()

  return new Promise(function (resolve, reject) {
    isBinaryFile ? reader.readAsBinaryString(file, 'UTF-8') : reader.readAsText(file, 'UTF-8')

    // remove rootfolder since all files are within it
    const fullpath = fileMeta && fileMeta.fullPath ? fileMeta.fullPath.split('/').slice(2).join('/') : ''

    reader.onloadend = event => {
      event.target.readyState === FileReader.DONE
        ? resolve({name: file.name, fullpath: fullpath, source: event.target.result})
        : reject('Failed to load file')
    }
  })
}

export function isSupportedFormat (file) {
  var e = file.name.toLowerCase().match(/\.(\w+)$/i)
  e = RegExp.$1
  return conversionFormats.indexOf(e) >= 0
  // NOTE: was incrementing memFsTotal++ ONLY if format is valid, not needed anymore as far as I know
}

export function pseudoArraytoArray (pseudoArray) {
  let array = []
  for (var i = 0; i < pseudoArray.length; i++) {
    const item = pseudoArray[i]
    array.push(item.webkitGetAsEntry ? item.webkitGetAsEntry() : item)
  }
  return array
}

function processItems (items) {
  let results = pseudoArraytoArray(items)
    .filter(x => x !== null && x !== undefined)// skip empty items
    .reduce((result, item) => {
      if (item.isFile) {
        result.push(processFile(item))
      } else if (item.isDirectory) {
        result.push(processDirectory(item))
      } else if (item instanceof File) {
        const file = isSupportedFormat(item) ? readFileAsync(item, {fullPath: undefined}) : undefined
        if (!file) {
          throw new Error('Unsuported format (or folder in Safari)!')
        }
        result.push(file)
      }
      return result
    }, [])

  // console.warn(`ignoring Unsuported file ${fileData.name}`): this is for cases like .DSSTORE etc on mac
  return Promise.all(results).then(x => x.filter(x => x !== null && x !== undefined)).then(flatten)
}

function processFile (fileItem) {
  return new Promise(function (resolve, reject) {
    fileItem.file(function (fileData) {
      isSupportedFormat(fileData) ? resolve(readFileAsync(fileData, fileItem)) : resolve(undefined)
    }, reject)
  })
}

function processDirectory (directory) {
  const reader = directory.createReader()

  return new Promise((resolve, reject) => {
    reader.readEntries(function (entries) {
      entries.length ? processItems(entries).then(resolve) : resolve(null)
    }, reject)
  }).then(flatten)
}

// this is the core of the drag'n'drop:
//    1) walk the tree
//    2) read the files (readFileAsync)
//    3) return a flattened list of promises containing all file entries
export function walkFileTree (items) {
  return processItems(items)
}

export function afterFilesRead ({memFs, memFsCount, memFsTotal, memFsChanged}, files) {
  memFsCount = files.length
  memFsTotal = files.length

  // FIXME : THIRD time the SAME data is cached
  // saveScript(memFs, file.name, file.source)
  const mainFile = findMainFile({memFs, memFsTotal}, files)

  if (changedFiles(memFs, files).length > 0) {
    if (!mainFile) throw new Error('No main.jscad found')
    setCurrentFile(mainFile) // ARGH , cannot do this here
  }
}
