/**
 * fetch the requested script either via MemFs or HTTP Request
 * (Note: The resolved modules are prepepended in front of the calling script
 * @param {String} relpath the relative path
 * @param {String} scriptPath the path to the script
 * @param {Object} memFs local cache (optional)
 */
function resolveIncludes (relpath, scriptPath, memFs) {
  // include the requested script via MemFs if possible
  return new Promise(function (resolve, reject) {
    if (typeof (memFs) === 'object') {
      for (var fs in memFs) {
        if (memFs[fs].fullpath === scriptPath || './' + memFs[fs].fullpath === scriptPath || memFs[fs].name === scriptPath) {
          resolve(memFs[fs].source)
          return
        }
      }
    }
    // include the requested script via webserver access
    const xhr = new XMLHttpRequest()
    let url = relpath + scriptPath
    if (scriptPath.match(/^(https:|http:)/i)) {
      url = scriptPath
    }
    xhr.open('GET', url, true)
    xhr.onload = function (event) {
      const status = '' + event.currentTarget.status
      if (status.length > 0 && status[0] === '2') {
        resolve(this.responseText)
      } else {
        reject(this.responseText)
      }
    }
    xhr.onerror = err => { reject(err) }
    xhr.send()
  })
}

module.exports = {
  resolveIncludes
}
