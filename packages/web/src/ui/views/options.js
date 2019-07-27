const html = require('bel')

module.exports = function options (state, i18n) {
  const languages = state.languages.available.map(language => {
    const selected = state.languages.active === language.code
    return html`<option value='${language.code}' selected=${selected}>${i18n.translate(language.fullName)}</option>`
  })
  const shortcuts = require('./shortcuts')(state, i18n)

  return html`
  <section id='options' style='visibility:${state.activeTool === 'options' ? 'visible' : 'hidden'}; color:${state.themes.themeSettings.secondaryTextColor}'>   

  <fieldset>
    <legend> <h3> ${i18n`options.language.h3`} </h3> </legend>
    <select id='languageSwitcher'>
      ${languages}  
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`options.theme.h3`} </h3> </legend>
    <select id='themeSwitcher'>
      <option value='dark' selected=${state.themes.active === 'dark'}>dark</option>
      <option value='light' selected=${state.themes.active === 'light'}>light</option>
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`options.generation.h3`}</h3> </legend>
    <label>${i18n`options.generation.caching`} ${i18n`see`} <a href='https://github.com/jscad/jscad-desktop#geometry-caching' target="_blank">docs</a>
      <input id='toggleVtreeMode' type='checkbox' checked=${state.design.vtreeMode}/>
    </label>
    <label>${i18n`options.generation.timeout`}
      <input id='solidsTimeout' type='number' min=0 max=200000 value=${state.design.solidsTimeOut} />
    </label>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`options.viewer.h3`} </h3> </legend>
    <label>${i18n`options.viewer.zoomonparamchange`}
      <input type='checkbox' checked=false id='viewer-zoomtofitonparamschange' disabled />
    </label>
    <label>${i18n`options.viewer.zoomonreload`}
      <input type='checkbox' checked=false id='viewer-zoomtofitonload' disabled />
    </label>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`options.storage.h3`} </h3> </legend>
    <label>${i18n`options.storage.settingspath`} ${i18n`notsettable`}
      <input type='text' disabled value='${state.storage.path}' disabled />
    </label>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`options.filehandling.h3`} </h3> </legend>
    <label>${i18n`options.filehandling.converttoscript`}
      <input type='checkbox' checked=false id='design-convertSupportedTypes' checked=${state.design.convertSupportedTypes}/>
    </label>
  </fieldset>

  ${shortcuts}

</section>`
}
