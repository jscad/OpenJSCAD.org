import { makeBlob } from '@jscad/io'

const Blob = makeBlob()

export function convertToBlob (input) {
  const {data, mimeType} = input
  const blob = new Blob(data, { type: mimeType })
  return blob
}
