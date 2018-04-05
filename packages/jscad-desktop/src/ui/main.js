const html = require('bel')
const {createParamControls} = require('./createParameterControls3')

function dom (state, paramsCallbacktoStream) {
  const formatsList = state.availableExportFormats
    .map(function ({name, displayName}) {
      return html`<option value=${name} selected='${state.exportFormat === name}'>${displayName}</option>`
    })

  const {paramValues, paramDefinitions} = state.design
  const {controls} = createParamControls(paramValues, paramDefinitions, paramsCallbacktoStream.callback)

  const statusMessage = state.error !== undefined
    ? `Error: ${state.error.message} line: ${state.error.lineno}, filename:${state.error.filename} stack:  ${state.error.stack}` : ''

  const optionsIcon = html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  // html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sliders"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`

  const output = html`
    <div id='container' style='color:${state.themeSettings.mainTextColor}'>
      <header>
        <section>
          <h3>JSCAD</h3>
        </section>
        <section class='designName'>
          <h3>${state.design.name}</h3>
        </section>
        <section>
        </section>
        <section>
          <input type="button" value="load jscad (.js or .jscad) file" id="fileLoader"/>
          <label for="autoReload">Auto reload</label>
            <input type="checkbox" id="autoReload" checked=${state.autoReload}/>
          <span id='exports'>
            <select id='exportFormats'>
            ${formatsList}
            </select>
            <input type='button' value="export" id="exportBtn"/>
        </span>
          
        </section>
      </header>
      
      <!--Status information/errors-->
      <span id='busy'>${state.busy ? 'processing, please wait' : ''}</span>
      <span id='status'>${statusMessage}</span>
      <span id='appUpdates' style='visibility:${state.appUpdates.available === false ? 'hidden' : 'visible'}'> 
        <a href='https://github.com/jscad/jscad-desktop/releases' target="_blank">
          @jscad/desktop version ${state.appUpdates.version} is available! Please click here to view and download
        </a>
      </span>

      <!--Ui Controls-->
      <div id='controls'>
        <label for="grid">Grid</label>
          <input type="checkbox" id="grid" checked=${state.viewer.grid.show}/>
        <label for="toggleAxes">Axes</label>
          <input type="checkbox" id="toggleAxes" checked=${state.viewer.axes.show}/>
        <label for="autoRotate">Autorotate</label>
          <input type="checkbox" id="autoRotate"/>
      </div>
      
      <!--Params-->
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

      <section id='toolbar'>
        <button id='toggleOptions'>
          ${optionsIcon}
        </button>
      </section>

      <!--Options-->
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

      </section>

      <canvas id='renderTarget'> </canvas>
      
    </div>
  `
  return output
}

module.exports = dom
