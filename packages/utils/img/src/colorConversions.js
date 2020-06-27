const hexToRgba = (hex, normalize = true) => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const a = hex.length > 6 ? parseInt(hex.substring(6, 8), 16) : 255
  const result = [r, g, b, a]
  return normalize ? normalizeRgba(result) : result
}

// normalize 0-255 values to 0-1
const normalizeRgba = (rgba) => rgba.map((v) => (+(v / 255).toFixed(2)))

module.exports = { hexToRgba, normalizeRgba }
