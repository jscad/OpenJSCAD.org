const { create } = require('@most/create')

const callBackToStream = () => {
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
