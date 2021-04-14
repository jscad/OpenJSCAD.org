const fs = require('fs')
const png = require('pngjs')

const bufferToPng = (buffer, width, height, fileName) => {
  const genOutput = (inBuf, width, height) => {
    const pngImg = new png.PNG({ width, height })

    /* for (let i = 0; i < inBuf.length; ++i) {
      pngImg.data[i] = inBuf[i]
    } */
    // vertical flip

    for (let j = 0; j < height; ++j) { // from https://gist.github.com/bsergean
      for (let i = 0; i < width; ++i) {
        const k = j * width + i
        const r = inBuf[4 * k]
        const g = inBuf[4 * k + 1]
        const b = inBuf[4 * k + 2]
        const a = inBuf[4 * k + 3]

        // let m = (height - j + 1) * width + i
        const m = (height - j) * width + i
        pngImg.data[4 * m] = r
        pngImg.data[4 * m + 1] = g
        pngImg.data[4 * m + 2] = b
        pngImg.data[4 * m + 3] = a
      }
    }
    // pngImg.pack().pipe(fs.createWriteStream(fileName))
    /**
     * Use a sync write to avoid needing a promise.
     */
    fs.writeFileSync(fileName, png.PNG.sync.write(pngImg))
  }

  // this is just a helper
  // function log (inBuf, width, height) {
  //   var channels = inBuf.length / 4
  //   for (var i = 0; i < channels; ++i) {
  //     var r = inBuf[i * 4]
  //     var g = inBuf[i * 4 + 1]
  //     var b = inBuf[i * 4 + 2]
  //     var a = inBuf[i * 4 + 3]
  //
  //     console.log(r, g, b, a)
  //     console.log('//')
  //   }
  // }

  genOutput(buffer, width, height)
}

module.exports = bufferToPng
