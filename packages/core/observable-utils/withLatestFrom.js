const most = require('most')

const withLatestFrom = (fn, stream) => {
  return sampleStream => {
    return most.sample(fn, sampleStream, stream, sampleStream)
  }
}
module.exports = withLatestFrom
