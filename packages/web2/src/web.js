// eslint-disable-next-line no-unused-vars
import { h, provideErrTranslations, addToBody } from '@jsx6/jsx6'
import { App } from './app/App'

provideErrTranslations()
window.APP = addToBody(<App class='jscad-app fxs fx1' />)
