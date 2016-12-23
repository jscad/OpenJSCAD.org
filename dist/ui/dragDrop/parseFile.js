'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseFile;
// parse the file (and convert) to a renderable source (jscad)
function parseFile(file, onlyifchanged, previousScript, _ref) {
  var gProcessor = _ref.gProcessor,
      gMemFs = _ref.gMemFs;

  // console.log("parseFile("+f.name+")")
  var source = file.source,
      name = file.name;

  if (source === '') {
    if (document.location.toString().match(/^file\:\//i)) {
      throw new Error('Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.');
    }
    throw new Error('Could not read file.');
  }
  if (previousScript === source) return;

  if (gProcessor && !onlyifchanged) {
    saveScript(gMemFs, name, source);
    // FIXME: refactor : same code as ui/examples
    gProcessor.setStatus('Converting ' + name + " <img id=busy src='imgs/busy.gif'>");
    var worker = createConversionWorker(gProcessor, gEditor);
    var baseurl = gProcessor.baseurl;
    // NOTE: cache: true is very important to control the evaluation of all cached files (code)
    worker.postMessage({ baseurl: baseurl, source: source, filename: name, cache: true });
  }
}