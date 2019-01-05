const html = require('bel')

module.exports = function appUpdatesStatus (state) {
  return html`<span id='appUpdates' style='visibility:${state.appUpdates.available === false ? 'hidden' : 'visible'}'> 
        <a href='${state.appUpdates.releasesUrl}' target="_blank">
          @jscad/desktop version ${state.appUpdates.version} is available! Please click here to view and download
        </a>
      </span>`
}
