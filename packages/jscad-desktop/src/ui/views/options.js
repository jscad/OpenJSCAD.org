const html = require('bel')

module.exports = function options (state) {
  return html`
<section id='options' style='visibility:${state.showOptions ? 'visible' : 'hidden'}; color:${state.themeSettings.secondaryTextColor}'>
  Currently ONLY working /settable options are:
   <br>* themes 
   <br>* geometry caching
   
  <fieldset>
    <legend> <h3> Theme </h3> </legend>
    <select id='themeSwitcher'>
      <option value='dark' selected=${state.themeName === 'dark'}>Dark Theme</option>
      <option value='light' selected=${state.themeName === 'light'}>Light Theme</option>
    </select>
  </fieldset>

  <fieldset>
    <legend> <h3> Geometry generation</h3> </legend>
    <label>Experimental geometry caching: (see <a href='https://github.com/jscad/jscad-desktop#geometry-caching' target="_blank">docs</a>)
      <input id='toggleVtreeMode' type='checkbox' checked=${state.design.vtreeMode}/>
    </label>
    <label>Timeout for solids generation
      <input id='solidsTimeout' type='number' min=0 max=200000 value=${state.solidsTimeOut}/>
    </label>
  </fieldset>

    <fieldset>
      <legend> <h3> 3d Viewer </h3> </legend>  
      <label>Zoom to fit on new parameters
        <input type='checkbox' checked=false id='viewer-zoomtofitonparamschange'/>
      </label>
      <label>Zoom to fit on design load
        <input type='checkbox' checked=false id='viewer-zoomtofitonload'/>
      </label>
    </fieldset>

    <fieldset>
      <legend> <h3> Storage </h3> </legend>  
      <label>Settings Storage path (not settable)
        <input type='text' disabled value='${state.storage.path}'/>
      </label>
    </fieldset>
</section>`
}
