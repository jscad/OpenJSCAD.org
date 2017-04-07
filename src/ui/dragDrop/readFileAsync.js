function readFileAsync (file) {
  const isBinaryFile = file.name.match(/\.(stl|gcode)$/) // FIXME how to determine?
  const reader$ = isBinaryFile ? readAsBinaryString(file, 'UTF-8') : readAsText(file, 'UTF-8')

  return reader$
    .map(x => x.target.result)
    .flatMapError(x => of('Failed to read file'))
}

function doStuffOnceFilesAreRead (file$, memFs) {
  const allMyFiles$ = of([])

  allMyFiles$
    .map(function (data) {
      memFsCount++
      // note: assigning f.source = source too make memFs[].source the same, therefore as next
      if (!memFs[file.name] || memFs[file.name].source !== source) {
        memFsChanged++
      }
      saveScript(memFs, file.name, source)

      if (memFsCount === memFsTotal) { // -- are we done reading all?
        // console.log("readFileAsync: "+memFsTotal+" files read")
        const gMainFile = findMainFile(memFsTotal, memFs, file)
        if (memFsChanged > 0 && gMainFile) {
          return gMainFile
        }
        throw new Error('No main.jscad found')
      }
    })
}

// RANT: JavaScript at its finest: 50 lines code to read a SINGLE file
//       this code looks complicate and it is complicated.
function readFileAsync (file, {memFs, memFsCount, memFsTotal, memFsChanged}) {
  // console.log("readFileAsync: "+f.name)
  const reader = new FileReader()
  return new Promise(function (resolve, reject) {
    if (file.name.match(/\.(stl|gcode)$/)) { // FIXME how to determine?
      reader.readAsBinaryString(file, 'UTF-8')
    } else {
      reader.readAsText(file, 'UTF-8')
    }

    reader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        var source = evt.target.result
        // console.log("done reading: "+f.name,source?source.length:0);   // it could have been vanished while fetching (race condition)
        memFsCount++
        // note: assigning f.source = source too make memFs[].source the same, therefore as next
        if (!memFs[file.name] || memFs[file.name].source !== source)
          memFsChanged++

        saveScript(memFs, file.name, source)

        if (memFsCount === memFsTotal) { // -- are we done reading all?
          // console.log("readFileAsync: "+memFsTotal+" files read")
          const gMainFile = findMainFile(memFsTotal, memFs, file)

          if (memFsChanged > 0) {
            if (!gMainFile) {
              reject('No main.jscad found')
            } else {
              resolve(gMainFile)
            // console.log("update & redraw "+gMainFile.name)
            }
          }
        }
      } else {
        reject('Failed to read file')
      }
    }
  })
}
