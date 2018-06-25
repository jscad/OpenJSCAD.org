const line2 = (start = [0, 0], end = [1, 1]) => {
  return {
    type: 'line2',
    start,
    end
  }
}

module.exports = line2
