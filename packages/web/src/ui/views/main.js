const html = require('bel')

function dom (state, i18n, paramsCallbacktoStream, editorCallbackToStream) {
  const i18nFake = x => x
  i18nFake.translate = x => x
  i18n = i18n || i18nFake

  const menuIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`

  const options = require('./options')(state, i18n)
  const parameters = require('./designParameters')(state, paramsCallbacktoStream, i18n)
  const status = require('./status')(state, i18n)
  const help = require('./help')(state, i18n)

  const io = require('./io')(state, i18n)
  const editor = require('./editor2').editorWrapper(state, editorCallbackToStream, i18n)
  const toolBar = require('./toolbar')(state, i18n)

  const viewer = require('./viewer')(state, i18n)
  const viewerControls = require('./viewerControls')(state, i18n)

  //       //<input type="button" value="${i18n`load jscad project`}" id="fileLoader"/>
  // <a id="menuToggle">${menuIcon}</a>
  const output = html`
    <div id='container' style='color:${state.themes.themeSettings.mainTextColor}'>

    <header>
    <section>
      <h3>
        
        <span>JSCAD</span>
      </h3>
    </section>
    <section class='designName'>
      <h3>${state.design.name}</h3>
    </section>
    <section>
    </section>
      ${io}
      </header>
      
      ${options}
      ${help}
      ${toolBar}
      ${viewerControls}


      <!-- bare bones essentials -->
      <!--Status information/errors-->
      ${status}

      <!--Viewer-->
      ${viewer}

      <!--Editor-->
      ${state.activeTool === 'editor' ? editor : ''}

      <!--Params-->
      ${parameters}
    
    </div>
  `

  return output
}

module.exports = dom
