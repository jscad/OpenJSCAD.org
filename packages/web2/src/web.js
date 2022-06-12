// eslint-disable-next-line no-unused-vars
import { h, insertBefore, setTranslations, errTranslations } from '@jsx6/jsx6'
import { App } from './app/App'

setTranslations(errTranslations.default)
window.APP = insertBefore(document.body, <App class='jscad-app fxs fx1' />)
