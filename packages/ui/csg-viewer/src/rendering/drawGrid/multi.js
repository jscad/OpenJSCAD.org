function makeDrawMultiGrid (regl, params) {
  const { size, ticks } = params
  const drawMainGrid = require('./index')(regl, { size, ticks: ticks[0] })
  const drawSubGrid = require('./index')(regl, { size, ticks: ticks[1] })
  const drawGrid = (props) => {
    drawMainGrid(props)
    drawSubGrid({ color: props.subColor, fadeOut: props.fadeOut })
  }
  return drawGrid
}

module.exports = makeDrawMultiGrid
