/*
 * Compare the given files for equality; file path and file contents
 * @return {Boolean} true if the files are the same
 */
const sameFile = (a, b) => {
  if (a.fullPath === b.fullPath) {
    if (typeof a.source === typeof b.source) {
      if (a.source.byteLength) {
        // compare ArrayBuffer contents
        const aArray = new Uint8Array(a.source)
        const bArray = new Uint8Array(b.source)
        return aArray.length === bArray.length && aArray.every((v, i) => v === bArray[i])
      } else {
        // compare String contents
        return a.length === b.length && a.source === b.source
      }
    }
  }
  return false
}

/**
 * Compare the contents of the reference and the new file lists.
 * @see flattenFiles() below
 * @param {Array} reference - the reference list of files
 * @param {Array} files - the new list of files
 * @return {Array} a list of the changed files
 */
const changedFiles = (reference, files) =>  {
  const working = reference.slice()
  return files.filter((file) => {
    const found = working.findIndex((a, i) => sameFile(a, file))
    if (found < 0) {
      return true
    }
    working.splice(found, 1)
    return false
  })
}

/*
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
