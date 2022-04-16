// eslint-disable-next-line no-unused-vars
import { h, insertBefore, setTranslations } from './jsx6'
import { App } from './app/App'
import * as errTranslations from './jsx6/errTranslations'

setTranslations(errTranslations.default)
window.APP = insertBefore(document.body, <App class='jscad-app fxs fx1' />)
