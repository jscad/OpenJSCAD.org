/** convert hue values to a color component (ie one of r, g, b)
 * @param  {} p
 * @param  {} q
 * @param  {} t
 */
const hueToColorComponent = (p, q, t) => {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

module.exports = hueToColorComponent
