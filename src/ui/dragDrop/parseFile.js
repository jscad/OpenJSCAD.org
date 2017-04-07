import createConversionWorker from '../../io/createConversionWorker'
import saveScript from './saveScript'
import { isLocalMode } from './helpers'

// parse the file (and convert) to a renderable source (jscad)
export default function parseFile (file, previousScript, conversionCallback, {processor, memFs}) {
  const {source, name} = file

  if (source === '') {
    if (isLocalMode()) {
      throw new Error('Could not read file. You are using a local copy of OpenJSCAD.org; if you are using Chrome, you need to launch it with the following command line option:\n\n--allow-file-access-from-files\n\notherwise the browser will not have access to uploaded files due to security restrictions.')
    }
    throw new Error('Could not read file.')
  }
  if (previousScript === source) return

  if (processor) {
    saveScript(gMemFs, name, source)
    // FIXME: refactor : same code as ui/examples
    processor.setStatus2('busy', `Converting ${name}`)

    const worker = createConversionWorker(conversionCallback)
    const baseurl = processor.baseurl
    // NOTE: cache: true is very important to control the evaluation of all cached files (code)
    worker.postMessage({baseurl, source, filename: name, cache: true})
  }
}

/*
 parse is actually parse & convert
 should caching into gMemFs not only done AFTER sucessfull conversion ?
*/
