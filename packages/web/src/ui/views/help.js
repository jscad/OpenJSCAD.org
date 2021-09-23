const html = require('nanohtml')

const help = (state, i18n) => {
  const exampleUl = require('./examples')(state, i18n)
  return html`
    <section id='help' class="popup-menu" style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <h2>${i18n`JSCAD V${state.version}`}</h2>
        <h3>${i18n`Documentation`}:</h3>
        <ul>
            <li><a class="navlink external-link" href="guide.html" target="_blank">${i18n`User Guide`}</a></li>
            <li><a class="navlink external-link" href="docs/" target="_blank">${i18n`API Reference`}</a></li>
            <li><a class="navlink external-link" href="issues.html" target="_blank">${i18n`Open Issues`}</a></li>
        </ul>
      </div>
      <div>
        <h3>${i18n`Forums`}:</h3>
        <ul>
            <li><a class="navlink external-link" href="forum.html" target="_blank">${i18n`User Group`}</a></li>
            <li><a class="navlink external-link" href="discord.html" target="_blank">${i18n`Discord Community`}</a></li>
            <li><a class="navlink external-link" href="announcements.html" rel="publisher" target="_blank">${i18n`Announcements`}</a></li>
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
