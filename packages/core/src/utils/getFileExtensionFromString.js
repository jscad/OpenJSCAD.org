const getFileExtensionFromString = (input) => {
  if (input.indexOf('.') === -1) {
    return undefined
  }
  return (input.substring(input.lastIndexOf('.') + 1)).toLowerCase()
}

module.exports = getFileExtensionFromString
