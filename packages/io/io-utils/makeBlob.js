const nodeBlob = require('./Blob.js')

const makeBlob = () => {
  const blob = typeof window !== 'undefined' ? window.Blob : nodeBlob
  return blob
}

module.exports = makeBlob
