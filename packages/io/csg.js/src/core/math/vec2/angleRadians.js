
const angleRadians = (vector) => {
  // y=sin, x=cos
  return Math.atan2(vector[1], vector[0])
}

module.exports = angleRadians
