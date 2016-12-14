export function findMainFile (memFsTotal, memFs, file) {
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
    mainFile = memFs[file.name]
  }
  return mainFile
}
