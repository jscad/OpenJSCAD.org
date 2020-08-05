const html = require('bel')
const { createParamControls } = require('./createParameterControls3')

module.exports = function designParameters (state, paramsCallbacktoStream, i18n) {
  const { paramValues, paramDefinitions } = state.design

  const { controls } = createParamControls(paramValues, paramDefinitions, paramsCallbacktoStream.callback)

  return html`
  <section id='params' style='visibility:${state.design.paramDefinitions.length === 0 ? 'hidden' : 'visible'};color:${state.themeSettings.secondaryTextColor}'>
        <span id='paramsTable'>
          <table>
            ${controls}
          </table>
        </span>
        <span id='paramsControls'>
          <button id='updateDesignFromParams'>${i18n`update`}</button>
          <label for='instantUpdate'>${i18n`instant update`}</label>
          <input type='checkbox' checked='${state.instantUpdate}' id='instantUpdate'/>
        </span>
      </section>
    `
}
