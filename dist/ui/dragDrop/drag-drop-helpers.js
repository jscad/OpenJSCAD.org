"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findMainFile = findMainFile;
function findMainFile(memFsTotal, memFs, file) {
  var mainFile = void 0;
  if (memFsTotal > 1) {
    for (var filename in memFs) {
      if (memFs[filename].name.match(/main.(jscad|js)$/)) {
        mainFile = memFs[filename];
        break;
      }
    }
    if (!mainFile) {
      // try again but search for the function declaration of main()
      for (var _filename in memFs) {
        if (memFs[_filename].source.search(/function\s+main\s*\(/) >= 0) {
          mainFile = memFs[_filename];
          break;
        }
      }
    }
  } else {
    mainFile = memFs[file.name];
  }
  return mainFile;
}