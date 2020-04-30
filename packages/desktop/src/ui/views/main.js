const html = require('bel')

function dom (state, paramsCallbacktoStream, i18n) {
  const i18nFake = x => x
  i18nFake.translate = x => x
  i18n = i18n || i18nFake

  const formatsList = state.availableExportFormats
    .map(function ({ name, displayName }) {
      displayName = i18n.translate(displayName)
      return html`<option value=${name} selected='${state.exportFormat === name}'>
        ${displayName}
      </option>`
    })
  const exportAvailable = state.availableExportFormats.length > 0

  const optionsIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  // html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`
  const options = require('./options')(state, i18n)
  const parameters = require('./designParameters')(state, paramsCallbacktoStream, i18n)
  const status = require('./status')(state, i18n)
  const viewer = require('./viewer')(state, i18n)

  const output = html`
    <div id='container' style='color:${state.themeSettings.mainTextColor}'>
      <header>
        <section>
          <h3>JSCAD</h3>
        </section>
        <section class='designName'>
          <h3>${state.design.name}</h3>
        </section>
        <section>
        </section>
        <section>
          <input type="button" value="${i18n`load jscad project`}" id="fileLoader"/>
          <label for="autoReload">${i18n`auto reload`}</label>
            <input type="checkbox" id="autoReload" checked=${state.autoReload}/>
          <span id='exports' style='visibility:${exportAvailable ? 'visible' : 'hidden'}'>
            <select id='exportFormats'>
            ${formatsList}
            </select>
            <input type='button' value="${i18n`export`}" id="exportBtn"/>
        </span>
          
        </section>
      </header>
      
      <!--Status information/errors-->
      ${status}

      <!--Ui Controls-->
      <div id='controls'>
        <label for="grid">${i18n`grid`}</label>
          <input type="checkbox" id="grid" checked=${state.viewer.grid.show} />
        <label for="toggleAxes">${i18n`axes`}</label>
          <input type="checkbox" id="toggleAxes" checked=${state.viewer.axes.show} />
        <label for="autoRotate">${i18n`autorotate`}</label>
          <input type="checkbox" id="autoRotate"/>
      </div>
      
      <!--Params-->
      ${parameters}

      <section id='toolbar'>
        <button id='toggleOptions'>
          ${optionsIcon}
        </button>
      </section>

      <!--Options-->
      ${options}

      <!--Viewer-->
      ${viewer}
    </div>
  `
  return output
}

module.exports = dom
