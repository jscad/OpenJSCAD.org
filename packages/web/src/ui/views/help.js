const html = require('bel')

const help = (state, i18n) => {
  const exampleElems = require('./examples')(state, i18n)
  return html`
    <span id='help' style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <h3>Documentation:</h3>
        <a class="navlink" href="https://openjscad.org/dokuwiki/doku.php" target="_blank">User Guide / Documentation <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">How to program with OpenJSCAD: online, offline & CLI</span>
        <br/>
        <a class="navlink" href="https://jscad.xyz/forum" rel="publisher" target="_blank">Recent Updates <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">Announcements of recent developments</span>
        <br/>
        <a class="navlink" href="https://jscad.xyz/forum" target="_blank">Google+ Community <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">Discuss with other users &amp; developers</span>
      </div>
      <div>
        <h3>Examples:</h3>
        <table>
          ${exampleElems}
        </table>
      </div>
    </span>
  `
}

module.exports = help
