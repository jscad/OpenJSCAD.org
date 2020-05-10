// FIXME : this could be usefull overall , we should reuse
function isLocalMode () {
  return document.location.toString().match(/^file:\//i)
}

// FIXME: SAME
function isMobile () {
  return 'createTouch' in document
}

// FIXME: SAME
function hasDragDropSupport () {
  return window.File && window.FileReader && window.FileList
}
