const most = require('most')

const withLatestFrom = (fn, stream) => (sampleStream) => most.sample(fn, sampleStream, stream, sampleStream)

module.exports = withLatestFrom
