const { create } = require('@most/create')

function callBackToStream () {
  let addWrap = function () {}

  function callbackTest (externalData) {
    addWrap(externalData)
  }
  const callback = callbackTest
  const stream = create((add, end, error) => {
    addWrap = add
  })
  return { stream, callback }
}
module.exports = callBackToStream
