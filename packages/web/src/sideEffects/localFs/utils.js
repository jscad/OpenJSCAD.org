/*
 * Compare the given files for equality; file path and file contents
 * @return {Boolean} true if the files are the same
 */
const sameFile = (oldFile, newFile) => {
  if (oldFile.fullPath === newFile.fullPath) {
    if (typeof oldFile.source === typeof newFile.source) {
      if (oldFile.source.byteLength) {
        // compare ArrayBuffer contents
        const oldArray = new Uint8Array(oldFile.source)
        const newArray = new Uint8Array(newFile.source)
        return oldArray.length === newArray.length && oldArray.every((oldInt, i) => oldInt === newArray[i])
      } else {
        // compare String contents
        return oldFile.length === newFile.length && oldFile.source === newFile.source
      }
    }
  }
  return false
}

/**
 * Compare the contents of the old and the new file lists.
 * @see flattenFiles() below
 * @param {Array} oldFileList - the old list of files
 * @param {Array} newFileList - the new list of files
 * @return {Array} a list of the changed files
 */
const changedFiles = (oldFileList, newFileList) => {
  const working = oldFileList.slice()
  return newFileList.filter((newFile) => {
    const found = working.findIndex((oldFile, i) => sameFile(oldFile, newFile))
    if (found < 0) {
      return true
    }
    working.splice(found, 1)
    return false
  })
}

/**
 * Create a flattened list of files from the given file heiarchy.
 * @return {Array} a list of file entries
 */
const flattenFiles = (hierarchy) => {
  let result = []
  hierarchy.forEach((fileOrFolder) => {
    if (fileOrFolder.children) {
      result = result.concat(flattenFiles(fileOrFolder.children))
    } else {
      result.push(fileOrFolder)
    }
  })
  return result
}

module.exports = { changedFiles, flattenFiles }
