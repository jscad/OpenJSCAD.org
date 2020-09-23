const { supportedInputExtensions } = require('@jscad/io/formats')

const getFileExtensionFromString = require('@jscad/core/utils/getFileExtensionFromString')

const { flatten } = require('@jscad/array-utils')

/*
 * Read the given file asyncronously via a promise.
 * @param {File} file
 * @param {Object} fileMeta - meta information about file
 * @returns {Promise} new promise to read and convert the file
 */
const readFileAsync = (file, fileMeta) => {
  // console.log('readFileAsync',file,fileMeta)
  const promiseReader = new Promise((resolve, reject) => {
    const reader = new FileReader()
    // remove rootfolder since all files are within it
    const fullPath = fileMeta && fileMeta.fullPath ? fileMeta.fullPath/* .split('/').slice(2).join('/') */ : ''

    // convert binary to text
    const convert = (buffer) => {
      let binary = ''
      const bytes = new Uint8Array(buffer)
      const length = bytes.byteLength
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return binary
    }

    reader.onload = (event) => {
      resolve({ name: file.name, ext: getFileExtensionFromString(fullPath), fullPath, source: convert(event.target.result) })
    }
    reader.onerror = (event) => {
      reject(new Error(`Failed to load file: ${fullPath} [${reader.error}]`))
    }

    reader.readAsArrayBuffer(file)
  })
  return promiseReader
}

const inputFormats = supportedInputExtensions()

// File
const isSupportedFormat = (file) => {
  const ext = getFileExtensionFromString(file.name)
  return inputFormats.includes(ext)
}

const pseudoArraytoArray = (pseudoArray) => {
  const array = []
  for (let i = 0; i < pseudoArray.length; i++) {
    const item = pseudoArray[i]
    if (item) array.push(item.webkitGetAsEntry ? item.webkitGetAsEntry() : item)
  }
  return array
}

const isEmpty = (x) => x !== null && x !== undefined // skip empty items

/*
 * Process the given items into a series of promises
 * @returns {Promise} one promise to resolve them all
 */
const processItems = (items) => {
  const results = pseudoArraytoArray(items.filter(isEmpty))
    .filter(isEmpty) // skip empty items
    .reduce((result, item) => {
      if (item.name.startsWith('.')) return result // skip hidden files and directories
      if (item.isFile) {
        result.push(processFile(item))
      } else if (item.isDirectory) {
        result.push(processDirectory(item))
      } else if (item instanceof File) {
        const fullPath = item.webkitRelativePath ? item.webkitRelativePath : undefined
        const file = isSupportedFormat(item) ? readFileAsync(item, { fullPath }) : undefined
        if (!file) {
          throw new Error('Unsuported format (or folder in Safari)!')
        }
        result.push(file)
      }
      return result
    }, [])

  return Promise.all(results)
    .then((x) => x.filter((x) => x !== null && x !== undefined))
    // BAD .catch((error) => console.error(error.message))
}

/*
 * Process the given file
 * @param {FileSytemFileEntry} file
 * @returns {Promise} new promise to read and process the file
 */
const processFile = (fileItem) => {
  // console.log('processFile',fileItem)
  const promiseFile = new Promise((resolve, reject) => {
    fileItem.file(
      (fileData) => {
        isSupportedFormat(fileData) ? resolve(readFileAsync(fileData, fileItem)) : resolve(undefined)
      },
      (fileError) => {
        const message = `${fileError.message} (${fileError.code})`
        reject(new Error(`Failed to load file: ${fileItem.fullPath} [${message}]`))
      }
    )
  })
  return promiseFile
}

/*
 * Process the given directory
 * @param {FileSytemDirectoryEntry} directory
 * @returns {Promise} new promise to read and process the directory
 */
const processDirectory = (directory) => {
  // console.log('processDirectory',directory)
  const promiseDirectory = new Promise((resolve, reject) => {
    if (directory.entries) {
      directory.entries.length ? processItems(directory.entries).then(resolve) : resolve(null)
    } else {
      const reader = directory.createReader()
      reader.readEntries((entries) => {
        entries.length ? processItems(entries).then(resolve) : resolve(null)
      }, reject)
    }
  })
    .then(flatten)
    .then((children) => {
      children = children.map((child) => {
        if (!child.fullPath.startsWith('/')) {
          child.fullPath = directory.fullPath + '/' + child.name
        }
        return child
      })
      return { children, fullPath: directory.fullPath, name: directory.name }
    })
  return promiseDirectory
}

/*
 * Transform the flat list of files (from HTML input) to a heiarchy of files (from drag-n-drop).
 */
const transformFileList = (fileList) => {
  const path = require('path')

  let rootDirectory
  const directories = new Map()

  const addDirectory = (fullPath, name) => {
    if (!directories.has(fullPath)) {
      const directory = { fullPath, name, isDirectory: true, entries: [] }
      if (!rootDirectory) rootDirectory = directory
      directories.set(fullPath, directory)

      const pathParts = fullPath.split(path.sep)
      if (pathParts.length > 1) {
        const basePath = path.sep + path.join(...pathParts.slice(0, -1))
        const baseDir = directories.get(basePath)
        if (baseDir) baseDir.entries.push(directory)
      }
    }
  }

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i]
    const filePath = file.webkitRelativePath ? file.webkitRelativePath : file.name
    const fileParts = filePath.split(path.sep)

    const hidden = fileParts.reduce((acc, part) => acc || part.startsWith('.'), false)
    if (hidden) continue

    if (!isSupportedFormat(file)) continue

    const dirParts = fileParts.slice(0, -1)
    for (let i = 0; i < dirParts.length; i++) {
      const dirPath = path.sep + path.join(...dirParts.slice(0, i + 1))
      addDirectory(dirPath, dirParts[i])
    }

    const dirPath = path.sep + path.join(...dirParts)

    const directory = directories.get(dirPath)
    if (directory) directory.entries.push(file)
  }
  directories.clear()
  return [rootDirectory]
}

// this is the core of the drag'n'drop:
//    1) walk the tree
//    2) read the files (readFileAsync)
//    3) return a flattened list of promises containing all file entries
const walkFileTree = (filelist) => {
  let items = filelist
  if (filelist.length && (filelist[0] instanceof File)) {
    // transform the flat list of File entries
    items = transformFileList(filelist)
  }
  return processItems(items)
}

module.exports = {
  walkFileTree
}
