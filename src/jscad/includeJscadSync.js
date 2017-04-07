// THESE FUNCTIONS ARE SERIALIZED FOR INCLUSION IN THE FULL SCRIPT
// TODO It might be possible to cache the serialized versions

// Include the requested script via MemFs (if available) or HTTP Request
// (Note: This function is appended together with the JSCAD script)

export default function includeJscadSync (relpath, scriptPath, memFs) {
  // console.log('include', relpath, scriptPath)
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
    var xhr = new XMLHttpRequest()
    var url = relpath + scriptPath
    if (scriptPath.match(/^(https:|http:)/i)) {
      url = scriptPath
    }
    xhr.open('GET', url, false)
    xhr.onload = function () {
      var src = this.responseText
      resolve(src)
    }
    xhr.onerror = (err) => reject(err)
    xhr.send()
  })
}
