const newDocletFix = (docHandle) => {
  if (docHandle.doclet.params) {
    docHandle.doclet.kind = "function"
  }
}

exports.handlers = {
  newDoclet: newDocletFix
}
