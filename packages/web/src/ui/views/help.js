const html = require('nanohtml')

const help = (state, i18n) => {
  const exampleUl = require('./examples')(state, i18n)
  return html`
    <section id='help' class="popup-menu" style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <h3>${i18n`Documentation`}:</h3>
        <ul>
            <li>
              <a class="navlink external-link" href="docs/" target="_blank">${i18n`User Guide`}</a>
            </li>
         </ul>
      </div>
      <div>
        <h3>${i18n`Forums`}:</h3>
        <ul>
            <li><a class="navlink external-link" href="https://jscad.xyz/forum" target="_blank">${i18n`User Group`}</a></li>
            <li><a class="navlink external-link" href="https://jscad.xyz/forum/category/1/announcements" rel="publisher" target="_blank">${i18n`Announcements`}</a></li>
            <li><a class="navlink external-link" href="https://jscad.xyz/forum" rel="publisher" target="_blank">${i18n`Recent Updates`}</a></li>
        </ul>
      </div>
      <div>
        <h3>${i18n`Examples`}:</h3>
        ${exampleUl}
      </div>
    </section>
  `
}

module.exports = help
