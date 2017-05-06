const fs = require('fs')
const path = require('path')
/**
 * fetch the requested script either via MemFs or HTTP Request
 * (Note: The resolved modules are prepepended in front of the calling script
 * @param {String} relpath the relative path
 * @param {String} scriptPath the path to the script
 * @param {Object} memFs local cache (optional)
 */
function resolveIncludesFs (relpath, scriptPath, memFs) {
  // include the requested script via MemFs if possible
  return new Promise(function (resolve, reject) {
    const fullPath = path.resolve(relpath, scriptPath)
    fs.readFile(fullPath, 'UTF8', (err, data) => err ? reject(err) : resolve(data))
  })
}

module.exports = {
  resolveIncludesFs
}
