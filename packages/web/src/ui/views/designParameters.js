const html = require('nanohtml')

const { createParamControls } = require('./parameterControls')

const designParameters = (state, paramsCallbacktoStream, i18n) => {
  const { parameterValues, parameterDefinitions, parameterDefaults } = state.design
  const { controls } = createParamControls(
    Object.assign({}, parameterDefaults, parameterValues), parameterDefinitions, paramsCallbacktoStream.callback
  )
  return html`
  <section id='params' style='visibility:${state.design.parameterDefinitions.length === 0 ? 'hidden' : 'visible'};color:${state.themes.themeSettings.secondaryTextColor}'>
    <span id='paramsTable'>
      <table>
            ${controls}
      </table>
    </span>
    <span id='paramsControls'>
      <button id='updateDesignFromParams'>${i18n`update`}</button>
      <button id='resetDesignToParameterDefaults'>${i18n`reset`}</button>
      <label for='instantUpdate'>${i18n`instant update`}</label>
      <input type='checkbox' checked='${state.design.instantUpdate}' id='instantUpdate'/>
    </span>
  </section>
`
}

module.exports = designParameters
