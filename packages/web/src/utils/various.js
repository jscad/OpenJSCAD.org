// FIXME : this could be usefull overall , we should reuse
const isLocalMode = () => document.location.toString().match(/^file:\//i)

// FIXME: SAME
const isMobile = () => 'createTouch' in document

// FIXME: SAME
const hasDragDropSupport = () => (window.File && window.FileReader && window.FileList)
