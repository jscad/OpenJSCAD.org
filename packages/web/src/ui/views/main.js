const html = require('nanohtml')

const dom = (state, i18n, paramsCallbacktoStream, editorCallbackToStream) => {
  const i18nFake = (x) => x
  i18nFake.translate = (x) => x
  i18n = i18n || i18nFake

  const options = require('./options')(state, i18n)
  const parameters = require('./designParameters')(state, paramsCallbacktoStream, i18n)
  const status = require('./status')(state, i18n)
  const help = require('./help')(state, i18n)

  const io = require('./io')(state, i18n)
  const editor = require('./editor2').editorWrapper(state, editorCallbackToStream, i18n)
  const toolBar = require('./toolbar')(state, i18n)

  const viewer = require('./viewer')(state, i18n)
  const viewerControls = require('./viewerControls')(state, i18n)

  if (state.themes && state.themes.themeSettings) {
    // set the global CSS variables (theme)
    const { mainTextColor, secondaryTextColor } = state.themes.themeSettings
    const bodyEL = document.body
    bodyEL.style.setProperty('--main-text-color', `${mainTextColor}`)
    bodyEL.style.setProperty('--secondary-text-color', `${secondaryTextColor}`)
  }

  const output = html`
  <div id='container'>
    <div id='header'>
      <span id='jscadName'>
        <h3>JSCAD</h3>
      </span>
      <span id='designName'>
        <h3>${state.design.name}</h3>
      </span>
      ${io}
    </div>

    ${options}
    ${toolBar}

    ${help}
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
