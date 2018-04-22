const html = require('bel')

function dom (state, paramsCallbacktoStream, editorCallbackToStream, i18n) {
  const i18nFake = x => x
  i18nFake.translate = x => x
  i18n = i18n || i18nFake

  const formatsList = state.availableExportFormats
    .map(function ({name, displayName}) {
      displayName = i18n.translate(displayName)
      return html`<option value=${name} selected='${state.exportFormat === name}'>
        ${displayName}
      </option>`
    })
  const exportAvailable = state.availableExportFormats.length > 0

  const menuIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`
  const optionsIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  const editorIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><polygon points="14 2 18 6 7 17 3 17 3 13 14 2"/><line x1="3" y1="22" x2="21" y2="22"/></svg>`
  const helpIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12" y2="17"/></svg>`
  const gitIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-pull-request"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`
  
  const options = require('./options')(state, i18n)
  const parameters = require('./designParameters')(state, paramsCallbacktoStream, i18n)
  const status = require('./status')(state, i18n)
  const viewer = require('./viewer')(state, i18n)
  const help = require('./help')(state, i18n)

  const editor = require('./editor').editorWrapper(state, editorCallbackToStream, i18n)

  const output = html`
    <div id='container' style='color:${state.themeSettings.mainTextColor}'>

    <header>
    <section>
      <h3>
        <a id="menuToggle">${menuIcon}</a>
        <span>JSCAD</span>
      </h3>
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
        <button id='toggleEditor'>
          ${editorIcon}
        </button>
        <button id='toggleHelp'>
          ${helpIcon}
        </button>
      </section>

      <!--Options-->
      ${options}

      <!--Viewer-->
      ${viewer}

      <!--Editor-->
      ${editor}

      <!--Help-->
      ${help}
      
    </div>
  `

  return output
}

module.exports = dom
