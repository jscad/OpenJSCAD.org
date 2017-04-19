import fs from 'fs'
import path from 'path'
/**
 * fetch the requested script either via MemFs or HTTP Request
 * (Note: The resolved modules are prepepended in front of the calling script
 * @param {String} relpath the relative path
 * @param {String} scriptPath the path to the script
 * @param {Object} memFs local cache (optional)
 */
export function resolveIncludesFs (relpath, scriptPath, memFs) {
  // include the requested script via MemFs if possible
  return new Promise(function (resolve, reject) {
    console.log('we are here', relpath, scriptPath)
    const fullPath = path.resolve(relpath, scriptPath)
    console.log('fullPath', fullPath)
    fs.readFile(fullPath, 'UTF8', (err, data) => err ? reject(err) : resolve(data))
    //const data = fs.readFileSync(fullPath)
    //console.log('data', data)
    //resolve(data)
  })
}
