// from https://medium.com/@venomnert/pipe-function-in-javascript-8a22097a538e
const _pipe = (a, b) => (arg) => b(a(arg))
const pipe = (...ops) => ops.reduce(_pipe)

module.exports = pipe
