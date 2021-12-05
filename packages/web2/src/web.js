// eslint-disable-next-line no-unused-vars
import { h, insertHtml } from './jsx6'
import { App } from './app/App'
import * as errTranslations from './jsx6/errTranslations'
import { setTranslations } from './jsx6/trans'

setTranslations(errTranslations.default)
window.APP = insertHtml(document.body, null, <App class='jscad-app g-fs g-f1' />)
