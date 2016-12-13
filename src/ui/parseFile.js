// parse the file (and convert) to a renderable source (jscad)
export default function parseFile (f, onlyifchanged) {
  // console.log("parseFile("+f.name+")")
  var source = f.source
  var editorSource = source

  if (source === '') {
    if (document.location.toString().match(/^file\:\//i)) {
      throw new Error('Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.')
    }
    throw new Error('Could not read file.')
  }

  if (previousScript === source) return

  if (gProcessor && (!onlyifchanged)) {
    var filename = f.name

    saveScript(filename, source)

    // FIXME: refactor : same code as ui/examples
    gProcessor.setStatus('Converting ' + filename + " <img id=busy src='imgs/busy.gif'>")
    const worker = createConversionWorker()
    const baseurl = gProcessor.baseurl
    // NOTE: cache: true is very important to control the evaluation of all cached files (code)
    worker.postMessage({baseurl, source, filename, cache: true})
  }
}
