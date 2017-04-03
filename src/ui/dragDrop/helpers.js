export function changedFiles (memFs, files) {
  return files.filter(file => (!memFs[file.name] || memFs[file.name].source !== file.source))
  /*return files.reduce(function (changed, file) {
    // note: assigning f.source = source to make memFs[].source the same, therefore as next
    if (!memFs[file.name] || memFs[file.name].source !== file.source) {
      changed++
    }
    return changed
  }, 0)*/
}

export function findMainFile ({memFs, memFsTotal}, files) {
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
export function isLocalMode () {
  return document.location.toString().match(/^file\:\//i)
}

// FIXME: SAME
export function isMobile () {
  return 'createTouch' in document
}

// FIXME: SAME
export function hasDragDropSupport () {
  return window.File && window.FileReader && window.FileList
}
