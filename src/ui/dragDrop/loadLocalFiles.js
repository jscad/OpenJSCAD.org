// this is the linear drag'n'drop, a list of files to read (when folders aren't supported)
export function loadLocalFiles (items, state) {
  // console.log("loadLocalFiles: ",currentFiles.length)
  state.memFsCount = 0
  state.memFsTotal = items.length
  state.memFsChanged = 0
  //{memFs, memFsCount, memFsTotal, memFsChanged}

  for (var i = 0; i < items.length; i++) {
    const file = items[i]
    // console.log(file)
    const params = {memFs, memFsCount, memFsTotal, memFsChanged}
    const onSuccess = setCurrentFile
    const onError = (error) => {
      throw new Error(error)}
    readFileAsync(file)
  }
}
