/**
 * returns list of files whose source has changed compared to the file with the same
 * name in memFs
 * @param {Object} reference - The reference hash of files, organized by name.
 * @param {Array} files - The list of files : need to have a source & name field.
 * @return array of files that changed
 */
function changedFiles (reference, files) {
  return files.filter(file => {
    const matches = reference.filter(ref => ref.fullPath === file.fullPath && ref.source !== file.source)
    return matches.length > 0
  })
}

// old code

// this handles all type of data from drag'n'drop, a list of files to read files, folders, etc
function handleFilesAndFolders (items) {
  const files = walkFileTree(items)
  files.catch(function (error) {
    console.error('failed to read files', error)
    if (gProcessor) gProcessor.clearViewer()
    previousScript = null
  })
  files.then(function (files) {
    // console.log('processed files & folders', files)
    afterFilesRead({memFs, memFsCount, memFsTotal, memFsChanged}, files)
  })
}

const pollingWatcher = () => {
  let autoReloadTimer = setInterval(function () { superviseAllFiles() }, 1000)

  clearInterval(autoReloadTimer)
}


module.exports = {changedFiles}