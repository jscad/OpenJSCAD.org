const fs = require('fs')
const png = require('pngjs')

const bufferToPng = (buffer, width, height, fileName) => {
  const genOutput = (inBuf, width, height) => {
    let pngImg = new png.PNG({ width, height })

    /* for (let i = 0; i < inBuf.length; ++i) {
      pngImg.data[i] = inBuf[i]
    } */
    // vertical flip

    for (let j = 0; j < height; ++j) { // from https://gist.github.com/bsergean
      for (let i = 0; i < width; ++i) {
        let k = j * width + i
        let r = inBuf[4 * k]
        let g = inBuf[4 * k + 1]
        let b = inBuf[4 * k + 2]
        let a = inBuf[4 * k + 3]

        // let m = (height - j + 1) * width + i
        let m = (height - j) * width + i
        pngImg.data[4 * m] = r
        pngImg.data[4 * m + 1] = g
        pngImg.data[4 * m + 2] = b
        pngImg.data[4 * m + 3] = a
      }
    }
    pngImg.pack().pipe(fs.createWriteStream(fileName))
  }

  // this is just a helper
  function log (inBuf, width, height) {
    var channels = inBuf.length / 4
    for (var i = 0; i < channels; ++i) {
      var r = inBuf[i * 4]
      var g = inBuf[i * 4 + 1]
      var b = inBuf[i * 4 + 2]
      var a = inBuf[i * 4 + 3]

      console.log(r, g, b, a)
      console.log('//')
    }
  }

  genOutput(buffer, width, height)
}

module.exports = bufferToPng
