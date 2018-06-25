module.exports = toString

function toString (vec) {
  return `(${vec[0].toFixed(5)}, ${vec[1].toFixed(5)}, ${vec[2].toFixed(5)})`
}
