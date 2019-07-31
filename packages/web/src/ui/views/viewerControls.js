const html = require('bel')

module.exports = function viewerControls (state, i18n) {
  return html`<div id='controls'>
  <label for="toggle grid">${i18n`grid`}</label>
    <input type="checkbox" id="grid" checked=${state.viewer.grid.show} />
  <label for="toggle axis">${i18n`axes`}</label>
    <input type="checkbox" id="toggleAxes" checked=${state.viewer.axes.show} />
  <label for="toggle auto rotate">${i18n`auto rotate`}</label>
    <input type="checkbox" id="autoRotate"/>
</div>`
}
