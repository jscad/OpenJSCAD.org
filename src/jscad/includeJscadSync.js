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
    const xhr = new XMLHttpRequest()
    let url = relpath + scriptPath
    if (scriptPath.match(/^(https:|http:)/i)) {
      url = scriptPath
    }
    xhr.open('GET', url, true)
    xhr.onload = function (event) {
      const status = '' + event.currentTarget.status
      if (status.length >0 && status[0] === '2') {
        resolve(this.responseText)
      } else {
        reject(this.responseText)
      }
    }
    xhr.onerror = err => { reject(err) }
    xhr.send()
  })
}
