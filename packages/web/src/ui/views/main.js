const html = require('bel')

function dom (state, i18n, paramsCallbacktoStream, editorCallbackToStream) {
  const i18nFake = x => x
  i18nFake.translate = x => x
  i18n = i18n || i18nFake

  const formatsList = state.io.availableExportFormats
    .map(function ({name, displayName}) {
      displayName = i18n.translate(displayName)
      const selected = state.exportForma !== undefined ? state.exportFormat.toLowerCase() === name.toLowerCase() : undefined
      return html`<option value=${name} selected='${selected}'>
        ${displayName}
      </option>`
    })
  const exportAvailable = state.io.availableExportFormats.length > 0

  const menuIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`

  const options = require('./options')(state, i18n)
  const parameters = require('./designParameters')(state, paramsCallbacktoStream, i18n)
  const status = require('./status')(state, i18n)
  const viewer = require('./viewer')(state, i18n)
  const help = require('./help')(state, i18n)

  const editor = require('./editor2').editorWrapper(state, editorCallbackToStream, i18n)
  const toolBar = require('./toolbar')(state, i18n)

  const output = html`
    <div id='container' style='color:${state.themes.themeSettings.mainTextColor}'>

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
    <section id='io'>
      <input type="button" value="${i18n`load jscad project`}" id="fileLoader"/>
      <label for="autoReload">${i18n`auto reload`}</label>
        <input type="checkbox" id="autoReload" checked=${state.design.autoReload}/>
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

      <!--Toolbar-->
      ${toolBar}  

      <!--Options-->
      //${options}

      <!--Viewer-->
      ${viewer}

      <!--Editor-->
      ${state.activeTool === 'editor' ? editor : ''}
     
      <!--Help--> 
      ${help}
      
    </div>
  `

  return output
}

module.exports = dom
