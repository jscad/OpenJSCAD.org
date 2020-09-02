const html = require('nanohtml')

const viewerControls = (state, i18n) => html`
<div id='controls'>
  <label for="grid">${i18n`grid`}</label>
    <input type="checkbox" id="grid" checked=${state.viewer.grid.show} />
  <label for="toggleAxes">${i18n`axes`}</label>
    <input type="checkbox" id="toggleAxes" checked=${state.viewer.axes.show} />
  <label for="autoRotate">${i18n`auto rotate`}</label>
    <input type="checkbox" id="autoRotate"/>
</div>`

module.exports = viewerControls
