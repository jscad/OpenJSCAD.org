const path = require('path')
const { toArray } = require('@jscad/core/utils/arrays')

// NOTE/ path.parse is NOT included by browserify & co , hence this function ...
// https://github.com/substack/path-browserify/pull/3
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
var splitPath = function (filename) {
  return splitPathRe.exec(filename).slice(1)
}
const parsePath = function (pathString) {
  assertPath(pathString)

  var allParts = splitPath(pathString)
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

function assertPath (path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + path)// util.inspect(path))
  }
}

/** get main entry point of a script
 * @param  {} !paths
 */
const getDesignEntryPoint = (_fs, _require = require, paths) => {
  if (!paths) {
    return
  }
  let mainPath = toArray(paths)[0]
  let filePath
  const stats = _fs.statSync(mainPath)
  if (stats.isFile()) {
    return mainPath
  } else if (stats.isDirectory()) {
    // console.log('found dir')
    // first try to use package.json to find main
    const packageFile = path.join(mainPath, 'package.json')
    if (_fs.existsSync(packageFile)) {
      const rMain = _require(packageFile).main
      if (rMain) {
        return path.join(mainPath, rMain)
      }
    }

    // if all else fails try to look for index.js/jscad, main.js/jscad or a file with same name
    // as the folder
    const entries = _fs.readdirSync(mainPath)
    const acceptableMainFiles = ['main', 'index', parsePath(path.basename(mainPath)).name]
    const jsMainFiles = acceptableMainFiles.map(x => x + '.js')
    const jscadMainFiles = acceptableMainFiles.map(x => x + '.jscad')

    const candidates = entries
      .filter(entry => {
        return jsMainFiles.concat(jscadMainFiles).includes(entry)
      })
    if (candidates.length > 0) {
      filePath = path.join(mainPath, candidates[0])
    }
    return filePath
  }
  return mainPath
}

const nameFromDir = (_fs, dirName, filePath) => {
  const packageFile = path.join(dirName, 'package.json')
  if (_fs.existsSync(packageFile)) {
    const name = require(packageFile).name
    if (name) {
      return name
    }
  }
  return filePath ? parsePath(path.basename(filePath)).name : path.basename(dirName)
}

const getDesignName = (_fs, paths) => {
  if (!paths) {
    return
  }
  let mainPath = toArray(paths)[0]
  const stats = _fs.statSync(mainPath)
  if (stats.isFile()) {
    const dirName = path.dirname(mainPath)
    return nameFromDir(_fs, dirName, mainPath)
  } else if (stats.isDirectory()) {
    // try to use package.json to find main
    return nameFromDir(_fs, mainPath)
  }
}

module.exports = { getDesignEntryPoint, getDesignName }
