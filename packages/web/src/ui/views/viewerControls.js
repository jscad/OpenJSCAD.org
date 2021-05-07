const html = require('nanohtml')

const viewerControls = (state, i18n) => html`
<div id='controls'>
  <label for="toggleGrid">${i18n`grid`}</label>
    <input type="checkbox" id="toggleGrid" checked=${state.viewer.grid.show} />
  <label for="toggleAxes">${i18n`axes`}</label>
    <input type="checkbox" id="toggleAxes" checked=${state.viewer.axes.show} />
  <label for="toggleAutoRotate">${i18n`auto rotate`}</label>
    <input type="checkbox" id="toggleAutoRotate" checked=${state.viewer.rendering.autoRotate}/>
  <label for="toggleAutoZoom">${i18n`auto zoom`}</label>
    <input type="checkbox" id="toggleAutoZoom" checked=${state.viewer.rendering.autoZoom}/>
</div>`

module.exports = viewerControls
