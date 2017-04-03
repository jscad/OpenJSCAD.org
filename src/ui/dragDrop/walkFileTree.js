import { conversionFormats } from '../../jscad/conversionFormats'

function flatten (array) {
  return [].concat(...array)
}

const readFileAsync = function (file, fileMeta) {
  const isBinaryFile = file.name.match(/\.(stl|gcode)$/) // FIXME how to determine?
  const reader = new FileReader()

  return new Promise(function (resolve, reject) {
    isBinaryFile ? reader.readAsBinaryString(file, 'UTF-8') : reader.readAsText(file, 'UTF-8')

    reader.onloadend = event => {
      event.target.readyState === FileReader.DONE
        ? resolve({name: file.name, fullpath: fileMeta.fullPath, source: event.target.result})
        : reject('Failed to load file')
    }
  })
}

function isOkFormat (file) {
  var e = file.name.toLowerCase().match(/\.(\w+)$/i)
  e = RegExp.$1
  return conversionFormats.indexOf(e) >= 0
}

function pseuDoArraytoArray (pseudoArray) {
  let array = []
  for (var i = 0; i < pseudoArray.length; i++) {
    array.push(pseudoArray[i])
  }
  return array
}

function processItems (items) {
  let results = pseuDoArraytoArray(items).reduce((result, item) => {
    if (item.isFile) {
      result.push(processFile(item))
    } else if (item.isDirectory) {
      result.push(processDirectory(item))
    }
    return result
  }, [])

  return Promise.all(results).then(flatten)
}

function processFile (fileItem) {
  return new Promise(function (resolve, reject) {
    fileItem.file(function (fileData) {
      isOkFormat(fileData) ? resolve(readFileAsync(fileData, fileItem)) : resolve(undefined)
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
//    3) re-render if there was a change (via readFileAsync)
export function walkFileTree (item, path) {
  console.log('walkFileTree', item)
  return processItems(item, path).then(function (result) {
    console.log('results yeah', result)
  })
}
