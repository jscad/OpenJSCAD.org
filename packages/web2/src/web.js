import { h, insertHtml } from './jsx6'
import { App } from './App'

window.APP = insertHtml(document.body, null, <App class='jscad-app g-fs' />)
