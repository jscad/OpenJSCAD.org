/**
 * returns list of files whose source has changed compared to the file with the same
 * name in memFs
 * @param {Object} reference - The reference hash of files, organized by name.
 * @param {Array} files - The list of files : need to have a source & name field.
 * @return array of files that changed
 */
const changedFiles = (reference, files) => files.filter((file) => {
  const matches = reference.filter((ref) => ref.fullPath === file.fullPath && ref.source !== file.source)
  return matches.length > 0
})

const flattenFiles = (files) => {
  let result = []
  files.forEach((fileOrFolder) => {
    if (fileOrFolder.children) {
      result = result.concat(flattenFiles(fileOrFolder.children))
    } else {
      result.push(fileOrFolder)
    }
  })
  return result
}

module.exports = { changedFiles, flattenFiles }
