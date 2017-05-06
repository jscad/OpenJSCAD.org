/**
 * returns list of files whose source has changed compared to the file with the same
 * name in memFs
 * @param {Object} memFs - The reference hash of files, organized by name.
 * @param {Array} files - The list of files : need to have a source & name field.
 * @return array of files that changed
 */
function changedFiles (memFs, files) {
  return files.filter(file => (!memFs[file.name] || memFs[file.name].source !== file.source))
}

/**
 * finds the 'main file' in a list of files either a file called main.jscad/js OR a file containing
 * a function called main()
 * name in memFs
 * @param {Object} memFs,memFsTotal - The reference hash of files, organized by name and the total count.
 * @param {Array} files - The list of files : need to have a source & name field.
 * @return the main file, or undefined
 */
function findMainFile ({memFs, memFsTotal}, files) {
  let mainFile
  if (memFsTotal > 1) {
    for (let filename in memFs) {
      if (memFs[filename].name.match(/main.(jscad|js)$/)) {
        mainFile = memFs[filename]
        break
      }
    }
    if (!mainFile) {
      // try again but search for the function declaration of main()
      for (let filename in memFs) {
        if (memFs[filename].source.search(/function\s+main\s*\(/) >= 0) {
          mainFile = memFs[filename]
          break
        }
      }
    }
  } else {
    mainFile = memFs[files[0].name]
  }
  return mainFile
}

// FIXME : this could be usefull overall , we should reuse
function isLocalMode () {
  return document.location.toString().match(/^file\:\//i)
}

// FIXME: SAME
function isMobile () {
  return 'createTouch' in document
}

// FIXME: SAME
function hasDragDropSupport () {
  return window.File && window.FileReader && window.FileList
}

module.exports = {
  changedFiles,
  findMainFile,
  isLocalMode,
  isMobile,
  hasDragDropSupport
}
