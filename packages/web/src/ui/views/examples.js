const html = require('nanohtml')
const path = require('path')

const examplesData = require('../../../examples/examples.json')

const examples = (state, i18n) => {
  const baseUrl = new URL(window.location.href)
  let newPath = baseUrl.origin + path.dirname(baseUrl.pathname)
  newPath = newPath.endsWith('/') ? newPath : newPath + path.sep

  const examplesMenus = []
  for (const groupName in examplesData) {
    if (!Object.prototype.hasOwnProperty.call(examplesData, groupName)) continue
    const examplesElements = examplesData[groupName].map((example) => {
      return html`<li>
          <a class="example" title="${example.description}" data-path="${newPath}${example.filePath}" href="#"> ${example.title} </a>
        </li>`
    })
    examplesMenus.push(html`<li>${groupName}<ul class="examples-list">${examplesElements}</ul></li>`)
  }
  return html`<ul class="examples-group">${examplesMenus}</ul>`
}

module.exports = examples
