const html = require('bel')

module.exports = function options (state, i18n) {
  const languages = state.availableLanguages.map((language) => {
    const selected = state.locale === language.code
    return html`<option value='${language.code}' selected=${selected}>${i18n.translate(language.fullName)}</option>`
  })
  const shortcuts = require('./shortcuts')(state, i18n)
  return html`
<section id='options' style='visibility:${state.showOptions ? 'visible' : 'hidden'}; color:${state.themeSettings.secondaryTextColor}'>   
  <br>
  <fieldset>
    <legend> <h3> ${i18n`language`}</legend>
    <select id='languageSwitcher'>
      ${languages}  
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`theme`} </h3> </legend>
    <select id='themeSwitcher'>
      <option value='dark' selected=${state.themeName === 'dark'}>dark</option>
      <option value='light' selected=${state.themeName === 'light'}>light</option>
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> ${i18n`geometry generation`}</h3> </legend>
    <label>${i18n`experimental geometry caching`} ${i18n`see`} <a href='https://github.com/jscad/jscad-desktop#geometry-caching' target="_blank">docs</a>
      <input id='toggleVtreeMode' type='checkbox' checked=${state.design.vtreeMode}/>
    </label>
    <label>${i18n`timeout for solids generation`}
      <input id='solidsTimeout' type='number' min=0 max=200000 value=${state.solidsTimeOut} disabled />
    </label>
  </fieldset>

    <fieldset>
      <legend> <h3> ${i18n`3d viewer`} </h3> </legend>  
      <label>${i18n`zoom to fit on new parameters`}
        <input type='checkbox' checked=false id='viewer-zoomtofitonparamschange' disabled />
      </label>
      <label>${i18n`zoom to fit on design load`}
        <input type='checkbox' checked=false id='viewer-zoomtofitonload' disabled />
      </label>
    </fieldset>

    <fieldset>
      <legend> <h3> ${i18n`storage`} </h3> </legend>  
      <label>${i18n`settings storage path`} ${i18n`(not settable)`}
        <input type='text' disabled value='${state.storage.path}' disabled />
      </label>
    </fieldset>
    ${shortcuts}
</section>`
}
