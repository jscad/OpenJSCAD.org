/* converts input data to array if it is not already an array*/
export function toArray (data) {
  if (!data) return []
  if (data.constructor !== Array) return [data]
  return data
}
