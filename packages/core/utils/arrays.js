/* converts input data to array if it is not already an array */
const toArray = data => {
  if (!data) return []
  if (data.constructor !== Array) return [data]
  return data
}

const head = (array) => {
  if (array === undefined || null) {
    return undefined
  }
  if (array.length === 0) {
    return undefined
  }
  return array[0]
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

module.exports = {toArray, head, flatten}
