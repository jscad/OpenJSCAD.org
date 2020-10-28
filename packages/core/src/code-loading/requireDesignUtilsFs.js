const path = require('path')
const { toArray } = require('@jscad/array-utils')

// NOTE/ path.parse is NOT included by browserify & co , hence this function ...
// https://github.com/substack/path-browserify/pull/3
const splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^/]+?|)(\.[^./]*|))(?:[/]*)$/
const splitPath = (filename) => splitPathRe.exec(filename).slice(1)
const parsePath = (pathString) => {
  assertPath(pathString)

  const allParts = splitPath(pathString)
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'")
  }
  allParts[1] = allParts[1] || ''
  allParts[2] = allParts[2] || ''
  allParts[3] = allParts[3] || ''

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, allParts[1].length - 1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  }
}

const assertPath = (path) => {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + path)// util.inspect(path))
  }
}

/** get main entry point of a design, given a file system instance and a list of paths
 * @param  {Object} fs a file-system like object (either node's fs or some other) providing at least
 * statSync, existSync, readFileSync, readdirSync
 * @param  {} paths
 */
const getDesignEntryPoint = (fs, paths) => {
  if (!paths) {
    return
  }
  const mainPath = toArray(paths)[0]
  let filePath
  const stats = fs.statSync(mainPath)
  if (stats.isFile()) {
    return mainPath
  } else if (stats.isDirectory()) {
    // first try to use package.json to find main
    const packageFile = path.join(mainPath, 'package.json')
    if (fs.existsSync(packageFile)) {
      const rMain = JSON.parse(fs.readFileSync(packageFile)).main
      if (rMain) {
        return path.join(mainPath, rMain)
      }
    }

    // if all else fails try to look for index.js/jscad, main.js/jscad or a file with same name
    // as the folder
    const entries = fs.readdirSync(mainPath)
    const acceptableMainFiles = ['main', 'index', parsePath(path.basename(mainPath)).name]
    const jsMainFiles = acceptableMainFiles.map((x) => x + '.js')
    const jscadMainFiles = acceptableMainFiles.map((x) => x + '.jscad')

    const candidates = entries.filter((entry) => jsMainFiles.concat(jscadMainFiles).includes(entry))
    if (candidates.length > 0) {
      filePath = path.join(mainPath, candidates[0])
    }
    return filePath
  }
  return mainPath
}

/** attempt to extract a package name from a directory
 * @param  {} fs
 * @param  {} dirName
 * @param  {} filePath
 */
const packageNameFromDir = (fs, dirName, filePath) => {
  const packageFile = path.join(dirName, 'package.json') // if the directory contains a package.json, try that one
  if (fs.existsSync(packageFile)) {
    const name = JSON.parse(fs.readFileSync(packageFile)).name
    if (name) {
      return name
    }
  }
  return filePath ? parsePath(path.basename(filePath)).name : path.basename(dirName)
}

/** extract the design name from
 * @param  {Object} fs a file-system like object (either node's fs or some other) providing at least statSync, existSync, readFileSync
 * @param  {Array} paths an array of paths (strings) or a single path
 */
const getDesignName = (fs, paths) => {
  if (!paths) {
    return 'undefined'
  }
  const mainPath = toArray(paths)[0]
  const stats = fs.statSync(mainPath)
  if (stats.isFile()) { // if main path is a file, find its folder
    const dirName = path.dirname(mainPath)
    return packageNameFromDir(fs, dirName, mainPath)
  } else if (stats.isDirectory()) { // if main path is a folder , try to find name from package.json
    // try to use package.json & co to find main
    return packageNameFromDir(fs, mainPath)
  }
}

module.exports = {
  getDesignEntryPoint,
  getDesignName
}
