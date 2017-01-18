export function handleInputFiles (evt) {
  // console.log("handleInputFiles()")
  const files = evt.target.files || []
  const currentFiles = files
    .map(function (file) {
      var e = file.name.toLowerCase().match(/\.(\w+)$/i)
      e = RegExp.$1
      return conversionFormats.indexOf(e) >= 0 ? file : undefined // -- need to transfer the single elements
    })
    .filter(x => x !== undefined)

  if (files.length === 0) {
    throw new Error('Please drop and drop one or more files')
  }
  return currentFiles
}
