import { conversionFormats } from '../../jscad/conversionFormats'

function isOkFormat (file) {
  var e = file.name.toLowerCase().match(/\.(\w+)$/i)
  e = RegExp.$1
  return conversionFormats.indexOf(e) >= 0
}
// this is the core of the drag'n'drop:
//    1) walk the tree
//    2) read the files (readFileAsync)
//    3) re-render if there was a change (via readFileAsync)
export function walkFileTree (item, path) {
  console.log('walkFileTree')
  path = path || ''
  if (item.isFile) {
    return new Promise(function (resolve, reject) {
      item.file(function (file) {
        isOkFormat ? resolve(readFileAsync(file)) : resolve(undefined)
      }, reject)
    })
  } else if (item.isDirectory) {
    item.createReader().readEntries(function (entries) {
      entries.forEach(function (entry) {
        walkFileTree(entry, path + item.name + '/')
      })
    })
  }
}
