const makeDrawMultiGrid = (regl, params) => {
  const defaults = {
    size: [50, 50],
    ticks: [10, 1]
  }
  const { size, ticks } = Object.assign({}, defaults, params)
  const drawMainGrid = require('./index')(regl, { size, ticks: ticks[0] })
  const drawSubGrid = require('./index')(regl, { size, ticks: ticks[1] })
  const drawGrid = (props) => {
    drawMainGrid(props)
    drawSubGrid({ color: props.subColor, fadeOut: props.fadeOut })
  }
  return drawGrid
}

module.exports = makeDrawMultiGrid
