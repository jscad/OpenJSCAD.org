const html = require('bel')
const {createParamControls} = require('./createParameterControls3')

module.exports = function designParameters (state, paramsCallbacktoStream) {
  const {paramValues, paramDefinitions} = state.design

  const {controls} = createParamControls(paramValues, paramDefinitions, paramsCallbacktoStream.callback)

  return html`
  <section id='params' style='visibility:${state.design.paramDefinitions.length === 0 ? 'hidden' : 'visible'};color:${state.themeSettings.secondaryTextColor}'>
        <span id='paramsTable'>
          <table>
            ${controls}
          </table>
        </span>
        <span id='paramsControls'>
          <button id='updateDesignFromParams'>Update</button>
          <label for='instantUpdate'>Instant Update</label>
          <input type='checkbox' checked='${state.instantUpdate}' id='instantUpdate'/>
        </span>
      </section>
    `
}
