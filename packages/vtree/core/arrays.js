/* converts input data to array if it is not already an array */
function toArray (data) {
  if (!data) return []
  if (data.constructor !== Array) return [data]
  return data
}

const flatten = arr =>
  arr.reduce(
    (flat, toFlatten) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten),
    []
  )

module.exports = { toArray, flatten }
