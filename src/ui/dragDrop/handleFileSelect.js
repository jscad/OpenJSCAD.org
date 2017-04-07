function handleFileSelect (evt, state) {
  // console.log("handleFileSelect()")
  evt.stopPropagation()
  evt.preventDefault()

  if (!evt.dataTransfer) throw new Error('Event is not a datatransfer (1)')
  if (!evt.dataTransfer.files) throw new Error('Event is not a datatransfer (2)')

  state = {
    memFs: [],
    mainFile: undefined,
    currentFiles: [],
    memFsCount: 0,
    memFsTotal: 0,
    memFsChanged: 0,
    rootFs: []
  }

  // let's try full directories
  const items = evt.target.items || []
  state.rootFs = items.map(function (item) {
    const entry = item.webkitGetAsEntry()
    walkFileTree(entry)
    return entry
  })

  // use the files list if not already processed above
  const files = evt.dataTransfer.files || []
  state.currentFiles = files
  loadLocalFiles(state.currentFiles)
}
