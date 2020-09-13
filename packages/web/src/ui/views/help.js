const html = require('nanohtml')

const help = (state, i18n) => {
  const exampleElems = require('./examples')(state, i18n)
  return html`
    <span id='help' style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <h3>${i18n`Documentation`}:</h3>
        <p><a class="navlink" href="docs/" target="_blank">${i18n`User Guide`} <img src="imgs/externalLink.png" style="externalLink"></a></p>
        <h3>${i18n`Forums`}:</h3>
        <p><a class="navlink" href="https://jscad.xyz/forum" target="_blank">${i18n`User Group`} <img src="imgs/externalLink.png" style="externalLink"></a></p>
        <p><a class="navlink" href="https://jscad.xyz/forum/category/1/announcements" rel="publisher" target="_blank">${i18n`Announcements`} <img src="imgs/externalLink.png" style="externalLink"></a></p>
        <p><a class="navlink" href="https://jscad.xyz/forum" rel="publisher" target="_blank">${i18n`Recent Updates`} <img src="imgs/externalLink.png" style="externalLink"></a></p>
      </div>
      <div>
        <h3>${i18n`Examples`}:</h3>
        <table>
          ${exampleElems}
        </table>
      </div>
    </span>
  `
}

module.exports = help
