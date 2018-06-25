/* converts input data to array if it is not already an array */
const toArray = data => {
  if (!data) return []
  if (data.constructor !== Array) return [data]
  return data
}

module.exports = toArray
