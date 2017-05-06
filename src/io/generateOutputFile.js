import generateOutputFileBlobUrl from '../io/generateOutputFileBlobUrl'
import generateOutputFileFileSystem from '../io/generateOutputFileFileSystem'

export function generateOutputFile (extension, blob, onDone, context) {
  try {
    generateOutputFileFileSystem(extension, blob, onDone.bind(context))
  } catch (e) {
    generateOutputFileBlobUrl(extension, blob, onDone.bind(context))
  }
}
