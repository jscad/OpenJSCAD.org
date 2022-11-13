import bufferToPng from './bufferToPng.js'

const contextToBuffer = (gl, width, height, depth = 4) => {
  const buffer = new Uint8Array(width * height * depth)
  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, buffer)
  return buffer
}

const writeBufferToFile = (buffer, width, height, path) => {
  bufferToPng(buffer, width, height, path)
}

const writeContextToFile = (context, width, height, depth, path = './test.png') => {
  const buffer = contextToBuffer(context, width, height, depth)
  writeBufferToFile(buffer, width, height, path)
}

export { contextToBuffer, writeBufferToFile, writeContextToFile }
