const fs = require('fs')
const png = require('pngjs')

const bufferToPng = (buffer, width, height, fileName) => {
  const genOutput = (inBuf, width, height) => {
    const pngImg = new png.PNG({ width, height })

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
    /**
     * Use a sync write to avoid needing a promise.
     */
    fs.writeFileSync(fileName, png.PNG.sync.write(pngImg))
  }
  genOutput(buffer, width, height)
}

module.exports = bufferToPng
